import { TransactionType } from "@prisma/client";

export const TRANSACTION_TYPE_LABELS = {
  EXPENSE: "Despesa",
  DEPOSIT: "Depósito",
  INVESTMENT: "Investimento",
};

export const TRANSACTION_TYPE_OPTIONS = [
  { value: TransactionType.EXPENSE, label: TRANSACTION_TYPE_LABELS.EXPENSE },
  { value: TransactionType.DEPOSIT, label: TRANSACTION_TYPE_LABELS.DEPOSIT },
  {
    value: TransactionType.INVESTMENT,
    label: TRANSACTION_TYPE_LABELS.INVESTMENT,
  },
];
