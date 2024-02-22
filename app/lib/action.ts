"use server";

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { ApiResponse, TaskPagination, TaskType } from './definitions';
import { PaginationTaskSchema } from './decoders';

export async function createSomeObject() {
    // Send request create object

    //   revalidatePath to clears cache and trigger a new request to the server
    revalidatePath('/dashboard/invoices');
    //   redirect to page
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    // await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}

export const fetchTask = async (page: number, status: TaskType = TaskType.TODO): Promise<ApiResponse<TaskPagination>> => {

    const limit: number = 10;

    const queryparams = `offset=${page}&limit=${limit}&sortBy=createdAt&isAsc=true&status=${status}`
    try {
        const response = await fetch(`https://todo-list-api-mfchjooefq-as.a.run.app/todo-list?${queryparams}`)

        const data = await response.json();
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