import { NextResponse } from "next/server";
import { dartFetch } from "../dart";
import AdmZip from "adm-zip";
import { parseStringPromise } from "xml2js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // TODO: 파라미터 유효하지 않으면 400 에러 반환

  try {
    // 단일회사 주요계정 API 호출
    const response = await dartFetch("/api/fnlttSinglAcnt.json", searchParams);

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error: ${response.status}` },
        { status: 500 }
      );
    }

    const data = await response.json();

    // API 에러 처리
    if (data.status !== "000") {
      return NextResponse.json(
        { error: data.message },
        { status: data.status === "013" ? 404 : 500 }
      );
    }

    // 접수번호 추출
    const rcept_no = data.list[0].rcept_no;

    // 재무제표 원본파일(XBRL) API 호출
    const response2 = await dartFetch(
      `/api/fnlttXbrl.xml?rcept_no=${rcept_no}&reprt_code=${searchParams.get(
        "reprt_code"
      )}`
    );

    // 압축 해제
    const buffer = Buffer.from(await response2.arrayBuffer());
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries();

    const result: { fileName: string; data: unknown }[] = [];

    // 각 xml 파일로부터 json 파싱
    for (const entry of entries) {
      if (!entry.entryName.endsWith(".xml")) continue;

      // xml -> json 파싱
      const xmlText = entry.getData().toString("utf8");
      const parsedJson = await parseStringPromise(xmlText, {
        explicitArray: false,
      });
      result.push({ fileName: entry.entryName, data: parsedJson });
    }

    // 재무제표 파일 리스트 반환
    return NextResponse.json({ rceptNo: result });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "알 수 없는 에러가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
