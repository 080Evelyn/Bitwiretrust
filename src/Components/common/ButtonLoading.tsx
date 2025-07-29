import { FaSpinner } from "react-icons/fa";

const ButtonLoading = () => {
  return (
    <span className="inline-flex items-center">
      Processing...
      <FaSpinner className="animate-spin ml-1" />
    </span>
  );
};

export default ButtonLoading;
