import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type BackArrowButtonProps = {
  pathName?: string;
  onClick?: () => void;
  className?: string;
};

const BackArrowButton = ({
  pathName,
  onClick,
  className = "",
}: BackArrowButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (pathName) {
      navigate(pathName);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      className={`absolute cursor-pointer pt-7 px-5 top-1 left-3 text-sm z-50 ${className}`}
      onClick={handleClick}
    >
      <ArrowLeft className="size-5" />
    </button>
  );
};

export default BackArrowButton;
