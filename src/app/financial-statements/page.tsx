import { fetchCompaniesServer } from "@/api/api";
import Banner from "@/components/molecules/Banner";
import Search from "./(components)/Search";
import Title from "@/components/atoms/Title";

export default async function FinancialStatmentsPage() {
  const { companies } = await fetchCompaniesServer();

  return (
    <div>
      <Banner
        title="기업 재무제표 조회"
        subtitle="PwC 삼일 Acceleration Center"
      />
      <main className="px-30 py-15 flex flex-col gap-7">
        <Title
          title="기업 재무제표 조회"
          subtitle="기업명과 보고서 옵션을 선택하여 제무제표를 조회해보세요."
        />
        <Search companies={companies} />
      </main>
    </div>
  );
}
