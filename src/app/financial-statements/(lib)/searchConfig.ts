export const searchConfig: {
  id: number;
  required: boolean;
  name: string;
  label: string;
  placeholder: string;
  options?: string[];
  searchDisabled?: boolean;
}[] = [
  {
    id: 1,
    required: true,
    name: "기업명",
    label: "기업명",
    placeholder: "기업명을 입력해주세요",
  },
  {
    id: 2,
    required: true,
    name: "사업연도",
    label: "사업연도",
    placeholder: "사업연도를 선택해주세요",
    options: ["2021", "2022", "2023", "2024", "2025"],
    searchDisabled: true,
  },
  {
    id: 3,
    required: true,
    name: "보고서명",
    label: "보고서명",
    placeholder: "보고서명을 선택해주세요",
    options: ["1분기보고서", "반기보고서", "3분기보고서", "사업보고서"],
    searchDisabled: true,
  },
  {
    id: 4,
    required: true,
    name: "재무제표",
    label: "재무제표",
    placeholder: "재무제표 유형을 선택해주세요",
    options: ["재무제표", "연결재무제표"],
    searchDisabled: true,
  },
];
