import { TransactionType } from "@prisma/client";

export type TransactionPercentageProps = {
  [key in TransactionType]: number;
};
