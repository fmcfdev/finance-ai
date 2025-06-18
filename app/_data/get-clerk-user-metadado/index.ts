"use server";

import { PlanType } from "@/app/subscription/_data/plan-types";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const HasUserProPlan = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated.");
  }

  const clerkUser = await clerkClient().users.getUser(userId);
  const userPlan = clerkUser.publicMetadata.subscriptionPlan;

  return userPlan === PlanType.pro;
};
