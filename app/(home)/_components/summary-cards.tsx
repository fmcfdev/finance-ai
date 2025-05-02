import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

const SummaryCards = () => {
  return (
    <div className="space-y-4">
      <SummaryCard
        icon={{
          image: <WalletIcon size={16} />,
          className: "bg-white/10 text-[#FFFFFF]",
        }}
        title="Saldo"
        ammount="1000"
        isAddButton={true}
      />
      <div className="grid grid-cols-4 gap-4">
        <SummaryCard
          icon={{
            image: <PiggyBankIcon size={16} />,
            className: "bg-[#FFFFFF]/20 text-[#FFFFFF]",
          }}
          title="Investido"
          ammount="1000"
          className="col-span-2"
        />
        <SummaryCard
          icon={{
            image: <TrendingUpIcon size={16} />,
            className: "bg-[#39BE00]/20 text-[#39BE00]",
          }}
          title="Receita"
          ammount="1000"
        />
        <SummaryCard
          icon={{
            image: <TrendingDownIcon size={16} />,
            className: "bg-[#F6352E]/20 text-[#F6352E]",
          }}
          title="Despesa"
          ammount="1000"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
