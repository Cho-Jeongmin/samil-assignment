"use client";

import { Box } from "lucide-react";
import { useEffect } from "react";

export default function Viewer() {
  useEffect(() => {
    const getCorpCode = async () => {
      const res = await fetch(
        `/api/corp-code?corpName=${encodeURIComponent("삼일회계법인")}`
      );
      console.log(res);
    };
    getCorpCode();
  }, []);

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col items-center justify-center gap-5 rounded-md border border-border bg-[#F9FAFB]">
      <Box size={65} />
      <span>기업명과 보고서 옵션을 선택하여 제무제표를 조회해보세요.</span>
    </div>
  );
}
