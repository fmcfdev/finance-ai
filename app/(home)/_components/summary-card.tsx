import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { parseToCurrencyValue } from "@/app/_lib/utils";

interface IconProps {
  image: React.ReactNode;
  className: string;
}

interface SummaryCardProps {
  icon: IconProps;
  title: string;
  ammount: string;
  isAddButton?: boolean;
  className?: string;
}

const SummaryCard = ({
  icon,
  title,
  ammount,
  isAddButton = false,
  className = "",
}: SummaryCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-2">
        <div className={`rounded-md p-2 ${icon.className}`}>{icon.image}</div>
        <p className="!m-0 text-white opacity-70">{title}</p>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-4xl font-bold">
          {parseToCurrencyValue(Number(ammount))}
        </p>
        {isAddButton && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};
export default SummaryCard;
