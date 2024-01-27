import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function LatestBlogs({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("mt-5", className)} {...props}>
      <h1 className="font-medium mb-4 text-lg">Latest Blogs</h1>
      <p>WIP</p>
    </div>
  );
}
