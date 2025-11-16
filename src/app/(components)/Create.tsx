"use client";

import Button from "@/components/atoms/Button";
import SearchableSelect from "@/components/atoms/SearchableSelect";
import Textarea from "@/components/atoms/Textarea";
import { useState } from "react";
import { useCreateFavoriteMutation } from "@/api/query";
import toast from "react-hot-toast";
import axios from "axios";

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
        <Button
          variant="fill"
          disabled={name === ""}
          onClick={() => {
            if (name !== "") {
              mutation.mutate(
                { name: name, memo: memo },
                {
                  onError: (error) => {
                    if (
                      axios.isAxiosError(error) &&
                      error.response?.status === 400
                    ) {
                      toast.error("이미 등록된 기업입니다.");
                    } else {
                      toast.error("관심기업 등록에 실패했습니다.");
                    }
                  },
                  onSuccess: () => {
                    onClose();
                    toast.success("관심기업이 등록되었습니다.");
                  },
                }
              );
            }
          }}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
