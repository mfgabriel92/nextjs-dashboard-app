import {
  CreateInvoice,
  InvoicesTableSkeleton,
  Pagination,
  Search,
} from '@/app/components';
import { InvoicesTable } from '@/app/components/invoices/InvoiceTable';
import { fetchInvoicesPages } from '@/app/lib';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Invoices',
};

interface Props {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function InvoicesPage({ searchParams }: Props) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-4xl">Invoices</h1>
      </div>
      <hr />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
