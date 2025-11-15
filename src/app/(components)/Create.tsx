"use client";

import Button from "@/components/atoms/Button";
import SearchableSelect from "@/components/atoms/SearchableSelect";
import Textarea from "@/components/atoms/Textarea";
import { createFavorite } from "@/api/api";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function Create({
  companies,
  onSuccess,
}: {
  companies: string[];
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => createFavorite({ company_name: name, memo: memo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      onSuccess();
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h2 className="text-text">관심기업 검색</h2>
        <SearchableSelect value={name} setValue={setName} options={companies} />
        <Textarea
          value={memo}
          onChange={(e) => {
            setMemo(e.target.value);
          }}
          height="282px"
        />
      </div>
      <div className="flex justify-end gap-2 mt-9">
        <Button variant="fill" onClick={() => mutation.mutate()}>
          저장
        </Button>
      </div>
    </div>
  );
}
