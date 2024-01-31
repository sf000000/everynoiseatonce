import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function Experience({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("mt-8", className)} {...props}>
      <h1 className="font-medium mb-4 text-lg">Experience</h1>
      <ol className="relative border-s">
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -start-1.5 border "></div>
          <div className="flex flex-row items-center gap-2">
            <div className="text-md font-medium">Frontend Developer</div>
            <Badge variant="outline">Current</Badge>
          </div>
          <div className="mb-4 text-sm font-normal text-muted-foreground">
            Freelance
          </div>
        </li>
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border "></div>
          <div className="text-md font-medium">API Integration Engineer</div>
          <div className="mb-4 text-sm font-normal text-muted-foreground">
            Autocode (2019-2020)
          </div>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -left-1.5 border "></div>
          <div className="text-md font-medium">Python Developer</div>
          <div className="mb-4 text-sm font-normal text-muted-foreground">
            Pinecone (2017-2019)
          </div>
        </li>
      </ol>
    </div>
  );
}
