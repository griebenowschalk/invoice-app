"use client";

import { deleteInvoice, updateInvoiceStatus } from "@/app/actions";
import { AVAILABLE_STATUSES } from "@/data/invoices";

import { format } from "date-fns";
import StatusBadge from "@/components/StatusBadge";
import Container from "@/components/Container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Ellipsis, Trash2 } from "lucide-react";
import { CustomerType, InvoiceType, Status } from "@/types/invoices";
import { useOptimistic } from "react";

interface InvoiceProps {
  invoice: InvoiceType;
  customer: CustomerType;
}

export default function Invoice({ invoice, customer }: InvoiceProps) {
  const [optimisticInvoice, setOptimisticInvoice] = useOptimistic(
    invoice.status,
    (_currentStatus: Status, newStatus: Status) => newStatus
  );

  const handleStatusChange = async (data: FormData) => {
    const currentStatus = optimisticInvoice;
    setOptimisticInvoice(data.get("status") as Status);
    try {
      await updateInvoiceStatus(data);
    } catch (error) {
      console.error(error);
      setOptimisticInvoice(currentStatus);
    }
  };

  return (
    <main className="w-full h-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center text-3xl font-semibold gap-4">
            Invoice {invoice.id} <StatusBadge status={optimisticInvoice} />
          </h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer flex items-center gap-2"
                >
                  Change Status <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUSES.map((status) => (
                  <DropdownMenuItem key={status.value}>
                    <form action={handleStatusChange}>
                      <input type="hidden" name="id" value={invoice.id} />
                      <input type="hidden" name="status" value={status.value} />
                      <Button type="submit" variant="ghost">
                        {status.label}
                      </Button>
                    </form>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <span className="sr-only">More Options</span>
                    <Ellipsis className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete Invoice
                      </Button>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className="flex flex-col items-center">
                <DialogHeader className="gap-4">
                  <DialogTitle className="text-lg font-semibold">
                    Are you absolutely sure?
                  </DialogTitle>
                  <DialogDescription className="max-w-sm text-center">
                    This action cannot be undone. This will permanently delete
                    the invoice.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <form
                    className="flex justify-center gap-2"
                    action={deleteInvoice}
                  >
                    <input type="hidden" name="id" value={invoice.id} />
                    <Button type="submit" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                      Delete Invoice
                    </Button>
                  </form>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <p className="text-3xl mb-3">R {(invoice.amount / 100).toFixed(2)}</p>
        <p className="text-lg mb-8">{invoice.description}</p>
        <h2 className="font-bold text-lg mb-4">Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-4 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID:
            </strong>{" "}
            {invoice.id}
          </li>
          <li className="flex gap-4 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date:
            </strong>{" "}
            {format(invoice.created_at, "dd/MM/yyyy")}
          </li>
          <li className="flex gap-4 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Customer:
            </strong>{" "}
            {customer.name}
          </li>
          <li className="flex gap-4 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Email:
            </strong>{" "}
            {customer.email}
          </li>
        </ul>
      </Container>
    </main>
  );
}
