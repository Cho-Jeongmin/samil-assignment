"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Pencil } from "lucide-react";
import Button from "@/components/atoms/Button";
import Textarea from "@/components/atoms/Textarea";
import {
  useFavoriteDetailQuery,
  useUpdateFavoriteMemoMutation,
} from "@/api/query";

export default function Detail() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("company-id")) || -1;

  const { data: favoriteDetail } = useFavoriteDetailQuery(id);

  const mutation = useUpdateFavoriteMemoMutation();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [memo, setMemo] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  console.log(memo);

  // memo 초기값 설정
  useEffect(() => {
    if (favoriteDetail) {
      setMemo(favoriteDetail?.memo);
    }
  }, [favoriteDetail]);

  // 수정하기 버튼 클릭시 textarea에 포커스
  useLayoutEffect(() => {
    if (isEdit) {
      if (textareaRef.current) {
        textareaRef.current?.focus();
      }
    }
  }, [isEdit]);

  const onCancel = () => {
    setIsEdit(false);
    if (favoriteDetail) {
      setMemo(favoriteDetail?.memo);
    }
  };

  const onSave = () => {
    mutation.mutate({ id: id, memo: memo });
    setIsEdit(false);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="border-b border-b-border h-15 flex justify-center items-center text-2xl font-bold">
        {favoriteDetail?.company_name}
      </header>
      <main className="px-5 py-4 flex-1">
        <Textarea
          height="full"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          disabled={!isEdit}
          ref={textareaRef}
        />
      </main>
      <div className="p-5 flex justify-end">
        {!isEdit ? (
          <Button
            onClick={() => setIsEdit(true)}
            variant="fill"
            icon={<Pencil size={20} />}
          >
            수정하기
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button onClick={onCancel}>취소하기</Button>
            <Button onClick={onSave} variant="fill">
              저장하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
