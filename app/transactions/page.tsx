import { db } from "../_lib/prisma";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({});

  return (
    <div>
      {transactions.map((transaction) => (
        <div key={transaction.id}>{transaction.name}</div>
      ))}
    </div>
  );
};

export default TransactionsPage;
