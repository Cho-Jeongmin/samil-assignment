"use client";

import { useSearchParams } from "next/navigation";
import { Pencil } from "lucide-react";
import Button from "@/components/atoms/Button";
import Textarea from "@/components/atoms/Textarea";
import {
  useFavoriteDetailQuery,
  useUpdateFavoriteMemoMutation,
} from "@/api/query";
import useTextareaFocus from "@/hooks/useTextareaFocus";
import useMemoEdit from "@/hooks/useMemoEdit";

export default function Detail() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("company-id")) || -1;
  const {
    data: favoriteDetail,
    isLoading,
    isError,
  } = useFavoriteDetailQuery(id);

  const mutation = useUpdateFavoriteMemoMutation();

  const { memo, setMemo, isEdit, setIsEdit, onCancel, onSave } = useMemoEdit(
    favoriteDetail,
    (memo: string, onSuccess: () => void) => {
      mutation.mutate({ id: id, memo: memo, onSuccess: onSuccess });
    }
  );

  const { textareaRef } = useTextareaFocus(isEdit);

  if (isLoading || isError)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {isLoading
          ? "로딩 중..."
          : isError && "관심기업 상세 조회에 실패했습니다."}
      </div>
    );

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
