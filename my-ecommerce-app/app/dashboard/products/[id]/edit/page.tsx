"use client";
import Form from "@/app/ui/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { useParams } from "next/navigation";
import NotFound from "./not-found";
import { Suspense } from "react";

export default function ProductEditPage() {
  const { id }: { id: string } = useParams();

  if (!id) {
    NotFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Edit Product",
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Suspense fallback="loading form...">
        <Form id={id} />
      </Suspense>
    </main>
  );
}
