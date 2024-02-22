export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
};

export enum TaskType {
  TODO = "TODO", DOING = "DOING", DONE = "DONE"
}

export type TaskData = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: TaskType;
}

export type TaskPagination = {
  tasks: Array<TaskData>,
  pageNumber: number,
  totalPages: number,
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
