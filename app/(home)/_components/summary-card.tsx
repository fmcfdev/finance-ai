import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { CanUserAddTransaction } from "@/app/_data/can-user-add-transaction";
import { parseToCurrencyValue } from "@/app/_lib/utils";
interface IconProps {
  image: React.ReactNode;
  className: string;
}
interface SummaryCardProps {
  icon: IconProps;
  title: string;
  ammount: number;
  isAddButton?: boolean;
  className?: string;
}

const SummaryCard = async ({
  icon,
  title,
  ammount,
  isAddButton = false,
  className = "",
}: SummaryCardProps) => {
  const canUserAddTransaction: boolean = await CanUserAddTransaction();

  return (
    <>
      <Card className={className}>
        <CardHeader className="flex flex-row items-center gap-2">
          <div className={`rounded-md p-2 ${icon.className}`}>{icon.image}</div>
          <p className="!m-0 text-white opacity-70">{title}</p>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-2xl font-bold">
            {parseToCurrencyValue(Number(ammount))}
          </p>
          {isAddButton && (
            <AddTransactionButton
              canUserAddTransaction={canUserAddTransaction}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};
export default SummaryCard;
