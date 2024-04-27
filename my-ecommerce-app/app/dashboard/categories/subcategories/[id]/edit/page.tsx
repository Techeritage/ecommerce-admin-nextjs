'use client';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import EditCategoryForm from '@/app/ui/editCategoryForm';
import EditSubcategoryForm from '@/app/ui/editSubcategoryForm';
import { useParams } from 'next/navigation';
import React from 'react'

export default function SubcategoryEditPage() {
  const { id }: { id: string } = useParams();
  return (
    <main className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Subcategory", href: "/dashboard/categories/subcategories" },
          {
            label: "Edit Subcategory",
            href: `/dashboard/categories/subcategories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div>
        <EditSubcategoryForm id={id} />
      </div>
    </main>
  );
}
