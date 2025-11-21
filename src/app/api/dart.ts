export async function dartFetch(path: string, params?: URLSearchParams) {
  const API_BASE = process.env.NEXT_PUBLIC_OPEN_DART_BASE;
  const API_KEY = process.env.NEXT_PUBLIC_OPEN_DART_KEY;

  if (!API_BASE) {
    throw new Error("OPEN DART API 주소가 정의되어 있지 않습니다.");
  }

  if (!API_KEY) {
    throw new Error("OPEN DART API 키가 정의되어 있지 않습니다.");
  }

  const url = new URL(path, API_BASE);

  if (params) {
    params.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  url.searchParams.set("crtfc_key", API_KEY);

  console.log(url.toString());

  return await fetch(url.toString());
}
