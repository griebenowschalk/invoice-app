export type Status = "open" | "paid" | "void" | "uncollectable";

export type Invoice = {
  id: number;
  customer: string;
  email: string;
  amount: number;
  description: string;
  created_at: Date;
  status: Status;
};
