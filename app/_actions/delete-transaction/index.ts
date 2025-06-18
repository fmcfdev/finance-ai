"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async (transactionId: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authorized");
  }

  await db.transaction.delete({
    where: {
      userId,
      id: transactionId,
    },
  });
  revalidatePath("/transactions");
  revalidatePath("/");
};
