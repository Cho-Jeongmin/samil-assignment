"use client";

import { getFavoriteDetail } from "@/api/api";
import Button from "@/components/atoms/Button";
import Textarea from "@/components/atoms/Textarea";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Detail() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("company-id")) || -1;
  const { data: favoriteDetail } = useQuery({
    queryKey: ["favorite-detail", id],
    queryFn: () => getFavoriteDetail(id),
    enabled: id >= 0,
  });

  return (
    <div className="flex flex-col h-full">
      <header className="border-b border-b-border h-15 flex justify-center items-center text-2xl font-bold">
        {favoriteDetail?.company_name}
      </header>
      <main className="px-5 py-4 flex-1">
        <Textarea height="full" value={favoriteDetail?.memo} />
      </main>
      <div className="p-5 flex justify-end">
        <Button variant="fill" icon={<Pencil size={20} />}>
          수정하기
        </Button>
      </div>
    </div>
  );
}
