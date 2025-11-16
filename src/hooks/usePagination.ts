import { useCheckedList } from "@/store/useCheckedList";
import { useState } from "react";

// 페이지네이션 hook
export default function usePagination() {
  const [page, setPage] = useState(1);

  const resetCheckedList = useCheckedList((state) => state.resetCheckedList);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
    resetCheckedList();
  };

  return { page, onChangePage };
}
