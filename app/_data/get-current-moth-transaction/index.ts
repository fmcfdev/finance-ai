import { db } from "@/app/_lib/prisma";
import { PlanType } from "@/app/subscription/_data/plan-types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";

const { userId } = auth();
if (!userId) {
  throw new Error("Unauthorized");
}

const MONTH_TRANSACTION_LIMIT: number = 10;

export const getCurrentMonthTransactions = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};

export const CanUserAddTransaction = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const clerkuser = await clerkClient.users.getUser(userId);
  const userPlan = clerkuser.publicMetadata.subscriptionPlan;
  if (userPlan === PlanType.pro) {
    return true;
  }

  const currentMonthTransactions = await getCurrentMonthTransactions();
  return currentMonthTransactions >= MONTH_TRANSACTION_LIMIT;
};
