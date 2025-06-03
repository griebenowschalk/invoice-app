import { sql } from "drizzle-orm";

import { db } from "@/db";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function NewInvoice() {
  const result = await db.execute(sql`SELECT current_database()`);
  console.log("Result from database:", result);

  return (
    <main className="flex flex-col justify-center gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Create Invoice</h1>
      </div>

      {JSON.stringify(result)}
      <form className="grid gap-4 max-w-xs">
        <div>
          <Label htmlFor="customer" className="block mb-2 text-sm font-medium">
            Customer
          </Label>
          <Input
            type="text"
            id="customer"
            name="customer"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter customer name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter customer email"
          />
        </div>
        <div>
          <Label htmlFor="amount" className="block mb-2 text-sm font-medium">
            Amount
          </Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter invoice amount"
          />
        </div>
        <div>
          <Label
            htmlFor="description"
            className="block mb-2 text-sm font-medium"
          >
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter invoice description"
          />
        </div>
        <div className="mt-6">
          <Button type="submit" className="w-full font-semibold">
            Create Invoice
          </Button>
        </div>
      </form>
    </main>
  );
}
