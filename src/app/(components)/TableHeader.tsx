"use client";

import { useState } from "react";
import Modal from "@/components/atoms/Modal";
import Create from "./Create";
import Button from "@/components/atoms/Button";
import { Plus, Trash } from "lucide-react";

export interface TableHeaderProps {
  title: string;
  subtitle: string;
  companies: string[];
}

export default function TableHeader({
  title,
  subtitle,
  companies,
}: TableHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[1.75rem] font-semibold mb-1">{title}</h1>
          <p className="text-sm font-normal text-gray-500">{subtitle}</p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="fill"
            icon={<Plus size={20} />}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            관심기업 생성
          </Button>
          <Button icon={<Trash size={20} />}>관심기업 삭제</Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title="관심기업 생성"
      >
        <Create
          companies={companies}
          onSuccess={() => {
            setIsOpen(false);
          }}
        />
      </Modal>
    </header>
  );
}
