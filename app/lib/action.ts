import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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