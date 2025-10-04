import { User2 } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { TransactionLogProps } from "@/admin/type";
import { formatDate } from "date-fns";
import { Badge } from "@/Components/ui/badge";

const UsersDialog = (content: TransactionLogProps) => {
  return (
    <>
      <DialogContent className="w-[402px]">
        <DialogTitle className="sr-only">User Details</DialogTitle>
        <DialogDescription>
          <div className="flex justify-center pt-2 pb-4">
            <div className="p-2 items-center justify-center max-h-22 max-w-22 rounded-full bg-[#28003E]">
              <User2 className="fill-[#B71FFF]/40 size-18" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex text-foreground justify-between items-center">
              <span className="text-sm font-semibold">Reference ID</span>
              <p className="text-xs font-light">{content.reference}</p>
            </div>
            <div className="flex text-foreground justify-between items-center">
              <span className="text-sm font-semibold">Amount</span>
              <p className="text-xs font-light">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(content.amount)}
              </p>
            </div>
            <div className="flex text-foreground justify-between items-center">
              <span className="text-sm font-semibold">Transaction Type</span>
              <p className="text-xs font-light">{content.type}</p>
            </div>
            <div className="flex text-foreground justify-between items-center">
              <span className="text-sm font-semibold">Transaction ID</span>
              <p className="text-xs font-light">{content.id}</p>
            </div>
            <div className="flex text-foreground justify-between items-center">
              <span className="text-sm font-semibold">Date</span>
              <p className="text-xs font-light">
                {formatDate(content.createdAt, "yyyy-MM-dd, hh:mm aa")}
              </p>
            </div>
            <div className="flex text-foreground justify-between items-center">
              <span className="text-sm font-semibold">Status</span>
              <Badge
                className="text-xs font-light lowercase"
                variant="secondary"
              >
                {content.status}
              </Badge>
            </div>
          </div>
        </DialogDescription>
        <DialogClose className="btn-primary mt-1 mx-auto w-2/3">
          Done
        </DialogClose>
      </DialogContent>
    </>
  );
};

export default UsersDialog;
