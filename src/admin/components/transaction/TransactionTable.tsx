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

const TransactionTable = () => {
  const contents = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      date: "12 Jun 2025 15:00:00",
      status: "Successful",
    },
    {
      id: 2,
      user: {
        name: "John Doe",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      date: "12 Jun 2025 15:00:00",
      status: "Unsuccessful",
    },
    {
      id: 3,
      user: {
        name: "John Doe",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      date: "12 Jun 2025 15:00:00",
      status: "Successful",
    },
    {
      user: {
        name: "John Doe",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      date: "12 Jun 2025 15:00:00",
      status: "Successful",
    },
    {
      id: 4,
      user: {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      date: "12 Jun 2025 15:00:00",
      status: "Successful",
    },
    {
      id: 5,
      user: {
        name: "John Doe",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      date: "12 Jun 2025 15:00:00",
      status: "Unsuccessful",
    },
    {
      id: 6,
      user: {
        name: "John Doe",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      date: "12 Jun 2025 15:00:00",
      status: "Successful",
    },
    {
      id: 7,
      user: {
        name: "John Doe",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      date: "12 Jun 2025 15:00:00",
      status: "Successful",
    },
  ];

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
        <TableBody>
          {contents.map((content) => (
            <TableRow key={content.id} className="font-semibold text-xs">
              <TableCell>
                <div className="flex items-center gap-1">
                  {content.user.avatar ? (
                    <img
                      src={content.user.avatar}
                      className="size-8 rounded-full object-contain"
                    />
                  ) : (
                    <div className="p-1 rounded-full bg-[#28003E]">
                      <User2 className="fill-[#B71FFF]/40 size-6" />
                    </div>
                  )}
                  {content.user.name}
                </div>
              </TableCell>
              <TableCell>{content.transactionType}</TableCell>
              <TableCell>{content.transactionId}</TableCell>
              <TableCell>{content.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {content.status === "Successful" ? (
                    <span className="size-[10px] rounded-full bg-[#11C600] mr-1" />
                  ) : (
                    <span className="size-[10px] rounded-full bg-[#FF0000] mr-1" />
                  )}
                  <span>{content.status}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger>
                    <ChevronRightCircle className="size-5 cursor-pointer text-[#141B34]" />
                  </DialogTrigger>
                  <DialogContent className="w-[402px]">
                    <DialogTitle className="sr-only">User Details</DialogTitle>
                    <DialogDescription>
                      <div className="flex justify-center pt-2 pb-4">
                        {content.user?.avatar ? (
                          <img
                            src={content.user.avatar}
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
                          <p className="text-xs font-light">
                            {content.user.name}
                          </p>
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
                          <p className="text-xs font-light">{content.date}</p>
                        </div>
                        <div className="flex text-foreground justify-between items-center">
                          <h3 className="text-sm font-semibold">Status</h3>
                          <p className="text-xs font-light">{content.status}</p>
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
      </Table>
    </div>
  );
};

export default TransactionTable;
