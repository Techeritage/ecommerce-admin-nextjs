//import Pagination from '@/app/ui/invoices/pagination';
import Search from "@/app/ui/search";
import Table from "@/app/ui/table";
import { CreateInvoice } from "@/app/ui/buttons";
import { lusitana } from "@/app/ui/fonts";

export default async function ProductPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  //const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateInvoice />
      </div>

      <Table query={query} />
    </div>
  );
}
