import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { ChevronRightCircle } from "lucide-react";
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
import { AllUsersPage, AllCryptoTransactions } from "@/admin/type";
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
import { allCryptoTransactions } from "@/admin/api/crypto";
import { formatDate } from "date-fns";
import { DialogClose } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

const CryptoTable = () => {
  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["all-crypto-transactions", page],
    queryFn: () => allCryptoTransactions(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const transactions = data?.data?.content;
  const pageProperty: AllUsersPage = data?.data?.page ?? 0;

  useEffect(() => {
    if (!pageProperty?.totalPages) return;
    if (page < pageProperty?.totalPages - 1) {
      queryClient.prefetchQuery({
        queryKey: ["all-crypto-transactions", page + 1],
        queryFn: () => allCryptoTransactions(page + 1),
        staleTime: Infinity,
      });
    }
  }, [page, pageProperty, queryClient]);

  return (
    <div className="bg-white rounded-md px-3 py-2">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm py-2 font-semibold text-[#7901b1]">
          Crypto Management
        </h3>
        <hr className="border-[#D9D9D9]" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-xs">Reference</TableHead>
            <TableHead className="font-semibold text-xs">Amount (₦)</TableHead>
            <TableHead className="font-semibold text-xs">Category</TableHead>
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
            transactions.map((transaction: AllCryptoTransactions) => (
              <TableRow key={transaction?.id} className="font-medium text-xs">
                <TableCell>{transaction?.reference}</TableCell>
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
                <TableCell>{transaction?.category}</TableCell>
                <TableCell>
                  {formatDate(transaction?.createdAt, "dd MMM, yyyy")}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      transaction?.status === "SUCCESS"
                        ? "bg-green-500 hover:bg-green-600"
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
                            <h3 className="text-xs font-semibold">Reference</h3>
                            <p className="text-xs font-light">
                              {transaction?.reference}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Amount</h3>
                            <p className="text-xs font-light">
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
                              Balance Before
                            </h3>
                            <p className="text-xs font-light">
                              {new Intl.NumberFormat("en-NG", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                useGrouping: true,
                              }).format(transaction?.balanceBefore)}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">
                              Balance After
                            </h3>
                            <p className="text-xs font-light">
                              {new Intl.NumberFormat("en-NG", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                useGrouping: true,
                              }).format(transaction?.balanceAfter)}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-xs font-semibold">Category</h3>
                            <p className="text-xs font-light">
                              {transaction?.category}
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
                                  : "bg-red-400 hover:bg-red-500",
                                "text-xs font-medium lowercase"
                              )}
                            >
                              {transaction?.status}
                            </Badge>
                          </div>
                        </div>
                      </DialogDescription>
                      <DialogClose>
                        <Button className="w-full">Close</Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
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
    </div>
  );
};

export default CryptoTable;
