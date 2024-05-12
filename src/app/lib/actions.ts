'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const invoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, { message: 'Amount must be greater than 0' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select a valid invoice status',
  }),
  date: z.string(),
});

interface State {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}

const createInvoiceSchema = invoiceFormSchema.omit({ id: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const entries = createInvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: Number(formData.get('amount')) * 100,
    status: formData.get('status'),
    date: new Date().toISOString(),
  });

  if (!entries.success) {
    return {
      errors: entries.error.flatten().fieldErrors,
      message: 'Failed to create invoice',
    };
  }

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${entries.data?.customerId}, ${entries.data?.amount}, ${entries.data?.status}, ${entries.data?.date});
    `;
  } catch (error) {
    return {
      message: 'Database error: failed to create invoice',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const updateInvoiceSchema = invoiceFormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const entries = updateInvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: Number(formData.get('amount')) * 100,
    status: formData.get('status'),
  });

  if (!entries.success) {
    return {
      errors: entries.error.flatten().fieldErrors,
      message: 'Failed to create invoice',
    };
  }

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${entries.data?.customerId},
          amount = ${entries.data?.amount},
          status = ${entries.data?.status}
      WHERE id = ${id};
    `;
  } catch (error) {
    return {
      message: 'Database error: failed to update invoice',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {}
}
