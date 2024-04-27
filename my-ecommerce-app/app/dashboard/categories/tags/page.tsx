import Breadcrumbs from "@/app/ui/breadcrumbs";
import TagForm from "@/app/ui/tagForm";
import TagTable from "@/app/ui/tagTable";
import React from "react";

export default function TagPage() {
  return (
    <main className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Category", href: "/dashboard/categories" },
          { label: "Sub Category", href: "/dashboard/categories/subcategories" },
          {
            label: "Tag",
            href: `/dashboard/categories/tags`,
            active: true,
          },
        ]}
      />
      <div>
        <TagForm />
      </div>
      <div>
        <TagTable />
      </div>
    </main>
  );
}
