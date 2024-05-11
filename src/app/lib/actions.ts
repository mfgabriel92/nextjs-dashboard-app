'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const invoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const createInvoiceSchema = invoiceFormSchema.omit({ id: true });

export async function createInvoice(formData: FormData) {
  const entries = createInvoiceSchema.parse({
    customerId: formData.get('customerId'),
    amount: Number(formData.get('amount')) * 100,
    status: formData.get('status'),
  });

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${entries.customerId}, ${entries.amount}, ${entries.status}, ${entries.date});
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const updateInvoiceSchema = invoiceFormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  console.log(id, formData);
  const entries = updateInvoiceSchema.parse({
    customerId: formData.get('customerId'),
    amount: Number(formData.get('amount')) * 100,
    status: formData.get('status'),
  });

  await sql`
    UPDATE invoices
    SET customer_id = ${entries.customerId},
        amount = ${entries.amount},
        status = ${entries.status}
    WHERE id = ${id};
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}
