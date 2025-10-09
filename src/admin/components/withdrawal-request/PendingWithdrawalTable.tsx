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
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  AllUsersPage,
  WithdrawalRequestProps,
  WithdrawalTableProps,
} from "@/admin/type";
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
import { formatDate } from "date-fns";
import { DialogClose } from "@/Components/ui/dialog";
import { Button, buttonVariants } from "@/Components/ui/button";
import {
  approveWithdrawalRequest,
  fiatWithdrawalRequest,
} from "@/admin/api/withdrawal-request";
import { toast } from "sonner";
import axios from "axios";
import ButtonLoading from "@/Components/common/ButtonLoading";
import { Link } from "react-router-dom";

const PendingWithdrawalTable = ({ compact = false }: WithdrawalTableProps) => {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["withdrawal-request", page],
    queryFn: () => fiatWithdrawalRequest(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const transactions = data?.data?.content ?? [];
  const pageProperty: AllUsersPage = data?.data?.page ?? 0;

  // prefetch next page
  useEffect(() => {
    if (
      !compact &&
      pageProperty?.totalPages &&
      page < pageProperty?.totalPages - 1
    ) {
      queryClient.prefetchQuery({
        queryKey: ["withdrawal-request", page + 1],
        queryFn: () => fiatWithdrawalRequest(page + 1),
        staleTime: Infinity,
      });
    }
  }, [page, pageProperty, queryClient, compact]);

  const approveWithdrawalMutation = useMutation({
    mutationFn: (withdrawalId: number) =>
      approveWithdrawalRequest(withdrawalId),
    onSuccess: () => {
      toast.success("Payment marked as paid successfully");
      queryClient.invalidateQueries({ queryKey: ["withdrawal-request", page] });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const responseDesc =
          error.response?.data?.responseDesc || "Something went wrong";
        toast.error(responseDesc);
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });

  const handleMarkAsPaid = (withdrawalId: number) => {
    approveWithdrawalMutation.mutate(withdrawalId);
  };

  const isLoading = approveWithdrawalMutation.isPending;

  // split transactions to 4 if compact, otherwise show all
  const visibleTransactions = compact ? transactions.slice(0, 4) : transactions;

  return (
    <div className="bg-white rounded-md px-3 py-2 h-full">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm py-2 font-semibold text-[#7901b1]">
          Withdrawal Management
        </h3>
        <hr className="border-[#D9D9D9]" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-xs">
              Account Name
            </TableHead>
            <TableHead className="font-semibold text-xs">Amount (₦)</TableHead>
            <TableHead className="font-semibold text-xs">Bank Name</TableHead>
            <TableHead className="font-semibold text-xs">Date</TableHead>
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
            visibleTransactions.map((transaction: WithdrawalRequestProps) => (
              <TableRow key={transaction?.id} className="font-medium text-xs">
                <TableCell>
                  {" "}
                  <div className="flex items-center font-semibold gap-1">
                    <div className="p-1 rounded-full bg-[#28003E]">
                      <User2 className="fill-[#B71FFF]/40 size-6" />
                    </div>
                    {transaction?.accountName}
                  </div>
                </TableCell>
                <TableCell className="text-sm font-semibold">
                  {transaction?.amount
                    ? new Intl.NumberFormat("en-NG", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                        .format(transaction?.amount)
                        .replace(/\.00$/, "")
                    : `${transaction?.amount}`}
                </TableCell>
                <TableCell>{transaction?.bankName}</TableCell>
                <TableCell>
                  {formatDate(transaction?.createdAt, "dd MMM, yyyy")}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      transaction?.status === "SUCCESS"
                        ? "bg-green-500 hover:bg-green-600"
                        : transaction?.status === "PENDING"
                        ? "bg-yellow-500"
                        : "bg-red-400 hover:bg-red-500",
                      "text-xs font-medium lowercase"
                    )}
                  >
                    {transaction?.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger>
                      <ChevronRightCircle className="size-5 cursor-pointer text-[#141B34]" />
                    </DialogTrigger>
                    <DialogContent className="w-[402px]">
                      <DialogTitle className="sr-only">
                        Transaction Details
                      </DialogTitle>
                      <DialogDescription asChild>
                        <div className="flex flex-col mt-2 gap-2">
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">
                              Account Name
                            </h3>
                            <p className="text-xs font-medium">
                              {transaction?.accountName}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Bank Name</h3>
                            <p className="text-xs font-medium">
                              {transaction?.bankName}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">
                              Account Number
                            </h3>
                            <p className="text-xs font-medium">
                              {transaction?.accountNumber}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Amount</h3>
                            <p className="text-sm font-medium">
                              {new Intl.NumberFormat("en-NG", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                useGrouping: true,
                              }).format(transaction?.amount)}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">
                              Request ID
                            </h3>
                            <p className="text-xs font-light">
                              {transaction?.requestId}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Fee</h3>
                            <p className="text-xs font-light">
                              {new Intl.NumberFormat("en-NG", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                useGrouping: true,
                              }).format(transaction?.fee)}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Date</h3>
                            <p className="text-xs font-light">
                              {formatDate(
                                transaction?.createdAt,
                                "dd MMM, yyyy"
                              )}
                            </p>
                          </div>

                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Status</h3>
                            <Badge
                              className={cn(
                                transaction?.status === "SUCCESS"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : transaction?.status === "PENDING"
                                  ? "bg-yellow-500"
                                  : "bg-red-400 hover:bg-red-500",
                                "text-xs font-medium lowercase"
                              )}
                            >
                              {transaction?.status}
                            </Badge>
                          </div>
                        </div>
                      </DialogDescription>
                      <div className="flex w-full gap-2 mt-2">
                        <Button
                          className="w-1/2"
                          onClick={() => handleMarkAsPaid(transaction?.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? <ButtonLoading /> : " Mark as Paid"}
                        </Button>
                        <DialogClose
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "w-1/2 border-primary text-primary"
                          )}
                        >
                          Close
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {!compact && (
        <Pagination className="my-4">
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
      )}

      {compact && transactions.length > 4 && (
        <div className="flex justify-end mt-3">
          <Button variant="outline" asChild>
            <Link to="/withdrawal-request">View More</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PendingWithdrawalTable;
