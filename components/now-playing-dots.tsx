import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function NowPlayingDots({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("flex items-center", className)}>
      <div className="w-2 h-2 mr-1 rounded-full bg-primary/50 animate-pulse-delay-150"></div>
      <div className="w-2 h-2 mr-1 rounded-full bg-primary/50 animate-pulse-delay-300"></div>
      <div className="w-2 h-2 mr-1 rounded-full bg-primary/50 animate-pulse-delay-450"></div>
    </div>
  );
}
