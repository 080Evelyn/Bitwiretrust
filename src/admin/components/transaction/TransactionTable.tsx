import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { ChevronRightCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/Components/ui/skeleton";
import UsersDialog from "./users-dialog";
import { AllUsersPage, CategoryType, TransactionLogProps } from "@/admin/type";
import { formatDate } from "date-fns";
import { filteredTransaction } from "@/admin/api/transactions";
import { Dispatch, useMemo } from "react";

interface TransactionTableProps {
  searchParams: URLSearchParams;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
}

const TransactionTable = ({
  searchParams,
  page,
  setPage,
}: TransactionTableProps) => {
  // memoize you query params, avoids re-running query when not needed
  const queryParams = useMemo(() => {
    return {
      category: searchParams.get("category") as CategoryType | null,
      status: searchParams.get("status") ?? "",
      // fromDate: searchParams.get("fromDate") ?? "",
      // toDate: searchParams.get("toDate") ?? "",
    };
  }, [searchParams]);

  const {
    isFetching,
    data: filteredTransactionResponse,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactionLogFiltered", queryParams, page],
    queryFn: () =>
      filteredTransaction({
        category: queryParams.category ?? undefined,
        status: queryParams.status,
        // fromDate: queryParams.fromDate,
        // toDate: queryParams.toDate,
        page,
        size: 20,
      }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  const pageProperty: AllUsersPage | undefined =
    filteredTransactionResponse?.data?.page;
  const contents: TransactionLogProps[] =
    filteredTransactionResponse?.data?.content ?? [];

  const totalPages = pageProperty?.totalPages ?? 0;

  return (
    <div className="bg-white rounded-md px-3 py-2">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm py-2 font-semibold text-[#7901b1]">
          Transactions
        </h3>
        <span className="border-b-[0.5px] w-full border-[#D9D9D9]" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Transaction ID</TableHead>
            <TableHead className="font-semibold">Amount</TableHead>
            <TableHead className="font-semibold">Transaction Type</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isFetching ? (
            Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6}>
                  <Skeleton className="h-10 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-red-500 font-semibold"
              >
                {error?.message}
              </TableCell>
            </TableRow>
          ) : contents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No transaction found
              </TableCell>
            </TableRow>
          ) : (
            contents.map((content) => (
              <TableRow
                key={content.requestId}
                className="font-semibold text-xs"
              >
                <TableCell>{content.requestId}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(content.amount)}
                </TableCell>
                <TableCell className="font-medium">{content.type}</TableCell>
                <TableCell className="font-medium">
                  {formatDate(content.createdAt, "dd MMM, yyyy, hh:mm a")}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {["SUCCESS", "SUCCESSFUL"].includes(content.status) ? (
                      <span className="size-2 rounded-full bg-[#11C600] mr-1" />
                    ) : ["FAILED", "UNSUCCESSFUL"].includes(content.status) ? (
                      <span className="size-2 rounded-full bg-[#FF0000] mr-1" />
                    ) : (
                      <span className="size-2 rounded-full bg-yellow-400 mr-1" />
                    )}
                    <span className="lowercase">{content.status}</span>
                  </div>
                </TableCell>
                <Dialog>
                  <TableCell className="text-right">
                    <DialogTrigger asChild>
                      <ChevronRightCircle className="size-5 cursor-pointer text-[#141B34]" />
                    </DialogTrigger>
                    <UsersDialog {...content} />
                  </TableCell>
                </Dialog>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.max(prev - 1, 0));
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
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
                  setPage((prev) => Math.min(prev + 1, totalPages - 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TransactionTable;
