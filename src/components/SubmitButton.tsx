"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="relative w-full font-semibold" disabled={pending}>
      {pending ? (
        <span className="absolute flex items-center justify-center w-full h-full text-gray-500">
          <LoaderCircle className="animate-spin" />
        </span>
      ) : (
        "Create Invoice"
      )}
    </Button>
  );
};

export default SubmitButton;
