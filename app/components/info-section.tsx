"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ComponentProps, useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import OpenToWork from "@/components/open-to-work";

import { motion } from "framer-motion";

export default function InfoSection({
  className,
  ...props
}: ComponentProps<"div">) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 200);
  };

  return (
    <div className={cn("", className)} {...props}>
      <div className="relative">
        {/* Placeholder */}
        <div
          className={cn(
            "absolute w-[50px] h-[50px] rounded-full",
            isDragging ? "border-2 border-dashed" : "hidden"
          )}
          style={{ top: 0, left: 0 }}
        ></div>

        {/* Draggable Image */}
        <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.4}
          dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
          dragSnapToOrigin={true}
          className="select-none w-fit"
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          <Link draggable={false} href="/">
            <div>
              <Image
                src="/images/avatar.jpg"
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
                draggable={false}
              />
            </div>
          </Link>
        </motion.div>
      </div>
      <div className="flex items-center gap-x-2 mt-2">
        <h1 className="font-medium text-xl">Jawad</h1>
        <OpenToWork />
      </div>
      <p className="text-muted-foreground">Web Developer</p>
      <div className="flex flex-row justify-between items-center mt-6">
        <div className="flex flex-row gap-x-3">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/iwascounting"
          >
            <FaXTwitter className="text-2xl" />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/notjawad"
          >
            <FaGithub className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}
