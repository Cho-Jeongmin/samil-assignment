"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "fill" | "empty";
  width?: "auto" | string;
}

export default function Button({
  children,
  onClick,
  className,
  icon,
  disabled = false,
  type = "button",
  variant = "empty",
  width = "auto",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={width !== "auto" ? { width } : undefined}
      className={clsx(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-sm hover:cursor-pointer disabled:bg-bg disabled:cursor-default disabled:outline-0 disabled:text-text disabled:opacity-30",
        variant === "fill" ? "bg-black text-white" : "outline",
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
