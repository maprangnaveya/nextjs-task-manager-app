'use client';

import { PaginationTaskSchema } from '@/app/lib/decoders';
import { TaskData, TaskPagination } from '@/app/lib/definitions';
import { tasksTodoPage01 } from '@/app/lib/placeholder-data';
import Image from 'next/image';
import { useEffect, useReducer } from 'react';
import { useInView } from 'react-intersection-observer';
import { Card } from './task-card';
import { useSearchParams } from 'next/navigation';

const enum ReducerAction {
  SetPaginationTasks,
  AddPaginationTasks,
}

type Action =
  | {
      type: ReducerAction.SetPaginationTasks;
      pagination: TaskPagination;
    }
  | { type: ReducerAction.AddPaginationTasks; pagination: TaskPagination };
type State = {
  tasks: Array<TaskData>;
  currentPage: number;
  totalPage: number;
};

const initialState = {
  tasks: [],
  currentPage: 1,
  totalPage: 1,
};

const mainReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ReducerAction.SetPaginationTasks: {
      return {
        ...state,
        tasks: [...state.tasks, ...action.pagination.tasks],
        currentPage: action.pagination.pageNumber,
        totalPage: action.pagination.totalPages,
      };
    }
    case ReducerAction.AddPaginationTasks: {
      return {
        ...state,
        tasks: action.pagination.tasks,
        currentPage: action.pagination.pageNumber,
        totalPage: action.pagination.totalPages,
      };
    }
  }
};

export function LoadMore() {
  const searchParams = useSearchParams();

  const { ref, inView } = useInView();
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    if (inView && state.currentPage < state.totalPage) {
      console.log('load more!');
      //   TODO: Call api
      const newPaginationTasks = PaginationTaskSchema.parse(tasksTodoPage01);

      dispatch({
        type: ReducerAction.SetPaginationTasks,
        pagination: newPaginationTasks,
      });
    }
  }, [inView]);


  return (
    <>
      <div className="flex w-full flex-col items-start justify-start">
        {state.tasks.map(function (task: TaskData, index: number) {
          return <Card key={`task-card-${task.id}-${index}`} {...task} />;
        })}
      </div>
      <section>
        <div ref={ref}>
          <Image src="./spinner.svg" alt="spinner" width={50} height={50} />
        </div>
      </section>
    </>
  );
}
