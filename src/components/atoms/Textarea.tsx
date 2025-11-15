"use client";

import clsx from "clsx";
import { Ref } from "react";

export default function Textarea({
  height,
  ref,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  height: string;
  ref?: Ref<HTMLTextAreaElement>;
}) {
  return (
    <textarea
      style={{ height }}
      className={clsx(
        "outline-0 border border-border rounded-md resize-none p-4 text-text w-full",
        height === "full" && "h-full!"
      )}
      ref={ref}
      {...props}
    />
  );
}
