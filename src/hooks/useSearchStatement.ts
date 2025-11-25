import { CorpCodeObject } from "@/app/api/corpCodeList/route";
import { useState, useRef, useEffect } from "react";

export default function useSearchStatement() {
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

    if (!corp_code) return;

    try {
      // FormData 생성
      const formData = new FormData();
      formData.append("textCrpCik", corp_code);
      formData.append("textCrpNm", search.corp_name);
      formData.append("selectYear", search.bsns_year);
      formData.append("reportCode", search.reprt_code);
      formData.append("selectToc", search.fs_div);

      // 제무제표 뷰어 POST 요청
      const response = await fetch(
        "https://opendart.fss.or.kr/disclosureinfo/fnltt/singl/list.do",
        {
          method: "POST",
          body: formData,
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

  return { search, setSearch, onSearch, iframe };
}
