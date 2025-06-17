import { db } from "@/app/_lib/prisma";
import { PlanType } from "@/app/subscription/_data/plan-types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SK,
});

export const GetAIReport = async (month: number) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated.");
  }

  const clerkUser = await clerkClient().users.getUser(userId);
  const userPlan = clerkUser.publicMetadata.subscriptionPlan;
  if (userPlan !== PlanType.pro) {
    throw new Error("Você não possui o plano Pro para gerar o relatório da IA");
  }

  const dateBase = new Date(2025, month - 1);

  const data = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startOfMonth(dateBase),
        lt: endOfMonth(dateBase),
      },
    },
  });

  const dataString = data
    .map(
      (transaction) =>
        `{"type":"${transaction.type}", "date":"${transaction.date.toISOString().split("T")[0]}", "category":"${transaction.category}", "amount":${transaction.amount}}`,
    )
    .join(",");

  const content = `Analyze my financial data and give me feedback. Explain how my financial health is, where my largest expenses are, how I can grow financially, and provide additional insights about my finances. The data is in JSON format with transaction type, date, category, and amount. Answer me in portuguese, Brazil. Here is the data for analysis: [ ${dataString} ]`;

  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You is a the most concept finacial analistic from world now",
      },
      { role: "user", content },
    ],
  });

  return result.choices[0].message;
};
