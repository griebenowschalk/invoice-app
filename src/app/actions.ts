"use server";

import { db } from "@/db";
import { Invoices } from "@/db/schema";

import { redirect } from "next/navigation";

/**
 * Handles the submission of form data by extracting the "amount" field,
 * converting it to a number, and multiplying by 100 to represent the value in cents.
 *
 * @param data - The FormData object containing form input values.
 * @returns A promise that resolves when the submission handling is complete.
 */
export async function createAction(data: FormData) {
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
      status: "open",
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${result[0].id}`); // Redirect to the newly created invoice
}
