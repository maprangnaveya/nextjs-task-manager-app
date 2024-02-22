"use server";

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { ApiResponse, TaskPagination, TaskType } from './definitions';
import { PaginationTaskSchema } from './decoders';
import { tasksTodoPage01, tasksTodoEmpty } from './placeholder-data';


export const fetchTask = async (page: number, status: TaskType = TaskType.TODO): Promise<ApiResponse<TaskPagination>> => {

    const limit: number = 10;

    const queryparams = `offset=${page}&limit=${limit}&sortBy=createdAt&isAsc=true&status=${status}`
    try {
        const response = await fetch(`https://todo-list-api-mfchjooefq-as.a.run.app/todo-list?${queryparams}`)

        const data = await response.json();
        // const data = tasksTodoEmpty;
        // const data = tasksTodoPage01;
        return { data: PaginationTaskSchema.parse(data) };
    } catch (error) {
        return { error: "Failed to fetch tasks, please try again later." };
    }

}

export const authenticate = async (
    prevState: string | undefined,
    formData: FormData,
) => {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    console.log(">>> error: ", error);
                    return error.cause?.err?.message || 'Something went wrong.';
            }
        }
        throw error;
    }
}