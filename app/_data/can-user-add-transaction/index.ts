import { PlanType } from "@/app/subscription/_data/plan-types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-moth-transaction";
const { userId } = auth();
if (!userId) {
  throw new Error("Unauthorized");
}

const MONTH_TRANSACTION_LIMIT: number = 10;

export const CanUserAddTransaction = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const clerkuser = await clerkClient().users.getUser(userId);
  const userPlan = clerkuser.publicMetadata.subscriptionPlan;
  if (userPlan === PlanType.pro) {
    return true;
  }

  const currentMonthTransactions = await getCurrentMonthTransactions();
  return currentMonthTransactions < MONTH_TRANSACTION_LIMIT;
};
