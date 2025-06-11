import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month?: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum.amount || 0,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum.amount || 0,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum.amount || 0,
  );

  const balance = depositsTotal + investmentsTotal - expensesTotal;
  return (
    <div className="space-y-4">
      <SummaryCard
        icon={{
          image: <WalletIcon size={16} />,
          className: "bg-white/10 text-[#FFFFFF]",
        }}
        title="Saldo"
        ammount={balance}
        isAddButton={true}
        className="bg-white/5"
      />
      <div className="grid grid-cols-4 gap-4">
        <SummaryCard
          icon={{
            image: <PiggyBankIcon size={16} />,
            className: "bg-[#FFFFFF]/20 text-[#FFFFFF]",
          }}
          title="Investido"
          ammount={investmentsTotal}
          className="col-span-2"
        />
        <SummaryCard
          icon={{
            image: <TrendingUpIcon size={16} />,
            className: "bg-[#39BE00]/20 text-[#39BE00]",
          }}
          title="Receita"
          ammount={depositsTotal}
        />
        <SummaryCard
          icon={{
            image: <TrendingDownIcon size={16} />,
            className: "bg-[#F6352E]/20 text-[#F6352E]",
          }}
          title="Despesa"
          ammount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
