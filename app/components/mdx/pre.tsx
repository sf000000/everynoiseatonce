import clsx from "clsx";

import { CopyButton } from "@/components/copy-button";

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
    <pre {...props} className={clsx("relative text-[15px]")}>
      <div className="absolute inset-0 -z-10 h-full w-full border rounded-md bg-secondary/5 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-full w-full rounded-full bg-indigo-500/5 blur-[100px]"></div>
      </div>
      {children}

      <CopyButton text={raw} className="absolute p-2 m-2 top-3 right-3" />
    </pre>
  );
}
