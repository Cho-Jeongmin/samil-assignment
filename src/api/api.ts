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
    console.error("Database Error:", error);
    throw new Error("Failed to fetch companies data.");
  }
}

// 관심기업 목록 조회
export async function getFavorites(): Promise<Favorites> {
  try {
    const res = await axiosInstance.get(`/favorites?email=${EMAIL}`);
    return res.data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites data.");
  }
}

// 관심기업 등록
export async function createFavorite(favorite: Favorite) {
  try {
    const res = await axiosInstance.post(`/favorites`, {
      email: EMAIL,
      ...favorite,
    });
    return res.data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to post favorite company.");
  }
}

// 관심기업 상세 조회
export async function getFavoriteDetail(id: number): Promise<FavoriteDetail> {
  try {
    const res = await axiosInstance.get(`/favorites/${id}?email=${EMAIL}`);
    return res.data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites data.");
  }
}
