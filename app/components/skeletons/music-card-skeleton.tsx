import { FaLastfm } from "react-icons/fa6";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/app/components/three-d-card";

import { cn } from "@/lib/utils";

export const MusicCardSkeleton = ({ className }: { className?: string }) => (
  <CardContainer className={cn("inter-var select-none", className)}>
    <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-indigo-500/[0.1] dark:border-white/[0.2] border-black/[0.1] bg-secondary/5 w-full sm:w-full h-auto rounded-xl p-6 border overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-rose-100/10 to-transparent animate-[shimmer_2s_infinite] before:absolute before:inset-0 before:-translate-x-full" />
      <CardItem
        translateZ="100"
        className="w-full flex flex-col sm:flex-row items-center"
      >
        <div className="h-40 w-40 object-cover bg-secondary/20 transition-opacity duration-300 rounded-xl group-hover/card:shadow-xl" />
        <div className="flex flex-col ml-4 gap-2">
          <div className="flex items-center gap-x-2">
            <div className="w-40 h-5 rounded bg-secondary/20" />
            <div className="w-5 h-5 bg-secondary/20 rounded" />
          </div>
          <span className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start">
            <div className="mr-1 bg-secondary/20 rounded w-[14px] h-[14px]" />
            <div className="w-16 h-5 rounded bg-secondary/20" />
          </span>
        </div>
      </CardItem>
      <div>
        <CardItem
          translateZ="50"
          as="div"
          className="px-4 py-2 rounded-xl text-xs font-normal w-full"
        >
          <h2 className="text-sm">Recent Tracks</h2>
          <div className="border-b w-full my-2"></div>
          <div className="flex gap-2 flex-col">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-secondary/20 rounded-full" />
                  <div className="flex flex-col ml-2">
                    <span className="text-sm bg-secondary/20 rounded w-16 h-5" />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary/20 w-16 h-5 rounded" />
              </div>
            ))}
          </div>
        </CardItem>
      </div>
      <div className="absolute top-0 right-0 p-4">
        <FaLastfm className="w-8 h-8 text-zinc-100" />
      </div>
    </CardBody>
  </CardContainer>
);
