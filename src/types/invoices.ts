import { AVAILABLE_STATUSES } from "@/data/invoices";

export type Status = (typeof AVAILABLE_STATUSES)[number]["value"];

export type Invoice = {
  id: number;
  amount: number;
  description: string;
  created_at: Date;
  status: Status;
};
