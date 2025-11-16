import { deleteFavorite } from "@/api/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useCheckedList } from "@/store/useCheckedList";
import { CircleX } from "lucide-react";
import Button from "@/components/atoms/Button";

export default function Delete({ onClose }: { onClose: () => void }) {
  const checkedList = useCheckedList((state) => state.checkedList);
  const resetCheckedList = useCheckedList((state) => state.resetCheckedList);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (ids: number[]) => {
      await Promise.all(ids.map((id) => deleteFavorite(id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-20 h-20 rounded-full bg-danger-bg flex justify-center items-center">
        <CircleX className="text-danger" size={40} />
      </div>
      <div className="flex flex-col items-center gap-3 text-text">
        <h1 className="text-2xl font-bold ">{`총 ${checkedList.length}개 삭제하시겠습니까?`}</h1>
        <p className="text-center">
          관심기업 삭제시 복구할 수 없습니다.
          <br />
          정말 삭제하시겠습니까?
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Button
          onClick={() => {
            mutation.mutate(checkedList);
            resetCheckedList();
            onClose();
          }}
          variant="fill"
          className="bg-text"
        >
          삭제
        </Button>
        <Button onClick={onClose}>취소</Button>
      </div>
    </div>
  );
}
