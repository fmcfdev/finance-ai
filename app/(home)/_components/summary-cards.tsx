import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: SummaryCardsProps) => {
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
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={{
            image: <PiggyBankIcon size={16} />,
            className: "bg-[#FFFFFF]/20 text-[#FFFFFF]",
          }}
          title="Investido"
          ammount={investmentsTotal}
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
