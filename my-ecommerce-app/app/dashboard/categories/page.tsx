import Breadcrumbs from "@/app/ui/breadcrumbs";
import CategoryForm from "@/app/ui/category-form";
import CategoryTable from "@/app/ui/categoryTable";

export default function CategoryPage() {
  return (
    <main className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Category", href: "/dashboard/categories", active: true },
          {
            label: "Tag",
            href: `/dashboard/categories/tags`,
          },
        ]}
      />
      <div>
        <CategoryForm />
      </div>
      <div>
        <CategoryTable />
      </div>
    </main>
  );
}
