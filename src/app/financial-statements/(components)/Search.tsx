"use client";

import Button from "@/components/atoms/Button";
import SearchableSelect from "@/components/atoms/SearchableSelect";
import { FileScan } from "lucide-react";
import { searchConfig } from "../(lib)/searchConfig";
import { useState, useRef, useEffect } from "react";
import { CorpCodeObject } from "@/app/api/corpCodeList/route";

interface SearchProps {
  companies: string[];
}

const rowClass = "flex items-center gap-2";
const labelClass = "w-21 flex gap-1";
const spanClass = "text-main font-semibold";

export default function Search({ companies }: SearchProps) {
  const [search, setSearch] = useState<{ [key: string]: string }>({});
  const corpCodeListRef = useRef<Promise<CorpCodeObject[]> | null>(null);
  const [iframe, setIframe] = useState<HTMLIFrameElement>();

  // 고유번호 리스트 얻기
  useEffect(() => {
    corpCodeListRef.current = (async () => {
      const res = await fetch(`/api/corpCodeList`);
      const data = await res.json();
      return data.corpCodeList;
    })();
  }, []);

  // 재무제표 검색 핸들러
  const onSearch = async () => {
    if (!corpCodeListRef.current) return;

    // 고유번호 리스트 응답 기다리기
    const corpCodeList = await corpCodeListRef.current;

    // 해당 기업의 고유번호 찾기
    const corp_code = corpCodeList.find((corp) =>
      corp.corp_name.includes(search.corp_name)
    )?.corp_code[0];

    // // 재무제표 데이터 얻기
    // const res = await fetch(
    //   `/api/statement?corp_code=${corp_code}&bsns_year=${search.bsns_year}&reprt_code=${search.reprt_code}&fs_div=${search.fs_div}`
    // );
    // const json = await res.json();
    // console.log("재무제표 데이터", json);

    if (!corp_code) return;

    try {
      // 제무제표 뷰어 얻기

      // 1. FormData 생성
      const formData = new FormData();
      formData.append("textCrpCik", corp_code);
      formData.append("textCrpNm", search.corp_name);
      formData.append("selectYear", search.bsns_year);
      formData.append("reportCode", search.reprt_code);
      formData.append("selectToc", search.fs_div);

      // 2. 제무제표 뷰어 POST 요청
      const response = await fetch(
        "https://opendart.fss.or.kr/disclosureinfo/fnltt/singl/list.do",
        {
          method: "POST",
          body: formData, // Content-Type 자동으로 multipart/form-data로 설정됨
        }
      );

      // iframe 태그 추출

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const iframe = doc.querySelector("iframe");

      if (!iframe) return;

      setIframe(iframe);
    } catch (error) {
      console.log(error);
    }
  };

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
        onClick={onSearch}
        variant="fill"
        icon={<FileScan size={20} />}
        width="11rem"
      >
        검색
      </Button>
      {iframe && (
        <div
          className="w-full h-screen"
          ref={(el) => {
            if (el && iframe) {
              el.innerHTML = "";
              el.appendChild(iframe);
            }
          }}
        />
      )}
    </div>
  );
}
