"use client";

import { Transition, TransitionChild } from "@headlessui/react";

export default function SlidePanel({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) {
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
