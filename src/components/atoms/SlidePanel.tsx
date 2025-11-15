"use client";

import { Transition, TransitionChild } from "@headlessui/react";
import { useEffect } from "react";

export default function SlidePanel({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  // 배경 스크롤 방지(스크롤 유지 필요)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <Transition show={open}>
      {/* Backdrop */}
      <TransitionChild>
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs transition duration-300 data-closed:opacity-0 z-20"
          onClick={onClose}
        />
      </TransitionChild>

      {/* Slide Panel */}
      <TransitionChild>
        <div className="fixed inset-y-0 right-0 w-250 bg-white transition duration-300 data-closed:translate-x-full z-20">
          {children}
        </div>
      </TransitionChild>
    </Transition>
  );
}
