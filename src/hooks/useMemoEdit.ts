import { useUpdateFavoriteMemoMutation } from "@/api/query";
import { FavoriteDetail } from "@/api/types";
import { useEffect, useState } from "react";

interface useMemoEditProps {
  id: number;
  favoriteDetail: FavoriteDetail | undefined;
}

// 관심기업 메모 수정 hook
export default function useMemoEdit({ id, favoriteDetail }: useMemoEditProps) {
  const [memo, setMemo] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const mutation = useUpdateFavoriteMemoMutation();

  // memo 초기값 설정
  useEffect(() => {
    if (favoriteDetail && !isEdit) {
      setMemo(favoriteDetail.memo);
    }
  }, [favoriteDetail, isEdit]);

  const onCancel = () => {
    setIsEdit(false);
    if (favoriteDetail) {
      setMemo(favoriteDetail?.memo);
    }
  };

  const onSave = () => {
    mutation.mutate(
      { id: id, memo: memo },
      {
        onSuccess: () => {
          setIsEdit(false);
        },
      }
    );
  };

  return { memo, setMemo, isEdit, setIsEdit, onCancel, onSave };
}
