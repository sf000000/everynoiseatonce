import clsx from "clsx";
import { JetBrains_Mono } from "next/font/google";

import { CopyButton } from "@/components/copy-button";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "400", "600"],
  preload: true,
});

export function Pre({
  children,
  raw,
  buttonClasses = "absolute top-3 right-3 bg-zinc-900",
  ...props
}: {
  children: React.ReactNode;
  raw: string;
  buttonClasses?: string;
}) {
  return (
    <pre
      {...props}
      className={clsx("relative text-[15px]", jetbrainsMono.className)}
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-secondary/10 border rounded-lg bg-[radial-gradient(rgba(48,45,42,0.2)_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-full w-full rounded-full bg-indigo-500/5 blur-[100px]"></div>
      </div>
      {children}
      <CopyButton text={raw} className="absolute p-2 m-2 top-3 right-3" />
    </pre>
  );
}
