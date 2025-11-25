"use client";

import { useState } from "react";
import { useCheckedList } from "@/store/useCheckedList";

import Modal from "@/components/atoms/Modal";
import Create from "./Create";
import Button from "@/components/atoms/Button";
import { Plus, Trash } from "lucide-react";
import Title from "@/components/atoms/Title";

interface TableHeaderProps {
  title: string;
  subtitle: string;
  companies: string[];
  onOpenDelete: () => void;
}

export default function TableHeader({
  title,
  subtitle,
  companies,
  onOpenDelete,
}: TableHeaderProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const checkedList = useCheckedList((state) => state.checkedList);

  return (
    <header>
      <div className="flex justify-between items-end">
        <Title title={title} subtitle={subtitle} />
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
            onClick={onOpenDelete}
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
    </header>
  );
}
