import { SelectOptions } from "@/components/atoms/SearchableSelect";

export const searchConfig: {
  id: number;
  required: boolean;
  name: string;
  label: string;
  placeholder: string;
  options?: SelectOptions;
  searchDisabled?: boolean;
}[] = [
  {
    id: 1,
    required: true,
    name: "corp_code",
    label: "기업명",
    placeholder: "기업명을 입력해주세요",
  },
  {
    id: 2,
    required: true,
    name: "bsns_year",
    label: "사업연도",
    placeholder: "사업연도를 선택해주세요",
    options: ["2021", "2022", "2023", "2024", "2025"],
    searchDisabled: true,
  },
  {
    id: 3,
    required: true,
    name: "reprt_code",
    label: "보고서명",
    placeholder: "보고서명을 선택해주세요",
    options: [
      { label: "1분기보고서", value: "11013" },
      { label: "반기보고서", value: "11012" },
      { label: "3분기보고서", value: "11014" },
      { label: "사업보고서", value: "11011" },
    ],
    searchDisabled: true,
  },
  {
    id: 4,
    required: true,
    name: "fs_div",
    label: "재무제표",
    placeholder: "재무제표 유형을 선택해주세요",
    options: [
      { label: "재무제표", value: "OFS" },
      { label: "연결재무제표", value: "CFS" },
    ],
    searchDisabled: true,
  },
];
