import { roboto } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Card } from './task-card';
import { tasksTodoPage01 } from '@/app/lib/placeholder-data';
import { TaskSchema, PaginationTaskSchema } from '@/app/lib/decoders';
import { TaskData } from '@/app/lib/definitions';

const now = new Date();

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
  //   await fetchTask();
  const tasksWithPagination = PaginationTaskSchema.parse(tasksTodoPage01);

  return (
    <div className="relative w-full">
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <div className="flex w-full items-center justify-start">
          <h1 className={`${roboto.className} text-2xl`}>Today</h1>
        </div>
        <div className="flex w-full flex-col items-start justify-start">
          {tasksWithPagination.tasks.map(function (
            task: TaskData,
            index: number,
          ) {
            return <Card key={`task-card-${task.id}`} {...task} />;
          })}
        </div>
      </Suspense>
    </div>
  );
}
