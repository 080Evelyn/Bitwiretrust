import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { ChevronRightCircle, User2 } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/Components/ui/skeleton";
import UsersDialog from "./users-dialog";
import { TransactionLogProps } from "@/admin/type";
import { format } from "date-fns";
import { filteredTransaction } from "@/admin/api/transactions";

interface TransactionTableProps {
  searchParams: URLSearchParams;
}

const TransactionTable = ({ searchParams }: TransactionTableProps) => {
  const { isFetching, data: filteredTransactionResponse } = useQuery({
    queryKey: ["transactionLogFiltered", searchParams.toString()],
    queryFn: () =>
      filteredTransaction({
        category: searchParams.getAll("transactionTypes") || [],
        status: searchParams.get("status")!,
        fromDate: searchParams.get("fromDate")!,
        toDate: searchParams.get("toDate")!,
        page: searchParams.get("page") || "0",
        size: searchParams.get("size") || "20",
      }),
  });

  const contents: TransactionLogProps[] =
    filteredTransactionResponse?.data.content ?? [];

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
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Transaction Type</TableHead>
            <TableHead className="font-semibold">Transaction ID</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        {isFetching ? (
          <TableBody>
            {Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6}>
                  <Skeleton className="h-10 w-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {contents?.map((content) => (
              <TableRow
                key={content.transactionId}
                className="font-semibold text-xs"
              >
                <TableCell>
                  <div className="flex items-center gap-1">
                    {content.avatar ? (
                      <img
                        src={content.avatar}
                        className="size-8 rounded-full object-contain"
                      />
                    ) : (
                      <div className="p-1 rounded-full bg-[#28003E]">
                        <User2 className="fill-[#B71FFF]/40 size-6" />
                      </div>
                    )}
                    {content.name}
                  </div>
                </TableCell>
                <TableCell>{content.transactionType}</TableCell>
                <TableCell className="font-medium">
                  {content.transactionId}
                </TableCell>
                <TableCell className="font-medium">
                  {format(new Date(content.date), "dd MMM, yyyy, hh:mm:ss")}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {content.status === "success" ? (
                      <span className="size-[10px] rounded-full bg-[#11C600] mr-1" />
                    ) : (
                      <span className="size-[10px] rounded-full bg-[#FF0000] mr-1" />
                    )}
                    <span className="capitalize">{content.status}</span>
                  </div>
                </TableCell>
                <Dialog>
                  <TableCell className="text-right">
                    <DialogTrigger>
                      <ChevronRightCircle className="size-5 cursor-pointer text-[#141B34]" />
                    </DialogTrigger>
                    <UsersDialog {...content} />
                  </TableCell>
                </Dialog>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default TransactionTable;
