import { useState } from "react";
import { TransactionHistoryProps } from "@/types/dashboard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "../ui/dialog";
import { format } from "date-fns";
import { ChevronRightCircle } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Skeleton } from "../ui/skeleton";
import { LogoWhite, MoneyIn, MoneyOut } from "../../assets";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface TransactionListProps {
  notifications: TransactionHistoryProps[] | undefined;
  isFetching: boolean;
}

const TransactionList = ({
  notifications,
  isFetching,
}: TransactionListProps) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionHistoryProps | null>(null);

  const getBackgroundColorTransaction = (type: string) => {
    switch (type) {
      case "CREDIT":
        return "#16D005";
      case "DEBIT":
        return "#2EBAC6";
      default:
        return "#7910B1";
    }
  };

  return (
    <div className="rate-container-right">
      <div className="all-view">
        <div className="flex text-sm tracking-tight gap-2 font-semibold">
          <p>Transaction</p>
          <span className="all-count">{notifications?.length}</span>
        </div>
      </div>

      <div className="transaction-list max-h-[60vh] md:max-h-[calc(100vh-150px)] scrollbar-hide overflow-y-auto">
        {isFetching ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <div className="py-1">
            {notifications?.map((notif) => (
              <div
                key={notif.createdAt + notif.requestId}
                className="transaction-item cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedTransaction(notif)}
              >
                <div
                  className="transaction-icon-wrapper !rounded-[3.5px]"
                  style={{
                    backgroundColor: getBackgroundColorTransaction(notif.type),
                  }}
                >
                  <img
                    src={
                      notif.type === "CREDIT"
                        ? MoneyIn
                        : notif.type === "DEBIT"
                          ? MoneyOut
                          : LogoWhite
                    }
                    alt="Transaction icon"
                    className="transaction-icon"
                  />
                </div>

                <div className="transaction-details flex-1">
                  <p className="transaction-title">{notif.serviceType}</p>
                  <p className="transaction-subtitle">{notif.description}</p>
                </div>

                <ChevronRightCircle className="text-primary size-5" />
              </div>
            ))}
            {notifications?.length === 0 && (
              <div className="pt-4 text-center text-sm text-[#7901b1]">
                No notifications for this month
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog
        open={!!selectedTransaction}
        onOpenChange={() => setSelectedTransaction(null)}
      >
        <DialogOverlay className="z-60" />
        <DialogContent className="z-60 w-full md:max-h-[94vh] overflow-y-auto md:w-[398px] py-6.5 data-[state=open]:!zoom-in-0 data-[state=open]:duration-400 data-[state=closed]:!zoom-out-0 data-[state=closed]:duration-200">
          <DialogTitle className="sr-only">Transaction Details</DialogTitle>
          <DialogHeader className="flex items-center">
            <div
              className={cn(
                selectedTransaction?.type === "CREDIT"
                  ? "bg-[#16D005]/50"
                  : selectedTransaction?.type === "DEBIT"
                    ? "bg-[#2EBAC6]/50"
                    : "bg-[#7910B1]/50",
                "rounded-full size-19 flex items-center justify-center",
              )}
            >
              <div
                className={cn(
                  selectedTransaction?.type === "CREDIT"
                    ? "bg-[#16D005]"
                    : selectedTransaction?.type === "DEBIT"
                      ? "bg-[#2EBAC6]"
                      : "bg-[#7910B1]",
                  "size-15.5 rounded-full flex items-center justify-center",
                )}
              >
                <img
                  src={
                    selectedTransaction?.type === "CREDIT"
                      ? MoneyIn
                      : selectedTransaction?.type === "DEBIT"
                        ? MoneyOut
                        : LogoWhite
                  }
                  alt="Transaction icon"
                  className="h-[25.54px]"
                />
              </div>
            </div>
            <div className="font-medium">
              {selectedTransaction?.serviceType}{" "}
              {selectedTransaction?.type &&
              selectedTransaction.type.toLowerCase() === "credit"
                ? "Successful"
                : selectedTransaction?.type &&
                    selectedTransaction.type.toLowerCase() === "debit"
                  ? "Successful"
                  : "Pending"}
            </div>
            <h3 className="font-bold text-2xl">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(selectedTransaction?.amount || 0)}
            </h3>
          </DialogHeader>
          <span className="border-2 border-[#7910B1] rounded-xs px-3 my-1.5" />
          <div className="flex flex-col gap-2 text-sm font-medium">
            {selectedTransaction?.requestId && (
              <div className="flex justify-between">
                <span>Request ID</span>
                <span>{selectedTransaction.requestId}</span>
              </div>
            )}
            {selectedTransaction?.createdAt && (
              <div className="flex justify-between">
                <span>Date</span>
                <span>
                  {format(selectedTransaction.createdAt, "MM-dd-yyyy, p")}
                </span>
              </div>
            )}

            {selectedTransaction?.type && (
              <div className="flex justify-between">
                <span>Transaction Type</span>
                <span>{selectedTransaction.type}</span>
              </div>
            )}
            {selectedTransaction?.status && (
              <div className="flex justify-between">
                <span>Status</span>
                <Badge
                  className={`capitalize ${
                    selectedTransaction.status.toLowerCase() === "success"
                      ? "bg-[#0FA301]"
                      : selectedTransaction.status.toLowerCase() === "failed"
                        ? "bg-[#FF0000]"
                        : "bg-amber-500"
                  }`}
                >
                  {selectedTransaction.status.toLowerCase()}
                </Badge>
              </div>
            )}
            {selectedTransaction?.description && (
              <div className="flex justify-between">
                <span>Description</span>
                <span className="text-right">
                  {selectedTransaction.description}
                </span>
              </div>
            )}
            {selectedTransaction?.tariff && (
              <div className="flex justify-between">
                <span>Tariff</span>
                <span>{selectedTransaction.tariff}</span>
              </div>
            )}
            {selectedTransaction?.beneficiary && (
              <div className="flex justify-between">
                <span>Beneficiary</span>
                <span>{selectedTransaction.beneficiary}</span>
              </div>
            )}
            {selectedTransaction?.productName && (
              <div className="flex justify-between">
                <span>Product Name</span>
                <span>{selectedTransaction.productName}</span>
              </div>
            )}
            {selectedTransaction?.providerStatus && (
              <div className="flex justify-between">
                <span>Provider Status</span>
                <span>{selectedTransaction.providerStatus}</span>
              </div>
            )}
            {selectedTransaction?.providerTransactionId && (
              <div className="flex justify-between">
                <span>Provider Transaction ID</span>
                <span>{selectedTransaction.providerTransactionId}</span>
              </div>
            )}
            {/* {selectedTransaction?.completedAt && (
              <div className="flex justify-between">
                <span>Completed At</span>
                <span>
                  {format(
                    new Date(selectedTransaction.completedAt),
                    "MM-dd-yyyy p",
                  )}
                </span>
              </div>
            )}
            {selectedTransaction?.initiatedAt && (
              <div className="flex justify-between">
                <span>Initiated At</span>
                <span>
                  {format(
                    new Date(selectedTransaction.initiatedAt),
                    "MM-dd-yyyy p",
                  )}
                </span>
              </div>
            )} */}
            {selectedTransaction?.meterNumber && (
              <div className="flex justify-between">
                <span>Meter Number</span>
                <span>{selectedTransaction.meterNumber}</span>
              </div>
            )}
            {selectedTransaction?.customerName && (
              <div className="flex justify-between">
                <span>Customer Name</span>
                <span>{selectedTransaction.customerName}</span>
              </div>
            )}
            {selectedTransaction?.token && (
              <div className="flex justify-between">
                <span>Token</span>
                <span>{selectedTransaction.token}</span>
              </div>
            )}
            {selectedTransaction?.units && (
              <div className="flex justify-between">
                <span>Units</span>
                <span>{selectedTransaction.units}</span>
              </div>
            )}
            {selectedTransaction?.tariff && (
              <div className="flex justify-between">
                <span>Tariff</span>
                <span>{selectedTransaction.tariff}</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionList;
