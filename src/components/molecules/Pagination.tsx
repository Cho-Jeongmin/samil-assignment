import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  // Todo: 페이지 10개씩만 보여주는 로직 추가
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
