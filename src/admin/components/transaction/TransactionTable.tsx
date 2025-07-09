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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { transactionLog } from "@/admin/api/transactions";
import { TransactionLogProps } from "@/admin/type";
import { Skeleton } from "@/Components/ui/skeleton";

const TransactionTable = () => {
  const { isFetching, data: transactionLogResponse } = useQuery({
    queryKey: ["transactionLog"],
    queryFn: transactionLog,
  });
  const contents = transactionLogResponse ?? [];

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
            {contents.map((content: TransactionLogProps) => (
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
                <TableCell>{content.transactionId}</TableCell>
                <TableCell>
                  {typeof content.date === "string"
                    ? content.date
                    : content.date?.toLocaleString?.()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {content.status === "success" ? (
                      <span className="size-[10px] rounded-full bg-[#11C600] mr-1" />
                    ) : (
                      <span className="size-[10px] rounded-full bg-[#FF0000] mr-1" />
                    )}
                    <span className="capitalize">{content.status}</span>
                  </div>
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
                        <div className="flex justify-center pt-2 pb-4">
                          {content.avatar ? (
                            <img
                              src={content.avatar}
                              className="size-[108px] rounded-full object-contain"
                            />
                          ) : (
                            <div className="p-2 items-center justify-center max-h-22 max-w-22 rounded-full bg-[#28003E]">
                              <User2 className="fill-[#B71FFF]/40 size-18" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-sm font-semibold">Name</h3>
                            <p className="text-xs font-light">{content.name}</p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-sm font-semibold">
                              Transaction Type
                            </h3>
                            <p className="text-xs font-light">
                              {content.transactionType}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-sm font-semibold">
                              Transaction ID
                            </h3>
                            <p className="text-xs font-light">
                              {content.transactionId}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-sm font-semibold">Date</h3>
                            <p className="text-xs font-light">
                              {" "}
                              {typeof content.date === "string"
                                ? content.date
                                : content.date?.toLocaleString?.()}
                            </p>
                          </div>
                          <div className="flex text-foreground justify-between items-center">
                            <h3 className="text-sm font-semibold">Status</h3>
                            <p className="text-xs font-light">
                              {content.status}
                            </p>
                          </div>
                        </div>
                      </DialogDescription>
                      <DialogClose className="btn-primary mt-1 mx-auto w-2/3">
                        Done
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default TransactionTable;
