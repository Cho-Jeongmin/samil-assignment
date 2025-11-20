"use client";

import Button from "@/components/atoms/Button";
import SearchableSelect from "@/components/atoms/SearchableSelect";
import { FileScan } from "lucide-react";
import { searchConfig } from "../(lib)/searchConfig";
import { useState } from "react";

interface SearchProps {
  companies: string[];
}

const rowClass = "flex items-center gap-2";
const labelClass = "w-21 flex gap-1";
const spanClass = "text-main font-semibold";

export default function Search({ companies }: SearchProps) {
  const [search, setSearch] = useState<{ [key: string]: string }>({});

  console.log(search);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col gap-4 justify-between w-full">
        {searchConfig.map((row) => (
          <div className={rowClass} key={row.id}>
            <label className={labelClass}>
              <span className={spanClass}>*</span>
              {row.label}
            </label>
            <div className="flex-1">
              <SearchableSelect
                options={row.options ? row.options : companies}
                placeholder={row.placeholder}
                searchDisabled={row.searchDisabled}
                value={search[row.name]}
                setValue={(option: string) => {
                  setSearch((prev) => ({ ...prev, [row.name]: option }));
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        disabled
        variant="fill"
        icon={<FileScan size={20} />}
        width="11rem"
      >
        검색
      </Button>
    </div>
  );
}
