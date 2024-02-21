import { TaskData, TaskType } from '@/app/lib/definitions';

export function Card({ title, description }: TaskData) {
  return (
    <div className="w-full p-2 hover:cursor-pointer hover:bg-violet-200">
      <div className="flex flex-col">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className={'truncate text-sm'}>{description}</p>
      </div>
    </div>
  );
}
