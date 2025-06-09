"use server";

import { db } from "@/db";
import { Invoices } from "@/db/schema";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { Status } from "@/types/invoices";

/**
 * Handles the submission of form data by extracting the "amount" field,
 * converting it to a number, and multiplying by 100 to represent the value in cents.
 *
 * @param data - The FormData object containing form input values.
 * @returns A promise that resolves when the submission handling is complete.
 */
export async function createAction(data: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const amount = Math.floor(parseFloat(data.get("amount") as string) * 100);
  const description = data.get("description") as string;
  const email = data.get("email") as string;
  const customer = data.get("customer") as string;

  const result = await db
    .insert(Invoices)
    .values({
      email,
      customer,
      amount,
      description,
      user_id: userId,
      status: "open",
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${result[0].id}`); // Redirect to the newly created invoice
}

/**
 * Updates the status of an invoice.
 *
 * @param data - The FormData object containing the status to update.
 * @returns A promise that resolves when the update is complete.
 */
export async function updateInvoiceStatus(data: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const invoiceId = parseInt(data.get("id") as string);
  const status = data.get("status") as Status;

  await db
    .update(Invoices)
    .set({ status })
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.user_id, userId)));

  revalidatePath(`/invoices/${invoiceId}`);
}
