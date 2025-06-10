"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import type { InvoiceWithCustomerType } from "@/types/invoices";
import StatusBadge from "@/components/StatusBadge";

interface DashboardTableProps {
  results: InvoiceWithCustomerType[];
}

const DashboardTable = ({ results }: DashboardTableProps) => {
  const router = useRouter();

  const navigateToInvoice = (invoiceId: number) => {
    router.push(`/invoices/${invoiceId}`);
  };

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] p-4">Data</TableHead>
          <TableHead className="p-4">Customer</TableHead>
          <TableHead className="p-4">Email</TableHead>
          <TableHead className="text-center p-4">Status</TableHead>
          <TableHead className="text-right p-4">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => {
          return (
            <TableRow
              key={result.id}
              tabIndex={0}
              onClick={() => navigateToInvoice(result.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigateToInvoice(result.id);
                }
              }}
              className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
            >
              <TableCell className="text-left p-4">
                <span className="font-semibold">
                  {format(result.created_at, "dd/MM/yyyy")}
                </span>
              </TableCell>
              <TableCell className="text-left p-4">
                <span className="font-semibold">{result.customer.name}</span>
              </TableCell>
              <TableCell className="text-left p-4">
                <span>{result.customer.email}</span>
              </TableCell>
              <TableCell className="text-center p-4">
                <span className="font-semibold">
                  <StatusBadge status={result.status} />
                </span>
              </TableCell>
              <TableCell className="text-right p-4">
                <span className="font-semibold">
                  R{(result.amount / 100).toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
