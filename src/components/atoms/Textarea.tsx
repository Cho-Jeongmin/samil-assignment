"use client";

import clsx from "clsx";

export default function Textarea({
  height,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { height: string }) {
  return (
    <textarea
      style={{ height }}
      className={clsx(
        "outline-0 border border-border rounded-md resize-none p-4 text-text w-full",
        height === "full" && "h-full!"
      )}
      {...props}
    />
  );
}
