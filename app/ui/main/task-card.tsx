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
        Delete
      </SwipeAction>
    </TrailingActions>
  );
};

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
