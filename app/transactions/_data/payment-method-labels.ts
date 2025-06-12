import { TransactionPaymentMethod } from "@prisma/client";

export const TRANSACTION_PAYMENT_METHOD_UI_PROPS = {
  [TransactionPaymentMethod.CREDIT_CARD]: {
    key: TransactionPaymentMethod.CREDIT_CARD,
    label: "Cartão de crédito",
    icon: "credit-card.svg",
  },
  [TransactionPaymentMethod.DEBIT_CARD]: {
    key: TransactionPaymentMethod.DEBIT_CARD,
    label: "Cartão de débito",
    icon: "debit-card.svg",
  },
  [TransactionPaymentMethod.BANK_TRANSFER]: {
    key: TransactionPaymentMethod.BANK_TRANSFER,
    label: "Transferência bancária",
    icon: "bank-transfer.svg",
  },
  [TransactionPaymentMethod.BANK_SLIP]: {
    key: TransactionPaymentMethod.BANK_TRANSFER,
    label: "Boleto",
    icon: "bank-slip.svg",
  },
  [TransactionPaymentMethod.CASH]: {
    key: TransactionPaymentMethod.CASH,
    label: "Dinheiro",
    icon: "money.svg",
  },
  [TransactionPaymentMethod.PIX]: {
    key: TransactionPaymentMethod.PIX,
    label: "Pix",
    icon: "pix.svg",
  },
  [TransactionPaymentMethod.OTHER]: {
    key: TransactionPaymentMethod.OTHER,
    label: "Outros",
    icon: "other.svg",
  },
};

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  TRANSACTION_PAYMENT_METHOD_UI_PROPS[TransactionPaymentMethod.CREDIT_CARD],
  TRANSACTION_PAYMENT_METHOD_UI_PROPS[TransactionPaymentMethod.DEBIT_CARD],
  TRANSACTION_PAYMENT_METHOD_UI_PROPS[TransactionPaymentMethod.BANK_TRANSFER],
  TRANSACTION_PAYMENT_METHOD_UI_PROPS[TransactionPaymentMethod.BANK_SLIP],
  TRANSACTION_PAYMENT_METHOD_UI_PROPS[TransactionPaymentMethod.CASH],
  TRANSACTION_PAYMENT_METHOD_UI_PROPS[TransactionPaymentMethod.PIX],
  TRANSACTION_PAYMENT_METHOD_UI_PROPS[TransactionPaymentMethod.OTHER],
];
