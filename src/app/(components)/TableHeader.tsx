"use client";

import { useState } from "react";
import { useCheckedList } from "@/store/useCheckedList";

import Modal from "@/components/atoms/Modal";
import Create from "./Create";
import Button from "@/components/atoms/Button";
import Delete from "./Delete";
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
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const checkedList = useCheckedList((state) => state.checkedList);

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
              setIsCreateOpen(true);
            }}
          >
            관심기업 생성
          </Button>
          <Button
            disabled={checkedList.length === 0}
            icon={<Trash size={20} />}
            onClick={() => setIsDeleteOpen(true)}
          >
            관심기업 삭제
          </Button>
        </div>
      </div>
      {/* 관심기업 생성 모달 */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
        }}
        title="관심기업 생성"
      >
        <Create
          companies={companies}
          onClose={() => {
            setIsCreateOpen(false);
          }}
        />
      </Modal>
      {/* 관심기업 삭제 모달 */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
        }}
        width="400px"
      >
        <Delete
          onClose={() => {
            setIsDeleteOpen(false);
          }}
        />
      </Modal>
    </header>
  );
}
