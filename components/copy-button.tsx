import { useState } from "react";
import clsx from "clsx";
import { Check, Clipboard } from "lucide-react";

import { toast } from "sonner";

const buttonClasses =
  "flex items-center text-xs font-medium text-white rounded";

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  const Icon = isCopied ? Check : Clipboard;

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className={clsx(buttonClasses, className)}
    >
      <Icon className="mr-1 h-4 w-4" />
    </button>
  );
}
