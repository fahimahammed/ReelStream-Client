import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className={cn("animate-spin h-10 w-10 ")} />
      <span className="text-xl font-medium text-white/60">Loading...</span>
    </div>
  );
};

export default Spinner;
