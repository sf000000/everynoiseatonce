import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function Experience({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("mt-8", className)} {...props}>
      <h1 className="font-medium mb-4 text-lg">Experience</h1>
      <ol className="relative border-s">
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-zinc-500 rounded-full mt-1.5 -start-1.5 border "></div>
          <div className="flex flex-row items-center gap-2">
            <div className="text-md font-medium">Front-End Engineer</div>
            <div className="inline-block uppercase text-xs rounded-full px-1 py-0 border border-zinc-500 text-muted-foreground">
              present
            </div>
          </div>
          <div className="mb-4 text-sm font-normal text-muted-foreground">
            Company Name (2020-present)
          </div>
        </li>
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-zinc-200 rounded-full mt-1.5 -start-1.5 border "></div>
          <div className="text-md font-medium">API Integration Engineer</div>
          <div className="mb-4 text-sm font-normal text-muted-foreground">
            Company Name (2019-2020)
          </div>
        </li>
      </ol>
    </div>
  );
}
