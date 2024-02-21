'use client';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useReducer } from 'react';
import { useInView } from 'react-intersection-observer';
import { SwipeableList, SwipeableListItem } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { PaginationTaskSchema } from '@/app/lib/decoders';
import { TaskData, TaskPagination, TaskType } from '@/app/lib/definitions';
import { tasksTodoPage01 } from '@/app/lib/placeholder-data';

import { Card, DeleteCardAction } from './task-card';
import { fetchTask } from '@/app/lib/action';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

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

type TasksGroupByDate = { [date: string]: Array<TaskData> };
type State = {
  tasks: Array<TaskData>;
  tasksGroupByDate: TasksGroupByDate;
  currentPage: number;
  totalPage: number;
};

const initialState = {
  tasks: [],
  tasksGroupByDate: {},
  currentPage: 1,
  totalPage: 1,
};

const groupTasksByDate = (tasks: Array<TaskData>) => {
  const groupByDate: TasksGroupByDate = {};

  tasks.forEach((task: TaskData) => {
    const dateKey = task.createdAt.toISOString().split('T')[0];
    if (!groupByDate[dateKey]) {
      groupByDate[dateKey] = [];
    }
    groupByDate[dateKey].push(task);
  });
  return groupByDate;
};
const mainReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ReducerAction.SetPaginationTasks: {
      const newTasks = [...state.tasks, ...action.pagination.tasks];
      return {
        ...state,
        tasks: newTasks,
        tasksGroupByDate: groupTasksByDate(newTasks),
        currentPage: action.pagination.pageNumber,
        totalPage: action.pagination.totalPages,
      };
    }
    case ReducerAction.AddPaginationTasks: {
      return {
        ...state,
        tasks: action.pagination.tasks,
        tasksGroupByDate: groupTasksByDate(action.pagination.tasks),
        currentPage: action.pagination.pageNumber,
        totalPage: action.pagination.totalPages,
      };
    }
  }
};

const getGroupDateLabel = (dateStr: string) => {
  const targetDate = dayjs(dateStr);
  if (targetDate.isToday()) {
    return 'Today';
  } else if (targetDate.isTomorrow()) {
    return 'Tomorrow';
  } else {
    return targetDate.format('DD MMM YYYY').toUpperCase();
  }
};

const getTaskStatusType = (taskStatusStr: string | null) => {
  if (!taskStatusStr) {
    return TaskType.TODO;
  }
  const taskStatus = Object.keys(TaskType).find(
    (taskType) => taskType.toLowerCase() === taskStatusStr.toLowerCase(),
  ) as TaskType | undefined;
  return taskStatus ?? TaskType.TODO;
};

export function TaskInifiniteScroll() {
  const searchParams = useSearchParams();

  const { ref, inView } = useInView();
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const fetchTasksWithPagination = (
    page: number,
    reducerAction: ReducerAction,
  ) => {
    const taskStatusType = getTaskStatusType(searchParams.get('status'));
    fetchTask(page, taskStatusType).then((newPaginationTasks) => {
      dispatch({
        type: reducerAction,
        pagination: newPaginationTasks,
      });
    });
  };

  const handleDeleteTask = ({ id, title }: TaskData) => {
    console.log(`>>> Delte task ${id} - ${title}`);
  };

  useEffect(() => {
    if (inView && state.currentPage < state.totalPage) {
      console.log('load more!');
      //   TODO: Call api
      fetchTasksWithPagination(
        state.currentPage,
        ReducerAction.SetPaginationTasks,
      );
    }
  }, [inView]);

  useEffect(() => {
    console.log('!! status changed!', searchParams.get('status'));
    // const newPaginationTasks = PaginationTaskSchema.parse(tasksTodoPage01);

    fetchTasksWithPagination(0, ReducerAction.AddPaginationTasks);
  }, [searchParams.get('status')]);
  return (
    <>
      <div className="flex w-full flex-col items-start justify-start gap-6">
        {Object.keys(state.tasksGroupByDate)
          .sort((a: string, b: string) => {
            if (a < b) {
              return -1;
            } else if (a > b) {
              return 1;
            } else {
              return 0;
            }
          })
          .map((dateGroup) => {
            return (
              <div
                key={`task-list-date-group-${dateGroup}`}
                className="flex w-full flex-col"
              >
                <h2 className="text-2xl font-medium">
                  {getGroupDateLabel(dateGroup)}
                </h2>
                <div className="flex w-full flex-col">
                  <SwipeableList fullSwipe={true}>
                    {state.tasksGroupByDate[dateGroup]
                      .sort((a: TaskData, b: TaskData) => {
                        return a.createdAt.getTime() - b.createdAt.getTime();
                      })
                      .map((task: TaskData, index: number) => {
                        return (
                          <SwipeableListItem
                            key={`task-card-${task.id}-${index}-${dateGroup}`}
                            trailingActions={DeleteCardAction(() =>
                              handleDeleteTask(task),
                            )}
                          >
                            <Card {...task} />
                          </SwipeableListItem>
                        );
                      })}
                  </SwipeableList>
                </div>
              </div>
            );
          })}
      </div>
      <section>
        {state.currentPage != state.totalPage && (
          <div ref={ref}>
            <Image src="./spinner.svg" alt="spinner" width={50} height={50} />
          </div>
        )}
      </section>
    </>
  );
}
