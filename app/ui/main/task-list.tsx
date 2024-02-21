import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Card } from '../dashboard/cards';

export default async function TaskList({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="relative w-full">
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <div className="flex w-full items-center justify-start">
          <h1 className={`${lusitana.className} text-4xl`}>Today</h1>
        </div>
        <div className="flex w-full flex-col items-start justify-start">
          <Card title="Honey Pancake" description="WOW this is value" />
          <Card title="Honey Pancake2" description="WOW this is value" />
        </div>
      </Suspense>
    </div>
  );
}
