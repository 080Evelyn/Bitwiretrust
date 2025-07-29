import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { User2 } from "lucide-react";

const PendingTransaction = () => {
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
      status: "Successful",
    },
    {
      id: 2,
      user: {
        name: "John Doe",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      status: "Unsuccessful",
    },
    {
      id: 3,
      user: {
        name: "John Doe",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      status: "Successful",
    },
    {
      id: 4,
      user: {
        name: "John Doe",
      },
      transactionType: "Airtime Purchase",
      transactionId: "BW-TRSF-WTAZW",
      status: "Successful",
    },
  ];

  return (
    <div className="bg-white rounded-2xl px-3 py-3">
      <div className="flex flex-col gap-3">
        <div className="flex text-xs items-center">
          <h3 className="py-2 font-semibold text-[#7901b1]">
            Pending Transactions
          </h3>
          <h3 className="ml-1">Today</h3>
        </div>
        <span className="border-b-[0.5px] w-full border-[#D9D9D9]" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Transaction Type</TableHead>
            <TableHead className="font-semibold">Transaction ID</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingTransaction;
