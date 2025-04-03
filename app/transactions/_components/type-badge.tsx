import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  switch (transaction.type) {
    case TransactionType.DEPOSIT:
      return (
        <Badge className="bg-primary/15 font-bold text-primary hover:bg-primary/15">
          <CircleIcon className="mr-2 fill-primary" size={10} />
          Depósito
        </Badge>
      );
    case TransactionType.EXPENSE:
      return (
        <Badge className="font bold bg-danger/15 text-danger hover:bg-danger/15">
          <CircleIcon className="mr-2 fill-danger" size={10} />
          Despesa
        </Badge>
      );
    default:
      return (
        <Badge className="font bold bg-white/15 text-white hover:bg-white/15">
          <CircleIcon className="mr-2 fill-white" size={10} />
          Investimento
        </Badge>
      );
  }
};

export default TransactionTypeBadge;
