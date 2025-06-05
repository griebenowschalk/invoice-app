import { db } from "@/db";

import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

import { format } from "date-fns";
import StatusBadge from "@/components/StatusBadge";

interface InvoiceProps {
  params: { invoiceId: string };
}

export default async function Invoice({ params }: InvoiceProps) {
  const invoiceId = parseInt(params.invoiceId);

  const [result] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  return (
    <main className="h-full max-w-5xl mx-auto my-12">
      <div className="flex justify-between mb-8">
        <h1 className="flex items-center text-3xl font-semibold gap-4">
          Invoice {invoiceId} <StatusBadge status={result.status} />
        </h1>
        <p></p>
      </div>
      <p className="text-3xl mb-3">R {(result.amount / 100).toFixed(2)}</p>
      <p className="text-lg mb-8">{result.description}</p>
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
            Date:
          </strong>{" "}
          {format(result.created_at, "dd/MM/yyyy")}
        </li>
        <li className="flex gap-4 items-center">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Customer:
          </strong>{" "}
          {result.customer}
        </li>
        <li className="flex gap-4 items-center">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Email:
          </strong>{" "}
          {result.email}
        </li>
      </ul>
    </main>
  );
}
