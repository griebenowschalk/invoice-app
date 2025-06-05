import { Badge } from "@/components/ui/badge";
import { cn, firstLetterToUppercase } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        "rounded-full",
        status === "open" && "bg-blue-500",
        status === "paid" && "bg-green-500",
        status === "void" && "bg-yellow-500",
        status === "uncollectable" && "bg-red-500"
      )}
    >
      {firstLetterToUppercase(status)}
    </Badge>
  );
};

export default StatusBadge;
