"use client";

import { ArrowUpDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

interface AddTransactionButtonProps {
  canUserAddTransaction: boolean;
}

const AddTransactionButton = ({
  canUserAddTransaction,
}: AddTransactionButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                className="rounded-full font-bold"
                onClick={() => setIsDialogOpen(true)}
                disabled={!canUserAddTransaction}
              >
                Adicionar transação
                <ArrowUpDownIcon />
              </Button>
            </span>
          </TooltipTrigger>
          {!canUserAddTransaction && (
            <TooltipContent className="text-center">
              <p>Você atingiu o limite mensal de transações.</p>
              <p>
                Para continuar, migre para o{" "}
                <Link
                  href="/subscription"
                  className="font-bold text-primary underline underline-offset-2"
                >
                  plano Pro
                </Link>{" "}
                ou aguarde o próximo mês.
              </p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <UpsertTransactionDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default AddTransactionButton;
