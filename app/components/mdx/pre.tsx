import clsx from "clsx";

import { CopyButton } from "@/components/copy-button";

export function Pre({
  children,
  raw,
  buttonClasses = "absolute top-3 right-3 bg-zinc-900",
  ...props
}: {
  children: any;
  raw: string;
  buttonClasses?: string;
}) {
  return (
    <pre {...props} className={clsx("relative")}>
      {children}
      <CopyButton text={raw} className="absolute p-2 m-2 top-3 right-3" />
    </pre>
  );
}
