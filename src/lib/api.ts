const API_BASE = process.env.SERVER_API_BASE;

interface Favorites {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  items: Item[];
}

export interface Item {
  id: number;
  company_name: string;
  created_at: string;
}

export async function fetchFavorites(): Promise<Favorites> {
  try {
    const data = await fetch(`${API_BASE}/favorites?email=jojm0829@gmail.com`);

    return data.json();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites data.");
  }
}

export async function getCompanies(): Promise<{ companies: string[] }> {
  try {
    const data = await fetch(`${API_BASE}/companies`);

    return data.json();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch companies data.");
  }
}

export interface Favorite {
  company_name: string;
  memo: string;
}

export async function postFavorite(favorite: Favorite) {
  try {
    const data = await fetch(`${API_BASE}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "jojm0829@gmail.com",
        ...favorite,
      }),
    });

    return data.json();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to post favorite company.");
  }
}
