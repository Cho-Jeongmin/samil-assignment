import { fetchFavorites, getCompanies } from "@/lib/api";
import Banner from "@/components/molecules/Banner";
import Table from "./(components)/Table";

export default async function Home() {
  const { items } = await fetchFavorites();
  const { companies } = await getCompanies();

  return (
    <div>
      <Banner
        title="관심기업 관리 서비스"
        subtitle="PwC 삼일 Acceleration Center"
      />
      <Table items={items} companies={companies} />
    </div>
  );
}
