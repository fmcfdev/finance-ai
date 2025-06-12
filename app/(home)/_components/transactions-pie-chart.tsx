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
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
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
    </Card>
  );
};
export default TransactionsPieChart;
