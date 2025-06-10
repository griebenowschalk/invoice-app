import { AVAILABLE_STATUSES } from "@/data/invoices";

export type Status = typeof AVAILABLE_STATUSES[number]["value"];

export type InvoiceType = {
  id: number;
  amount: number;
  description: string;
  created_at: Date;
  status: Status;
};

export type CustomerType = {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  user_id: string;
};

export type InvoiceWithCustomerType = {
  id: number;
  amount: number;
  description: string;
  created_at: Date;
  status: Status;
  customer: CustomerType;
};
