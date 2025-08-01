import { User2 } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { TransactionLogProps } from "@/admin/type";

const UsersDialog = (content: TransactionLogProps) => {
  return (
    <>
      <DialogContent className="w-[402px]">
        <DialogTitle className="sr-only">User Details</DialogTitle>
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
              <span className="text-sm font-semibold">Name</span>
              <p className="text-xs font-light">{content.name}</p>
            </div>
            <div className="flex text-foreground justify-between items-center">
              <span className="text-sm font-semibold">Transaction Type</span>
              <p className="text-xs font-light">{content.transactionType}</p>
            </div>
            <div className="flex text-foreground justify-between items-center">
              <span className="text-sm font-semibold">Transaction ID</span>
              <p className="text-xs font-light">{content.transactionId}</p>
            </div>
            <div className="flex text-foreground justify-between items-center">
              <span className="text-sm font-semibold">Date</span>
              <p className="text-xs font-light">
                {" "}
                {typeof content.date === "string"
                  ? content.date
                  : content.date?.toLocaleString?.()}
              </p>
            </div>
            <div className="flex text-foreground justify-between items-center">
              <span className="text-sm font-semibold">Status</span>
              <p className="text-xs font-light">{content.status}</p>
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
