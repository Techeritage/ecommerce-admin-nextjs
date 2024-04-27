'use client';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import EditTagForm from '@/app/ui/editTagForm';
import { useParams } from 'next/navigation';

export default function TagEditPage() {
  const { id }: { id: string } = useParams();
  return (
    <main className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tag", href: "/dashboard/categories/tags" },
          {
            label: "Edit Tag",
            href: `/dashboard/categories/tags/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div>
        <EditTagForm id={id} />
      </div>
    </main>
  )
}
