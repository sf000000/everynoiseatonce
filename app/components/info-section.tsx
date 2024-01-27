import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { ModeToggle } from "@/app/components/mode-toggle";
import AnimatedBorderBadge from "@/app/components/animated-border-badge";

export default function InfoSection({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("", className)} {...props}>
      <Link className="flex items-center justify-between" href="/">
        <Image
          src="/images/avatar.png"
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <ModeToggle />
      </Link>
      <div className="flex items-center gap-x-2 mt-2">
        <h1 className="font-medium text-xl">Jawad</h1>
        <AnimatedBorderBadge label="Open to work" />
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
