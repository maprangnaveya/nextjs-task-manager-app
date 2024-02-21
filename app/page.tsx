import { Suspense } from 'react';

import TaskTabs from './ui/main/task-tabs';
import { InvoicesTableSkeleton } from './ui/skeletons';
import { TaskInifiniteScroll } from './ui/main/task-list';
import { LogoutButton } from './ui/logout-button';
import { Hero } from './ui/hero';

export default function Page() {
  return (
    <>
      <LogoutButton />
      <Hero />
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
