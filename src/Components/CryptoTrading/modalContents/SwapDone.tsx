import { DoneIcon } from "@/assets";
import { motion } from "framer-motion";

const SwapDone = ({ setStep }: { setStep: (step: number) => void }) => {
  return (
    <div className="flex flex-col h-full max-w-full md:h-auto md:max-w-[28.7rem] max-md:rounded-t-none">
      <div className="flex flex-col justify-center items-center">
        <motion.img
          src={DoneIcon}
          alt="circle check"
          className="w-60"
          initial={{ y: 150, scale: 0.4, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <span className="text-center text-xl font-semibold">
          Swap Successful
        </span>
      </div>

      <button
        className="btn-primary w-full mt-8 max-md:mb-20"
        onClick={() => setStep(1)}
      >
        Back to Swap
      </button>
    </div>
  );
};

export default SwapDone;
