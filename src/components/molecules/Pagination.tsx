import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  itemCount: number | undefined;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  itemCount,
  onChange,
}: PaginationProps) {
  // Todo: 페이지 10개씩만 보여주는 로직 추가
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 마지막 페이지의 모든 아이템 삭제 시 이전 페이지로 이동
  useEffect(() => {
    if (page > 1 && page === totalPages + 1 && itemCount === 0) {
      onChange(page - 1);
    }
  }, [page, totalPages, itemCount, onChange]);

  return (
    <div className="flex items-center gap-2 mt-4">
      {/* 왼쪽 화살표 */}
      <button
        className="pagination-arrow"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft />
        <span>이전</span>
      </button>

      {/* 페이지 번호 목록 */}
      {pages.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 cursor-pointer rounded-md ${
            p === page ? "bg-text text-white" : ""
          }`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      {/* 오른쪽 화살표 */}
      <button
        className="pagination-arrow"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        <span>다음</span>
        <ChevronRight />
      </button>
    </div>
  );
}
