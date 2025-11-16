"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  checked: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Checkbox({
  checked,
  onClick,
  disabled,
  className,
}: Props) {
  return (
    <Image
      src={checked ? "/check-true.svg" : "/check-false.svg"}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
      width={20}
      height={20}
      alt="checkbox"
      className={clsx(
        "flex items-center cursor-pointer select-none",
        disabled && "cursor-default!",
        className
      )}
    />
  );
}
