import { axiosInstance } from "./axiosInstance";
import { Favorites, Favorite, FavoriteDetail } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const EMAIL = "jojm0829@gmail.com";

// 회사명 리스트 조회(서버용)
export async function fetchCompaniesServer(): Promise<{ companies: string[] }> {
  try {
    const res = await fetch(`${API_BASE}/companies`);
    return res.json();
  } catch (error) {
    console.error("회사명 리스트 조회 에러", error);
    throw new Error("회사명 리스트 조회 에러");
  }
}

// 관심기업 목록 조회
export async function getFavorites(page: number): Promise<Favorites> {
  // throw Error("조회 에러");
  const res = await axiosInstance.get(`/favorites?email=${EMAIL}&page=${page}`);
  return res.data;
}

// 관심기업 등록
export async function createFavorite(favorite: Favorite) {
  // throw Error("등록 에러");
  const res = await axiosInstance.post(`/favorites`, {
    email: EMAIL,
    ...favorite,
  });
  return res.data;
}

// 관심기업 상세 조회
export async function getFavoriteDetail(id: number): Promise<FavoriteDetail> {
  // throw Error("상세 조회 에러");
  const res = await axiosInstance.get(`/favorites/${id}?email=${EMAIL}`);
  return res.data;
}

// 관심기업 메모 수정
export async function updateFavoriteMemo(id: number, memo: string) {
  // throw Error("메모 수정 에러");
  const res = await axiosInstance.put(`/favorites/${id}?email=${EMAIL}`, {
    memo: memo,
  });
  return res.data;
}

// 관심기업 삭제
export async function deleteFavorite(id: number) {
  // throw Error("삭제 에러");
  const res = await axiosInstance.delete(`/favorites/${id}?email=${EMAIL}`);
  return res.data;
}
