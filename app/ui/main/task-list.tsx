'use client';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import { useSearchParams } from 'next/navigation';
import { useEffect, useReducer } from 'react';
import { useInView } from 'react-intersection-observer';
import { SwipeableList, SwipeableListItem } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { fetchTask } from '@/app/lib/action';
import { TaskData, TaskPagination, TaskType } from '@/app/lib/definitions';

import { Card, DeleteCardAction } from './task-card';
import { SpinnerLoading } from '../spinner-loading';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const enum ReducerAction {
  SetPaginationTasks,
  AddPaginationTasks,
  SetErrorMessage,
  SetLoading,
}
type Action =
  | {
      type: ReducerAction.SetPaginationTasks;
      pagination: TaskPagination;
    }
  | {
      type: ReducerAction.AddPaginationTasks;
      pagination: TaskPagination;
    }
  | {
      type: ReducerAction.SetErrorMessage;
      errorMessage?: string;
    }
  | { type: ReducerAction.SetLoading; isLoading: boolean };

type TasksGroupByDate = { [date: string]: Array<TaskData> };
type State = {
  tasks: Array<TaskData>;
  tasksGroupByDate: TasksGroupByDate;
  currentPage: number;
  totalPage: number;
  errorMessage: string;
  isLoading: boolean;
};

const initialState = {
  tasks: [],
  tasksGroupByDate: {},
  currentPage: 1,
  totalPage: 1,
  errorMessage: '',
  isLoading: false,
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
const getErrorMessage = (tasks: Array<TaskData>): string => {
  if (tasks.length == 0) {
    return 'You do not have any tasks yet! Congrats!';
  } else {
    return '';
  }
};
const mainReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ReducerAction.SetPaginationTasks: {
      const newTasks = [...state.tasks, ...action.pagination.tasks];
      return {
        ...state,
        errorMessage: getErrorMessage(newTasks),
        tasks: newTasks,
        tasksGroupByDate: groupTasksByDate(newTasks),
        currentPage: action.pagination.pageNumber,
        totalPage: action.pagination.totalPages,
        isLoading: false,
      };
    }
    case ReducerAction.AddPaginationTasks: {
      const newTasks = action.pagination.tasks;
      return {
        ...state,
        errorMessage: getErrorMessage(newTasks),
        tasks: newTasks,
        tasksGroupByDate: groupTasksByDate(newTasks),
        currentPage: action.pagination.pageNumber,
        totalPage: action.pagination.totalPages,
        isLoading: false,
      };
    }
    case ReducerAction.SetErrorMessage: {
      return {
        ...state,
        errorMessage: action.errorMessage || '',
        isLoading: false,
      };
    }
    case ReducerAction.SetLoading: {
      return { ...state, isLoading: action.isLoading };
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
    reducerAction:
      | ReducerAction.AddPaginationTasks
      | ReducerAction.SetPaginationTasks,
  ) => {
    const taskStatusType = getTaskStatusType(searchParams.get('status'));

    fetchTask(page, taskStatusType).then((newPaginationTasks) => {
      if (newPaginationTasks.data) {
        dispatch({
          type: reducerAction,
          pagination: newPaginationTasks.data,
        });
      } else {
        dispatch({
          type: ReducerAction.SetErrorMessage,
          errorMessage: newPaginationTasks.error,
        });
      }
    });
  };

  const handleDeleteTask = ({ id, title }: TaskData) => {
    console.log(`>>> Delte task ${id} - ${title}`);
  };

  useEffect(() => {
    if (inView && state.currentPage < state.totalPage) {
      console.log('load more!');
      fetchTasksWithPagination(
        state.currentPage,
        ReducerAction.SetPaginationTasks,
      );
    }
  }, [inView]);

  useEffect(() => {
    console.log('!! status changed!', searchParams.get('status'));
    dispatch({
      type: ReducerAction.SetLoading,
      isLoading: true,
    });
    fetchTasksWithPagination(0, ReducerAction.AddPaginationTasks);
  }, [searchParams.get('status')]);

  console.log('>>>> state.errorMessage: ', state.errorMessage);
  return (
    <>
      <div className="flex w-full flex-col items-start justify-start gap-6">
        {state.isLoading && (
          <div className="absolute self-center">
            <SpinnerLoading />
          </div>
        )}
        {state.errorMessage && (
          <p className="w-full text-center">{state.errorMessage}</p>
        )}
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
                className="relative flex w-full flex-col"
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
            <SpinnerLoading />
          </div>
        )}
      </section>
    </>
  );
}
