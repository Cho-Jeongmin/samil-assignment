"use client";

import Button from "@/components/atoms/Button";
import SearchableSelect from "@/components/atoms/SearchableSelect";
import { FileScan } from "lucide-react";
import { searchConfig } from "../(lib)/searchConfig";
import Viewer from "./Viewer";
import useSearchStatement from "@/hooks/useSearchStatement";

interface SearchProps {
  companies: string[];
}

export default function Search({ companies }: SearchProps) {
  const { search, setSearch, onSearch, iframe } = useSearchStatement();

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col gap-4 justify-between w-full">
          {searchConfig.map((row) => (
            <div className="flex items-center gap-2" key={row.id}>
              <label className="w-21 flex gap-1">
                <span className="text-main font-semibold">*</span>
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
          onClick={onSearch}
          variant="fill"
          icon={<FileScan size={20} />}
          width="11rem"
        >
          검색
        </Button>
      </div>
      <Viewer iframe={iframe} />
    </div>
  );
}
