import { FavoriteDetail } from "@/api/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// 관심기업 메모 수정 hook
export default function useMemoEdit(
  favoriteDetail: FavoriteDetail | undefined,
  mutateMemo: (memo: string, onSuccess: () => void) => void
) {
  const [memo, setMemo] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // memo 초기값 설정
  useEffect(() => {
    if (favoriteDetail) {
      setMemo(favoriteDetail?.memo);
    }
  }, [favoriteDetail]);

  const onCancel = () => {
    setIsEdit(false);
    if (favoriteDetail) {
      setMemo(favoriteDetail?.memo);
    }
  };

  const onSave = () => {
    mutateMemo(memo, () => {
      setIsEdit(false);
    });
  };

  return { memo, setMemo, isEdit, setIsEdit, onCancel, onSave };
}
