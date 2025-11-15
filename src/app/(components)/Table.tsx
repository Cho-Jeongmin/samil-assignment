import { Item } from "@/lib/api";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

export default function Table({
  items,
  companies,
}: {
  items: Item[];
  companies: string[];
}) {
  return (
    <main className="px-30 py-15 flex flex-col gap-6">
      <TableHeader
        title="관심기업 관리 서비스"
        subtitle="관심 기업을 등록하고 삭제하며 관리하세요."
        companies={companies}
      />
      <TableContent items={items} />
    </main>
  );
}
