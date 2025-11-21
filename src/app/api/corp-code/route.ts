import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import { parseStringPromise } from "xml2js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const corpName = searchParams.get("corpName");
  if (!corpName) {
    return NextResponse.json(
      { error: "회사명이 필요합니다." },
      { status: 400 }
    );
  }

  const API_BASE = process.env.NEXT_PUBLIC_OPEN_DART_BASE;
  if (!API_BASE) {
    return NextResponse.json(
      { error: "API 주소가 없습니다." },
      { status: 500 }
    );
  }

  const API_KEY = process.env.NEXT_PUBLIC_OPEN_DART_KEY;
  if (!API_KEY) {
    return NextResponse.json(
      { error: "API 인증키가 없습니다." },
      { status: 500 }
    );
  }

  // API 요청
  try {
    const response = await fetch(
      `${API_BASE}/corpCode.xml?crtfc_key=${API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error: ${response.status}` },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries();

    let corpCode: string | undefined;

    for (const entry of entries) {
      if (!entry.entryName.endsWith(".xml")) continue;

      const xmlText = entry.getData().toString("utf8");
      const parsed = await parseStringPromise(xmlText, {
        explicitArray: true,
      });
      const list = parsed.result.list;

      for (const item of list) {
        if (item.corp_name.includes(corpName)) {
          corpCode = item.corp_code;
          break;
        }
      }
      if (corpCode) break;
    }
    if (!corpCode) {
      return NextResponse.json(
        { error: `${corpName}의 corp_code를 찾지 못했습니다.` },
        { status: 404 }
      );
    }
    return NextResponse.json({ corpCode });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
