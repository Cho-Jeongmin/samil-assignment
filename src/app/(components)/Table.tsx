"use client";

import { useState } from "react";

import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import Modal from "@/components/atoms/Modal";
import Delete from "./Delete";
import { useCheckedList } from "@/store/useCheckedList";

export default function Table({ companies }: { companies: string[] }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const setSingleDeleteId = useCheckedList((state) => state.setSingleDeleteId);

  const onCloseDelete = () => {
    setSingleDeleteId(-1);
    setIsDeleteOpen(false);
  };

  return (
    <main className="px-30 py-15 flex flex-col gap-6">
      <TableHeader
        title="관심기업 관리 서비스"
        subtitle="관심 기업을 등록하고 삭제하며 관리하세요."
        companies={companies}
        onOpenDelete={() => setIsDeleteOpen(true)}
      />
      <TableContent onOpenDelete={() => setIsDeleteOpen(true)} />

      {/* 관심기업 삭제 모달 */}
      <Modal isOpen={isDeleteOpen} onClose={onCloseDelete} width="400px">
        <Delete onClose={onCloseDelete} />
      </Modal>
    </main>
  );
}
