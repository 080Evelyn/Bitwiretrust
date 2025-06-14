import { naira } from "@/assets";
import { DialogHeader } from "@/Components/ui/dialog";
import { motion } from "framer-motion";

const TransferSuccess = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <DialogHeader className="sr-only">Transfer Successful</DialogHeader>
      <div className="flex flex-col items-center justify-between p-1 mt-10 sm:mt-5 sm:gap-5 gap-10">
        <div className="flex flex-col my-4 gap-4 justify-center items-center h-full ">
          <motion.div
            initial={{ y: 150, scale: 0.4, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#11C600]/50 rounded-full size-19 flex items-center justify-center"
          >
            <div className="bg-[#0FA301] size-15.5 rounded-full flex items-center justify-center">
              <img src={naira} alt="naira" className="h-[25.54px]" />
            </div>
          </motion.div>
          <span className="text-center text-xl font-semibold">
            Transfer Successful
          </span>
        </div>

        <button
          className="btn-primary w-1/2 mt-auto max-md:mb-20"
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </>
  );
};

export default TransferSuccess;
