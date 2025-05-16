import { Input } from "@/Components/ui/input";

const SendModal = ({ closeModal }: { closeModal: () => void }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form is submitted");
    closeModal();
  };

  return (
    <div className="pt-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input placeholder="Enter Receipient's Address" />
        <Input type="tel" placeholder="Enter Amount to Send" />

        <button className="btn-primary w-full" type="submit">
          Proceed
        </button>
      </form>
    </div>
  );
};

export default SendModal;
