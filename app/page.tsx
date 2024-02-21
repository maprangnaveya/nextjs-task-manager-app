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
    <main className="flex min-h-full w-3/5 flex-col rounded-xl bg-purple-50 px-10">
      <div className="h-10 px-6 py-20">
        <h1 className=" text-4xl font-bold">Hello There, {userFullName}!</h1>
        <p>Have a nice day!</p>
      </div>
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-3/5 md:px-20">
          <TaskTabs />
        </div>
        <div className="relative flex w-full">
          <Suspense fallback={<InvoicesTableSkeleton />}>
            <TaskList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
