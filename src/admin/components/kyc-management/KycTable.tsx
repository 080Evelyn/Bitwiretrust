import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { ChevronRightCircle, User2 } from "lucide-react";
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
import { useEffect, useState } from "react";
import { AllKycUsersProps, AllUsersPage } from "@/admin/type";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";
import { allKycUsers } from "@/admin/api/kyc";
import { formatDate } from "date-fns";
import { DialogClose } from "@/Components/ui/dialog";
import { useKycActions } from "@/admin/hooks/useKycActions";
import ButtonLoading from "@/Components/common/ButtonLoading";

const KycTable = () => {
  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["all-users", page],
    queryFn: () => allKycUsers(page),
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
        queryFn: () => allKycUsers(page + 1),
        staleTime: Infinity,
      });
    }
  }, [page, pageProperty, queryClient]);

  const { approveMutation, rejectMutation } = useKycActions();

  const handleApprove = (userId: string) => {
    approveMutation.mutate(userId);
  };

  const handleReject = (userId: string) => {
    rejectMutation.mutate(userId);
  };
  const isApproveLoading = approveMutation.isPending;
  const isRejectLoading = rejectMutation.isPending;

  return (
    <div className="bg-white rounded-md px-3 py-2">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm py-2 font-semibold text-[#7901b1]">
          KYC Management
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
            users.map((user: AllKycUsersProps) => (
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
                    {user?.fullName}
                  </div>
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.phoneNumber ?? "08111111111"}</TableCell>
                <TableCell className="whitespace-normal break-words max-w-[170px] xl:max-w-[210px]">
                  {user?.residentialAddress ?? "example address, lagos"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      user?.status === "APPROVED"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-400 hover:bg-red-500",
                      "text-xs font-medium"
                    )}
                  >
                    {user?.status === "APPROVED" ? "Verified" : "Unverified"}
                  </Badge>
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
                      <DialogDescription>
                        <div className="flex flex-col mt-2 gap-2">
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Name</h3>
                            <p className="text-xs font-light">
                              {user.fullName}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Email</h3>
                            <p className="text-xs font-light">{user.email}</p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">
                              Phone Number
                            </h3>
                            <p className="text-xs font-light">
                              {user.phoneNumber}
                            </p>
                          </div>
                          <div className="flex w-full text-foreground justify-between items-start">
                            <h3 className="text-xs font-semibold">
                              Resedential Address
                            </h3>
                            <p className="text-xs text-end w-[60%] font-light">
                              {user.residentialAddress}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Gender</h3>
                            <p className="text-xs font-light">{user.gender}</p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">
                              Date of Birth
                            </h3>
                            <p className="text-xs font-light">
                              {formatDate(user.dateOfBirth, "dd MMM, yyyy")}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">
                              Source of income
                            </h3>
                            <p className="text-xs font-light">
                              {user.sourceOfIncome}
                            </p>
                          </div>
                        </div>
                      </DialogDescription>
                      {user.status === "APPROVED" ? (
                        <DialogClose className="btn-primary mt-1 mx-auto w-2/3">
                          Done
                        </DialogClose>
                      ) : (
                        <div className="flex gap-4 pt-2">
                          <button
                            onClick={() => handleReject(user.userId)}
                            className={cn(
                              "border rounded-[4px] py-1.5 cursor-pointer hover:bg-accent w-1/2 border-[#7901b1] text-sm font-semibold text-[#7901b1] mt-2",
                              {
                                "cursor-not-allowed opacity-70":
                                  isApproveLoading || isRejectLoading,
                              }
                            )}
                          >
                            {isRejectLoading ? <ButtonLoading /> : "Reject"}
                          </button>
                          <button
                            onClick={() => handleApprove(user.userId)}
                            disabled={isApproveLoading || isRejectLoading}
                            className={cn(
                              "btn-primary font-semibold py-1.5 w-1/2 mt-2",
                              {
                                "cursor-not-allowed opacity-70":
                                  isApproveLoading || isRejectLoading,
                              }
                            )}
                          >
                            {isApproveLoading ? <ButtonLoading /> : "Approve"}
                          </button>
                        </div>
                      )}
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

export default KycTable;
