import {
  Cards,
  CardsSkeleton,
  LatestInvoices,
  LatestInvoicesSkeleton,
  RevenueChart,
  RevenueChartSkeleton,
} from '@/app/components';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-4xl">Dashboard</h1>
      <hr />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <Cards />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
