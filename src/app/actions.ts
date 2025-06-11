"use server";

import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { Status } from "@/types/invoices";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

/**
 * Handles the submission of form data by extracting the "amount" field,
 * converting it to a number, and multiplying by 100 to represent the value in cents.
 *
 * @param data - The FormData object containing form input values.
 * @returns A promise that resolves when the submission handling is complete.
 */
export async function createAction(data: FormData) {
  const { userId, orgId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const amount = Math.floor(parseFloat(data.get("amount") as string) * 100);
  const description = data.get("description") as string;
  const name = data.get("name") as string;
  const email = data.get("email") as string;

  const [customer] = await db
    .insert(Customers)
    .values({
      name,
      email,
      user_id: userId,
      organization_id: orgId || null,
    })
    .returning({
      id: Customers.id,
    });

  const result = await db
    .insert(Invoices)
    .values({
      amount,
      description,
      user_id: userId,
      status: "open",
      customer_id: customer.id,
      organization_id: orgId || null,
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
  const { userId, orgId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const invoiceId = parseInt(data.get("id") as string);
  const status = data.get("status") as Status;

  if (orgId) {
    await db
      .update(Invoices)
      .set({ status })
      .where(
        and(eq(Invoices.id, invoiceId), eq(Invoices.organization_id, orgId))
      );
  } else {
    await db
      .update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.user_id, userId),
          isNull(Invoices.organization_id)
        )
      );
  }

  revalidatePath(`/invoices/${invoiceId}`);
}

/**
 * Deletes an invoice.
 *
 * @param data - The FormData object containing the invoice ID.
 * @returns A promise that resolves when the deletion is complete.
 */
export async function deleteInvoice(data: FormData) {
  const { userId, orgId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const invoiceId = parseInt(data.get("id") as string);

  if (orgId) {
    await db
      .delete(Invoices)
      .where(
        and(eq(Invoices.id, invoiceId), eq(Invoices.organization_id, orgId))
      );
  } else {
    await db
      .delete(Invoices)
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.user_id, userId),
          isNull(Invoices.organization_id)
        )
      );
  }

  redirect("/dashboard");
}

export async function createPaymentIntent(data: FormData) {
  const origin = (await headers()).get("origin");
  const invoiceId = parseInt(data.get("id") as string);

  const [invoice] = await db
    .select({
      status: Invoices.status,
      amount: Invoices.amount,
    })
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/invoices/${invoiceId}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/invoices/${invoiceId}/payment?success=false&session_id={CHECKOUT_SESSION_ID}`,
    line_items: [
      {
        price_data: {
          currency: "zar",
          product: "prod_STf10enE7czVny",
          unit_amount: invoice.amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  redirect(session.url as string);
}
