"use server";

import { format } from "date-fns";
import StatusBadge from "@/components/StatusBadge";
import Container from "@/components/Container";
import { Customers, Invoices } from "@/db/schema";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPaymentIntent, updateInvoiceStatus } from "@/app/actions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface InvoicePaymentProps {
  params: { invoiceId: string };
  searchParams: { success: string; session_id: string };
}

export default async function Payment({
  params,
  searchParams,
}: InvoicePaymentProps) {
  const invoiceId = parseInt((await params).invoiceId);
  const { session_id, success } = await searchParams;
  const isSuccess = session_id && success === "true";
  const isCanceled = success === "false";
  let isError = !session_id && isSuccess;

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice ID");
  }

  //Check stripe session status and if it is successful, update the invoice status to paid
  if (isSuccess) {
    const { payment_status } =
      await stripe.checkout.sessions.retrieve(session_id);

    if (payment_status !== "paid") {
      isError = true;
    } else {
      const formData = new FormData();
      formData.append("id", invoiceId.toString());
      formData.append("status", "paid");
      await updateInvoiceStatus(formData);
    }
  }

  const [result] = await db
    .select({
      id: Invoices.id,
      status: Invoices.status,
      amount: Invoices.amount,
      description: Invoices.description,
      created_at: Invoices.created_at,
      customer_name: Customers.name,
    })
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customer_id, Customers.id))
    .where(and(eq(Invoices.id, invoiceId)))
    .limit(1);

  if (!result) {
    notFound();
  }

  return (
    <main className="w-full h-full">
      <Container>
        {isError && (
          <p className="bg-red-100 text-sm text-red-600 p-4 text-center px-3 py-2 rounded-md mb-4">
            Something went wrong, please try again.
          </p>
        )}
        {isCanceled && (
          <p className="bg-yellow-100 text-sm text-yellow-600 p-4 text-center px-3 py-2 rounded-md mb-4">
            Payment was canceled, please try again.
          </p>
        )}
        <div className="flex justify-between">
          <div>
            <div className="flex justify-between mb-8">
              <h1 className="flex items-center text-3xl font-semibold gap-4">
                Invoice {invoiceId} <StatusBadge status={result.status} />
              </h1>
            </div>
            <p className="text-3xl mb-3">
              R {(result.amount / 100).toFixed(2)}
            </p>
            <p className="text-lg mb-8">{result.description}</p>
          </div>
          <div className="flex flex-col items-end">
            <h2 className="text-xl font-semibold mb-4">Manage Invoice</h2>
            {result.status === "open" && (
              <form action={createPaymentIntent}>
                <input type="hidden" name="id" value={invoiceId} />
                <Button className="cursor-pointer flex gap-2 bg-green-600 hover:bg-green-700">
                  <CreditCard className="w-5 h-auto" />
                  Pay Invoice
                </Button>
              </form>
            )}
            {result.status === "paid" && (
              <p className="text-xl font-bold text-green-600 flex items-center gap-2">
                <Check className="w-6 h-auto bg-green-500 rounded-full text-white p-1" />
                Invoice is paid
              </p>
            )}
          </div>
        </div>
        <h2 className="font-bold text-lg mb-4">Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-4 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID:
            </strong>{" "}
            {invoiceId}
          </li>
          <li className="flex gap-4 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date:
            </strong>{" "}
            {format(result.created_at, "dd/MM/yyyy")}
          </li>
          <li className="flex gap-4 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Customer:
            </strong>{" "}
            {result.customer_name}
          </li>
        </ul>
      </Container>
    </main>
  );
}
