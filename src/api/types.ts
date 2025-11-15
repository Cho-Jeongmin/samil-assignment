export interface Favorites {
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

export interface Favorite {
  company_name: string;
  memo: string;
}
