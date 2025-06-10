import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";

import { auth } from "@clerk/nextjs/server";

import { eq } from "drizzle-orm";

import { Button } from "@/components/ui/button";
import Container from "@/components/Container";

import Link from "next/link";
import { redirect } from "next/navigation";

import { CirclePlus } from "lucide-react";
import DashboardTable from "@/components/DashboardTable";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const results = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customer_id, Customers.id))
    .where(eq(Invoices.user_id, userId));

  const invoices = results.map((result) => {
    return {
      ...result.invoices,
      customer: result.customer,
    };
  });

  return (
    <main>
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Invoices</h1>
          <p>
            <Button className="inline-flex gap-2" variant="ghost" asChild>
              <Link href="/invoices/new">
                <CirclePlus className="h-4 w-4" />
                New Invoice
              </Link>
            </Button>
          </p>
        </div>
        <DashboardTable results={invoices} />
      </Container>
    </main>
  );
}
