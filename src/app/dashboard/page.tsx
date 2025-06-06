import { db } from "@/db";

import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import Link from "next/link";

import { CirclePlus } from "lucide-react";
import { Invoices } from "@/db/schema";
import DashboardTable from "@/components/DashboardTable";

export default async function Dashboard() {
  const results = await db.select().from(Invoices);

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
        <DashboardTable results={results} />
      </Container>
    </main>
  );
}
