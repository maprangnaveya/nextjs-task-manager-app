import { TrashIcon } from '@heroicons/react/24/outline';
import { SwipeAction, TrailingActions } from 'react-swipeable-list';
import { TaskData } from '@/app/lib/definitions';

type OnSwipeDeleteCallback = () => void;
export const DeleteCardAction = (onSwipeDelete: OnSwipeDeleteCallback) => {
  return (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {
          console.log('swipe action delete triggered!');
          onSwipeDelete();
        }}
      >
        <div className="flex flex-col items-center justify-center bg-red-600 py-2 pl-4 text-center text-red-50">
          <TrashIcon className=" h-6 w-6" />
          Delete
        </div>
      </SwipeAction>
    </TrailingActions>
  );
};

export const Card = ({ title, description }: TaskData) => {
  return (
    <div className="w-full p-2 hover:cursor-pointer hover:bg-violet-200">
      <div className="flex flex-col">
        <h3 className="truncate text-xl font-medium">{title}</h3>
        <p className="truncate text-sm">{description}</p>
      </div>
    </div>
  );
};
