"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { TaskType } from './definitions';
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

export const fetchTask = async (page: number, status: TaskType = TaskType.TODO) => {

    const limit: number = 10;

    const queryparams = `offset=${page}&limit=${limit}&sortBy=createdAt&isAsc=true&status=${status}`
    console.log(">>> queryparams: ", queryparams);
    const response = await fetch(`https://todo-list-api-mfchjooefq-as.a.run.app/todo-list?${queryparams}`)

    const data = await response.json();

    console.log(">>> data: ", data)
    return PaginationTaskSchema.parse(data);
}
