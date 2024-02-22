import { Suspense } from 'react';

import TaskTabs from './ui/main/task-tabs';
import { TaskInifiniteScrollSkeleton } from './ui/skeletons';
import { TaskInifiniteScroll } from './ui/main/task-list';
import { LogoutButton } from './ui/logout-button';
import { Hero } from './ui/hero';

export default function Page() {
  return (
    <>
      <LogoutButton />
      <Hero />
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
        <div className="flex rounded-full border border-stone-300 p-1.5 ">
          <TaskTabs />
        </div>
        <div className="relative flex w-full">
          <div className="relative w-full">
            <Suspense fallback={<TaskInifiniteScrollSkeleton />}>
              <TaskInifiniteScroll />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
