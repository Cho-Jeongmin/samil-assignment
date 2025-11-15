"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  isMaster?: boolean;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: () => void;
  className?: string;
};

export default function Checkbox({
  checked,
  onChange,
  onClick,
  className,
}: Props) {
  return (
    <label
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 cursor-pointer select-none",
        className
      )}
    >
      {checked ? (
        <Image
          src="/check-true.svg"
          onClick={() => onChange?.(false)}
          width={20}
          height={20}
          alt="check-true"
        />
      ) : (
        <Image
          src="/check-false.svg"
          onClick={() => onChange?.(true)}
          width={20}
          height={20}
          alt="check-false"
        />
      )}
    </label>
  );
}
