"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useSlidePanel = () => {
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
    }
    replace(`${pathname}?${params.toString()}`);
    setSlidePanelOpen((prev) => !prev);
  };

  return { slidePanelOpen, onOpenCloseItem };
};
