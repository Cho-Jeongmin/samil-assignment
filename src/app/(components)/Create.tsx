"use client";

import Button from "@/components/atoms/Button";
import SearchableSelect from "@/components/atoms/SearchableSelect";
import Textarea from "@/components/atoms/Textarea";
import { useState } from "react";
import { useCreateFavoriteMutation, useFavoritesQuery } from "@/api/query";

export default function Create({
  companies,
  onClose,
}: {
  companies: string[];
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");

  const mutation = useCreateFavoriteMutation();
  const { data: favorites } = useFavoritesQuery(-1);

  // 관심기업은 제외하고 SearchableSelect에 전달
  const nonFavoriteCompanies = companies.filter(
    (company) =>
      !favorites?.items.map((item) => item.company_name).includes(company)
  );

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h2 className="text-text">관심기업 검색</h2>
        <SearchableSelect
          value={name}
          setValue={setName}
          options={nonFavoriteCompanies}
        />
        <Textarea
          value={memo}
          onChange={(e) => {
            setMemo(e.target.value);
          }}
          height="282px"
        />
      </div>
      <div className="flex justify-end gap-2 mt-9">
        <Button
          variant="fill"
          disabled={name === ""}
          onClick={() => {
            if (name !== "") {
              mutation.mutate({ name: name, memo: memo });
              onClose();
            }
          }}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
