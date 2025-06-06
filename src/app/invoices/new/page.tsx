"use client";

import { startTransition, SyntheticEvent, useState } from "react";

import { createAction } from "@/app/actions";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/SubmitButton";
import Container from "@/components/Container";

export default function NewInvoice() {
  const [state, setState] = useState("ready");

  function handleOnSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (state === "submitting") return;
    setState("submitting");

    startTransition(async () => {
      const formData = new FormData(event.target as HTMLFormElement);
      await createAction(formData);
    });
  }

  return (
    <main>
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Create Invoice</h1>
        </div>

        <form
          className="grid gap-4 max-w-xs"
          action={createAction}
          onSubmit={handleOnSubmit}
        >
          <div>
            <Label
              htmlFor="customer"
              className="block mb-2 text-sm font-medium"
            >
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
              inputMode="decimal"
              type="number"
              step="0.01"
              min="0"
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
            <SubmitButton />
          </div>
        </form>
      </Container>
    </main>
  );
}
