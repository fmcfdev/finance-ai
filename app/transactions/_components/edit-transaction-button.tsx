"use client";

import { Button } from "@/app/_components/ui/button";
import { UpsertTransactionDialog } from "@/app/_components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

export const EditTransactionButton = ({
  transaction,
}: EditTransactionButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsDialogOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};
