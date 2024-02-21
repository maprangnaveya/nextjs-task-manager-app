import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { tasksTodoPage01 } from '@/app/lib/placeholder-data';
import { TaskSchema, PaginationTaskSchema } from '@/app/lib/decoders';
import { TaskInifiniteScroll } from './load-more';

const now = new Date();

export default async function TaskList({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <div className="relative w-full">
      <Suspense
        key={`task-list-content-${query}-`}
        fallback={<InvoicesTableSkeleton />}
      >
        <TaskInifiniteScroll />
      </Suspense>
    </div>
  );
}
