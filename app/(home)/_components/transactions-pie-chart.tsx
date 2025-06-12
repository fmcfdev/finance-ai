"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TRANSACTION_TYPE_OPTIONS } from "@/app/transactions/_data/transaction_type_labels";
import { TransactionPercentageProps } from "@/app/_data/get-dashboard/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";

const transactionTypeInvestment = TRANSACTION_TYPE_OPTIONS.find(
  (option) => option.value === TransactionType.INVESTMENT,
);

const transactionTypeDeposit = TRANSACTION_TYPE_OPTIONS.find(
  (option) => option.value === TransactionType.DEPOSIT,
);

const transactionTypeExpense = TRANSACTION_TYPE_OPTIONS.find(
  (option) => option.value === TransactionType.EXPENSE,
);

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: transactionTypeInvestment?.label,
    color: transactionTypeInvestment?.color,
  },
  [TransactionType.DEPOSIT]: {
    label: transactionTypeDeposit?.label,
    color: transactionTypeDeposit?.color,
  },
  [TransactionType.EXPENSE]: {
    label: transactionTypeExpense?.label,
    color: transactionTypeExpense?.color,
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentageProps;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: transactionTypeInvestment?.value,
      amount: investmentsTotal,
      fill: transactionTypeInvestment?.color,
    },
    {
      type: transactionTypeDeposit?.value,
      amount: depositsTotal,
      fill: transactionTypeDeposit?.color,
    },
    {
      type: transactionTypeExpense?.value,
      amount: expensesTotal,
      fill: transactionTypeExpense?.color,
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <div className="space-y-2 px-6 py-2">
        <PercentageItem
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          value={typesPercentage[TransactionType.DEPOSIT]}
        />
        <PercentageItem
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          value={typesPercentage[TransactionType.EXPENSE]}
        />
        <PercentageItem
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          value={typesPercentage[TransactionType.INVESTMENT]}
        />
      </div>
    </Card>
  );
};
export default TransactionsPieChart;
