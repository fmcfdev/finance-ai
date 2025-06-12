import { TransactionType } from "@prisma/client";

export const TRANSACTION_TYPE_LABELS = {
  EXPENSE: "Despesa",
  DEPOSIT: "Depósito",
  INVESTMENT: "Investimento",
};

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: TRANSACTION_TYPE_LABELS.EXPENSE,
    color: "#E93030",
  },
  {
    value: TransactionType.DEPOSIT,
    label: TRANSACTION_TYPE_LABELS.DEPOSIT,
    color: "#55B02E",
  },
  {
    value: TransactionType.INVESTMENT,
    label: TRANSACTION_TYPE_LABELS.INVESTMENT,
    color: "#FFFFFF",
  },
];
