import { KycPablock } from "@/assets";

const kycData = [
  { label: "Name", value: "John Doe" },
  { label: "Email", value: "gabriel@gmail.com" },
  { label: "Phone Number", value: "08012345678" },
  { label: "Residential Address", value: "112, street, Lekki, Lagos" },
  { label: "Gender", value: "Male" },
  { label: "Date of Birth", value: "1990-01-01" },
  { label: "Source of Income", value: "Teacher" },
];

const KycApproval = () => {
  return (
    <div className="bg-white rounded-2xl pt-4 pb-3 px-2.5">
      <div className="flex items-center text-sm text-[#7901b1] font-medium gap-1.5">
        <h2>KYC Approval</h2>
        <img src={KycPablock} alt="padlock icon" />
      </div>

      <div className="flex flex-col gap-1.5 mt-2">
        {kycData.map(({ label, value }) => (
          <div className="flex justify-between items-center w-full" key={label}>
            <span className="font-semibold text-xs ">{label}</span>
            <span className="text-[10px] text-[#8c8c8c]">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-10 pt-2">
        <button className="border rounded-[4px] py-1.5 cursor-pointer hover:bg-accent w-1/2 border-[#7901b1] text-sm font-semibold text-[#7901b1] mt-2">
          View
        </button>
        <button className="btn-primary font-semibold py-1.5 w-1/2 mt-2">
          Approve
        </button>
      </div>
    </div>
  );
};

export default KycApproval;
