import Breadcrumbs from "@/app/ui/breadcrumbs";
import ParentCategoryForm from "@/app/ui/parentCategoryForm";
import ParentCategoryTable from "@/app/ui/parentCategoryTable";

export default function CategoryPage() {
  return (
    <main className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Category", href: "/dashboard/categories", active: true },
          { label: "Sub Category", href: "/dashboard/categories/subcategories" },
          {
            label: "Tag",
            href: `/dashboard/categories/tags`,
          },
        ]}
      />
      <div>
        <ParentCategoryForm />
      </div>
      <div>
        <ParentCategoryTable />
      </div>

    </main>
  );
}
