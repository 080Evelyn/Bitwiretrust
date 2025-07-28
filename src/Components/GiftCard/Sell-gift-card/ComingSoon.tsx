import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./sell-dialog";
import { Sparkles } from "lucide-react";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <Dialog open={true}>
      <DialogContent className="text-center flex flex-col items-center w-xs gap-4 py-8">
        <DialogHeader className="flex flex-col items-center gap-2">
          <Sparkles className="size-10 text-purple-600" />
          <DialogTitle className="mt-2 text-xl font-bold">
            🚀 Coming Soon!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center max-w-[18rem]">
            This feature is coming soon
          </DialogDescription>
        </DialogHeader>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-4 py-2 bg-[#7910B1] hover:scale-105 hover:bg-[#7910B1]/80 cursor-pointer text-white rounded-sm shadow-md"
        >
          Go to Dashboard
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoon;
