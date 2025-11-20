import Button from "@/components/atoms/Button";
import SearchableSelect from "@/components/atoms/SearchableSelect";
import { FileScan } from "lucide-react";

interface SearchFilterProps {
  companies: string[];
}

const rowClass = "flex items-center gap-2";
const labelClass = "w-21 flex gap-1";
const spanClass = "text-main font-semibold";

export default function SearchFilter({ companies }: SearchFilterProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col gap-4 justify-between w-full">
        <div className={rowClass}>
          <label className={labelClass}>
            <span className={spanClass}>*</span>기업명
          </label>
          <div className="flex-1">
            <SearchableSelect
              options={companies}
              placeholder="기업명을 입력해주세요"
            />
          </div>
        </div>
        <div className={rowClass}>
          <label className={labelClass}>
            <span className={spanClass}>*</span>사업연도
          </label>
          <div className="flex-1">
            <SearchableSelect
              options={["2021", "2022", "2023", "2024", "2025"]}
              placeholder="사업연도를 선택해주세요"
              searchDisabled={true}
            />
          </div>
        </div>
        <div className={rowClass}>
          <label className={labelClass}>
            <span className={spanClass}>*</span>보고서명
          </label>
          <div className="flex-1">
            <SearchableSelect
              options={[
                "1분기보고서",
                "반기보고서",
                "3분기보고서",
                "사업보고서",
              ]}
              placeholder="보고서명을 선택해주세요"
              searchDisabled={true}
            />
          </div>
        </div>
        <div className={rowClass}>
          <label className={labelClass}>
            <span className={spanClass}>*</span>재무제표
          </label>
          <div className="flex-1">
            <SearchableSelect
              options={["재무제표", "연결재무제표"]}
              placeholder="재무제표 유형을 선택해주세요"
              searchDisabled={true}
            />
          </div>
        </div>
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
