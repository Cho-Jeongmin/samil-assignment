import { fetchCompaniesServer } from "@/api/api";
import Banner from "@/components/molecules/Banner";
import Table from "./(components)/Table";

export default async function Home() {
  const { companies } = await fetchCompaniesServer();

  return (
    <div>
      <Banner
        title="관심기업 관리 서비스"
        subtitle="PwC 삼일 Acceleration Center"
      />
      <Table companies={companies} />
    </div>
  );
}
