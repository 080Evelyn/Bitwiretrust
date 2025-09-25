import { approveKyc, pendingKyc, rejectKyc } from "@/admin/api/kyc";
import { KycData } from "@/admin/type";
import { KycPablock } from "@/assets";
import ButtonLoading from "@/Components/common/ButtonLoading";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "date-fns";
import { FC, useState } from "react";
import { toast } from "sonner";

const KycApproval: FC = () => {
  const {
    data: getPendingKyc,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingKyc"],
    queryFn: pendingKyc,
  });

  const pendingKycUsers: KycData[] = getPendingKyc?.data || [];

  // track which KYC is in view now
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentKyc = pendingKycUsers[currentIndex];

  const kycData = currentKyc
    ? [
        { label: "Name", value: currentKyc.fullName },
        { label: "Email", value: currentKyc.email },
        { label: "Phone Number", value: currentKyc.phoneNumber },
        { label: "Residential Address", value: currentKyc.residentialAddress },
        { label: "Gender", value: currentKyc.gender },
        {
          label: "Date of Birth",
          value: formatDate(currentKyc.dateOfBirth, "yyyy-MM-dd"),
        },
        { label: "Source of Income", value: currentKyc.sourceOfIncome },
        { label: "Document Type", value: currentKyc.documentType },
        { label: "ID Number", value: currentKyc.idNumber },
      ]
    : [];

  const handleNext = () => {
    if (currentIndex < pendingKycUsers.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(-1);
    }
  };

  const approveMutation = useMutation({
    mutationFn: (userId: string) => approveKyc(userId),
  });
  const rejectMutation = useMutation({
    mutationFn: (userId: string) => rejectKyc(userId),
  });

  const handleApprove = () => {
    approveMutation.mutate(currentKyc.userId, {
      onSuccess: (response) => {
        toast.success(response.data.responseDesc);
        handleNext();
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
  };
  const isApproveLoading = approveMutation.isPending;

  const handleReject = () => {
    rejectMutation.mutate(currentKyc.userId, {
      onSuccess: (response) => {
        toast.success(response.data);
        handleNext();
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
  };

  const isRejectLoading = rejectMutation.isPending;

  return (
    <div className="bg-white rounded-2xl pt-4 pb-3 px-2.5 size-full">
      <div className="flex items-center text-sm text-[#7901b1] font-medium gap-1.5">
        <h2>KYC Approval</h2>
        <img src={KycPablock} alt="padlock icon" />
      </div>

      {isLoading && (
        <p className="text-xs text-gray-500 mt-4">Loading pending KYCs...</p>
      )}

      {isError && (
        <p className="text-xs text-red-500 mt-4">Failed to fetch KYC data.</p>
      )}

      {!isLoading && !isError && currentKyc && currentIndex >= 0 && (
        <>
          <div className="flex flex-col gap-1.5 mt-2">
            {kycData.map(({ label, value }) => (
              <div
                className="flex justify-between items-center w-full"
                key={label}
              >
                <span className="font-semibold text-xs">{label}</span>
                <span className="text-[10px] font-medium text-[#8c8c8c]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-2">
            <button
              onClick={handleReject}
              className={cn(
                "border rounded-[4px] py-1.5 cursor-pointer hover:bg-accent w-1/2 border-[#7901b1] text-sm font-semibold text-[#7901b1] mt-2",
                {
                  "cursor-not-allowed opacity-70":
                    isApproveLoading || isRejectLoading,
                }
              )}
            >
              {isRejectLoading ? <ButtonLoading /> : "Reject"}
            </button>
            <button
              onClick={handleApprove}
              disabled={isApproveLoading}
              className={cn("btn-primary font-semibold py-1.5 w-1/2 mt-2", {
                "cursor-not-allowed opacity-70":
                  isApproveLoading || isRejectLoading,
              })}
            >
              {isApproveLoading ? <ButtonLoading /> : "Approve"}
            </button>
          </div>
        </>
      )}

      {!isLoading && !isError && currentIndex === -1 && (
        <p className="text-xs text-gray-500 mt-4">
          🎉 All pending KYCs reviewed!
        </p>
      )}

      {!isLoading && !isError && pendingKycUsers.length === 0 && (
        <p className="text-xs text-gray-500 mt-4">No pending KYC found.</p>
      )}
    </div>
  );
};

export default KycApproval;
