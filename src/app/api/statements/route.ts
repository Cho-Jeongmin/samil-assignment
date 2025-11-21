import { NextResponse } from "next/server";
import { dartFetch } from "../dart";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    // 단일회사 주요계정 api 호출
    const response = await dartFetch("/api/fnlttSinglAcnt.json", searchParams);

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error: ${response.status}` },
        { status: 500 }
      );
    }

    const json = await response.json();

    // 접수번호 반환
    return NextResponse.json({ rceptNo: json.list[0].rcept_no });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
