"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// 관심기업 상세 슬라이드 패널 hook
export default function useSlidePanel() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [slidePanelOpen, setSlidePanelOpen] = useState(
    searchParams.get("company-id") ? true : false
  );

  const onOpenCloseItem = (id: number | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set("company-id", id.toString());
    } else {
      params.delete("company-id");
      // Todo: 메모 수정 중 패널 닫을 시 alert 띄우기
    }
    replace(`${pathname}?${params.toString()}`);
    setSlidePanelOpen((prev) => !prev);
  };

  return { slidePanelOpen, onOpenCloseItem };
}
