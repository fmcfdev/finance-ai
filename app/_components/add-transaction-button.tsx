"use client";

import { ArrowUpDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";

const AddTransactionButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setIsDialogOpen(true)}
      >
        Adicionar transação
        <ArrowUpDownIcon />
      </Button>
      <UpsertTransactionDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default AddTransactionButton;
