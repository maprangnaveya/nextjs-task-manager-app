import { Suspense } from 'react';

import TaskTabs from './ui/main/task-tabs';
import { InvoicesTableSkeleton } from './ui/skeletons';
import { TaskInifiniteScroll } from './ui/main/task-list';

// TODO: Get user full name
let userFullName = 'Sherlock';

export default function Page() {
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
          <div className="relative w-full">
            <Suspense fallback={<InvoicesTableSkeleton />}>
              <TaskInifiniteScroll />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
