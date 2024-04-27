import Breadcrumbs from "@/app/ui/breadcrumbs";
import SubCategoryForm from "@/app/ui/subcategory-form";
import SubcategoryTable from "@/app/ui/subcategoryTable";

export default function SubCategoryPage() {
  return (
    <main className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Category", href: "/dashboard/categories" },
          {
            label: "Sub Category",
            href: "/dashboard/categories/subcategories",
            active: true,
          },
          {
            label: "Tag",
            href: `/dashboard/categories/tags`,
          },
        ]}
      />
      <div>
        <SubCategoryForm />
      </div>
      <div>
        <SubcategoryTable />
      </div>
    </main>
  );
}
