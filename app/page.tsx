import Image from 'next/image';
import TaskTabs from './ui/main/task-tabs';
import TaskList from './ui/main/task-list';

// TODO: Get user full name
let userFullName = 'Sherlock';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 md:px-20 md:py-10">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        Hi {userFullName},
        <br />
        Are you ready to finish your task?
      </div>
      <div className="mt-4 flex w-full grow flex-col items-center justify-center gap-4">
        <div className="flex flex-col   gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-3/5 md:px-20">
          <TaskTabs />
        </div>
        <div className="relative flex w-full">
          <TaskList />
        </div>
      </div>
    </main>
  );
}
