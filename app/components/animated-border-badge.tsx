import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface AnimatedBorderBadgeProps extends ComponentProps<"div"> {
  label: string;
}

export default function AnimatedBorderBadge({
  label,
  className,
  ...props
}: AnimatedBorderBadgeProps) {
  return (
    <div
      className={cn(
        "relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="select-none inline-flex h-full w-full items-center justify-center rounded-full bg-card/70 px-2 py-[1px] text-sm font-medium backdrop-blur-3xl">
        {label}
      </span>
    </div>
  );
}
