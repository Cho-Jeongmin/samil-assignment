"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import clsx from "clsx";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  width?: string;
  children?: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  width,
  children,
}: ModalProps) {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            className={`rounded-md w-160 bg-white`}
            style={{ width }}
          >
            <header
              className={clsx(
                "flex justify-between items-center h-14 px-5",
                title && "border-b border-b-border"
              )}
            >
              <DialogTitle className="font-bold">{title}</DialogTitle>
              <button onClick={onClose} className="cursor-pointer">
                <X />
              </button>
            </header>
            <div className="p-5 pt-4">{children}</div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
