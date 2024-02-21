import TaskTabs from './ui/main/task-tabs';
import TaskList from './ui/main/task-list';
import { InvoicesTableSkeleton } from './ui/skeletons';
import { Suspense } from 'react';

// TODO: Get user full name
let userFullName = 'Sherlock';

export default function Page({
  searchParams,
}: {
  searchParams?: {
    status?: string;
  };
}) {
  const status = searchParams?.status || '';

  return (
    <>
      <div className="h-10 px-6 py-20">
        <h1 className=" text-4xl font-bold">Hello There, {userFullName}!</h1>
        <p>Have a nice day!</p>
      </div>
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
        <div className="px-6 py-10">
          <TaskTabs />
        </div>
        <div className="relative flex w-full">
          <Suspense fallback={<InvoicesTableSkeleton />}>
            <TaskList />
          </Suspense>
        </div>
      </div>
    </>
  );
}
