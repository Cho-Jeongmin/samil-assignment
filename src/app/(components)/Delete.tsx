import { useCheckedList } from "@/store/useCheckedList";
import { CircleX } from "lucide-react";
import Button from "@/components/atoms/Button";
import { useDeleteFavoriteMutation } from "@/api/query";

export default function Delete({ onClose }: { onClose: () => void }) {
  const checkedList = useCheckedList((state) => state.checkedList);
  const singleDeleteId = useCheckedList((state) => state.singleDeleteId);
  const toggleCheck = useCheckedList((state) => state.toggleCheck);
  const resetCheckedList = useCheckedList((state) => state.resetCheckedList);
  const setSingleDeleteId = useCheckedList((state) => state.setSingleDeleteId);

  const mutation = useDeleteFavoriteMutation();

  const onDelete = () => {
    if (singleDeleteId >= 0) {
      // 단일 삭제
      mutation.mutate([singleDeleteId], {
        onSuccess: () => {
          toggleCheck(singleDeleteId, -1, true);
          setSingleDeleteId(-1);
          onClose();
        },
      });
    } else {
      // 일괄 삭제
      mutation.mutate(checkedList, {
        onSuccess: () => {
          resetCheckedList();
          onClose();
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-20 h-20 rounded-full bg-danger-bg flex justify-center items-center">
        <CircleX className="text-danger" size={40} />
      </div>
      <div className="flex flex-col items-center gap-3 text-text">
        {/* Todo: 단일 삭제시, 삭제 수량 대신 삭제할 기업명 보여주기 */}
        <h1 className="text-2xl font-bold ">{`총 ${
          singleDeleteId >= 0 ? 1 : checkedList.length
        }개 삭제하시겠습니까?`}</h1>
        <p className="text-center">
          관심기업 삭제시 복구할 수 없습니다.
          <br />
          정말 삭제하시겠습니까?
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Button onClick={onDelete} variant="fill" className="bg-text">
          삭제
        </Button>
        <Button onClick={onClose}>취소</Button>
      </div>
    </div>
  );
}
