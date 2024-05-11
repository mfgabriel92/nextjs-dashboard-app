import { Breadcrumbs, CreateInvoiceForm } from '@/app/components';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit',
};

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPage({ params }: Props) {
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(params.id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    return notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${params.id}/edit`,
            active: true,
          },
        ]}
      />
      <CreateInvoiceForm
        invoice={invoice}
        customers={customers}
        isEditing={true}
      />
    </main>
  );
}
