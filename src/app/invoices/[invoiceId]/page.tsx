import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { notFound, redirect } from "next/navigation";
import { CustomerType, InvoiceType } from "@/types/invoices";
import Invoice from "./Invoice";

interface InvoiceProps {
  params: { invoiceId: string };
}

export default async function InvoicePage({ params }: InvoiceProps) {
  const { userId, orgId } = await auth();
  let result;

  if (!userId) {
    redirect("/sign-in");
  }

  const invoiceId = parseInt((await params).invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice ID");
  }

  // If the user is in an organization, get the invoice for the organization otherwise get the invoice for the user
  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customer_id, Customers.id))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.organization_id, orgId)
        )
      )
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customer_id, Customers.id))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.user_id, userId),
          isNull(Invoices.organization_id)
        )
      )
      .limit(1);
  }

  if (!result) {
    notFound();
  }

  return (
    <Invoice
      invoice={result.invoices as InvoiceType}
      customer={result.customer as CustomerType}
    />
  );
}
