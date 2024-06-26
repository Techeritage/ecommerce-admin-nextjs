import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/create-form';
 
export default async function ProductCreatePage() {
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Create Product',
            href: '/dashboard/products/create',
            active: true,
          },
        ]}
      />
      <Form />
      
    </main>
  );
}