'use client';
import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditCategoryForm from "@/app/ui/editCategoryForm";
import { useParams } from "next/navigation";

export default function CategoryEditPage() {
  const { id }: { id: string } = useParams();
  return (
    <main className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Category", href: "/dashboard/categories" },
          {
            label: "Edit Category",
            href: `/dashboard/categories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div>
        <EditCategoryForm id={id} />
      </div>
    </main>
  );
}
