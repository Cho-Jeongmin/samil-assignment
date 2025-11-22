import { NextResponse } from "next/server";
import { dartFetch } from "../dart";
import AdmZip from "adm-zip";
import { parseStringPromise } from "xml2js";

export interface CorpCodeObject {
  corp_code: string[];
  corp_name: string[];
  corp_eng_name: string[];
  stock_code: string[];
  modify_date: string[];
}

export async function GET() {
  try {
    // 고유번호 API 호출
    const response = await dartFetch("/api/corpCode.xml");

    if (!response.ok) {
      return NextResponse.json(
        { error: `고유번호 API 호출에 실패했습니다: ${response.status}` },
        { status: 500 }
      );
    }

    // 압축 해제
    const buffer = Buffer.from(await response.arrayBuffer());
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries();

    for (const entry of entries) {
      if (!entry.entryName.endsWith(".xml")) continue;

      // xml -> json 파싱
      const xmlText = entry.getData().toString("utf8");
      const parsedJson = await parseStringPromise(xmlText, {
        explicitArray: true,
      });
      const corpCodeList = parsedJson.result.list;

      // 고유번호 리스트 반환
      return NextResponse.json({ corpCodeList }, { status: 200 });
    }
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "알 수 없는 에러가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
