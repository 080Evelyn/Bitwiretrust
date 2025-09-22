import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { ChevronRightCircle, Trash2, User2, UserLock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { allUsers } from "@/admin/api/user-managment";
import { useEffect, useState } from "react";
import { AllUsersPage, AllUsersProps } from "@/admin/type";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

const UserTable = () => {
  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["all-users", page],
    queryFn: () => allUsers(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const users = data?.data?.content;
  const pageProperty: AllUsersPage = data?.data?.page ?? 0;

  useEffect(() => {
    if (!pageProperty?.totalPages) return;
    if (page < pageProperty?.totalPages - 1) {
      queryClient.prefetchQuery({
        queryKey: ["all-users", page + 1],
        queryFn: () => allUsers(page + 1),
        staleTime: Infinity,
      });
    }
  }, [page, pageProperty, queryClient]);

  return (
    <div className="bg-white rounded-md px-3 py-2">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm py-2 font-semibold text-[#7901b1]">
          Users Management
        </h3>
        <hr className="border-[#D9D9D9]" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-xs">Name</TableHead>
            <TableHead className="font-semibold text-xs">Email</TableHead>
            <TableHead className="font-semibold text-xs">
              Phone number
            </TableHead>
            <TableHead className="font-semibold text-xs">
              Residential Address
            </TableHead>
            <TableHead className="font-semibold text-xs">Status</TableHead>
            <TableHead className="font-semibold sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending || isFetching ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-red-500">
                {error.message}
              </TableCell>
            </TableRow>
          ) : (
            users.map((user: AllUsersProps) => (
              <TableRow key={user?.userId} className="font-medium text-xs">
                <TableCell>
                  <div className="flex items-center font-semibold gap-1">
                    {user?.avatar ? (
                      <img
                        src={user?.avatar}
                        className="size-8 rounded-full object-contain"
                      />
                    ) : (
                      <div className="p-1 rounded-full bg-[#28003E]">
                        <User2 className="fill-[#B71FFF]/40 size-6" />
                      </div>
                    )}
                    {user?.first_name} {user?.last_name}
                  </div>
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.phone}</TableCell>
                <TableCell className="whitespace-normal break-words max-w-[170px] xl:max-w-[210px]">
                  No. 10, Oyin Street, Ibadan, Delta State
                </TableCell>
                <TableCell>
                  {user?.isKycVerified === true ? "Verified" : "Unverified"}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger>
                      <ChevronRightCircle className="size-5 cursor-pointer text-[#141B34]" />
                    </DialogTrigger>
                    <DialogContent className="w-[402px]">
                      <DialogTitle className="sr-only">
                        User Details
                      </DialogTitle>
                      <DialogDescription asChild>
                        <div className="flex flex-col mt-2 gap-2">
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Name</h3>
                            <p className="text-xs font-light">
                              {user?.first_name} {user?.last_name}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Email</h3>
                            <p className="text-xs font-light">{user?.email}</p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">
                              Phone Number
                            </h3>
                            <p className="text-xs font-light">{user?.phone}</p>
                          </div>
                          <div className="flex w-full text-foreground justify-between items-start">
                            <h3 className="text-xs font-semibold">
                              Residential Address
                            </h3>
                            <p className="text-xs text-end w-[60%] font-light">
                              No. 10, Oyin Street, Ibadan, Delta State
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Status</h3>
                            <p className="text-xs font-light">
                              {user?.isKycVerified === true
                                ? "Verified"
                                : "Unverified"}
                            </p>
                          </div>
                        </div>
                      </DialogDescription>
                      <div className="flex w-full gap-5">
                        <button className="flex gap-2 w-1/2 items-center justify-center rounded-md font-semibold cursor-pointer border border-[#7901b1] text-[#7901b1] hover:bg-accent">
                          <span>Freeze</span>
                          <UserLock className="size-5" />
                        </button>
                        <button className="flex justify-center items-center gap-2 font-semibold w-1/2 btn-primary">
                          <span>Delete</span>
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 0) setPage((prev) => prev - 1);
              }}
            />
          </PaginationItem>

          {/* Page links */}
          {Array.from({ length: pageProperty.totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={i === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(i);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < pageProperty.totalPages - 1)
                  setPage((prev) => prev + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UserTable;
