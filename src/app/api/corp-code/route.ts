import { NextResponse } from "next/server";
import { dartFetch } from "../dart";
import AdmZip from "adm-zip";
import { parseStringPromise } from "xml2js";

export async function GET(request: Request) {
  // 파라미터 파싱
  const { searchParams } = new URL(request.url);
  const corpName = searchParams.get("corpName");

  if (!corpName) {
    return NextResponse.json(
      { error: "회사명이 필요합니다." },
      { status: 400 }
    );
  }

  // API 호출
  try {
    const response = await dartFetch("/api/corpCode.xml");

    if (!response.ok) {
      return NextResponse.json(
        { error: `OPEN DART API 호출에 실패했습니다: ${response.status}` },
        { status: 500 }
      );
    }

    // 압축 해제
    const buffer = Buffer.from(await response.arrayBuffer());
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries();

    let corpCode: string | undefined;

    for (const entry of entries) {
      if (!entry.entryName.endsWith(".xml")) continue;

      // xml 파싱
      const xmlText = entry.getData().toString("utf8");
      const parsed = await parseStringPromise(xmlText, {
        explicitArray: true,
      });
      const list = parsed.result.list;

      // 기업명 검색
      for (const item of list) {
        if (item.corp_name.includes(corpName)) {
          corpCode =
            typeof item.corp_code === "string"
              ? item.corp_code
              : item.corp_code[0];
          break;
        }
      }
      if (corpCode) break;
    }

    if (!corpCode) {
      return NextResponse.json(
        { error: `${corpName}의 corpCode를 찾지 못했습니다.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ corpCode });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "알 수 없는 에러가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
