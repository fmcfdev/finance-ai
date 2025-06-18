"use server";

import { HasUserProPlan } from "@/app/_data/get-clerk-user-metadado";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_SK });

export const GetAIReport = async (month: number) => {
  const { userId } = auth();
  if (!userId) throw new Error("User not authenticated.");

  if (!(await HasUserProPlan())) {
    throw new Error("Você não possui o plano Pro para gerar o relatório da IA");
  }

  if (isNaN(month) || month < 1 || month > 12) {
    throw new Error("Mês inválido");
  }

  const dateBase = new Date(2025, month - 1, 1);
  const start = startOfMonth(dateBase);
  const end = endOfMonth(dateBase);

  //Busca as transações no banco de dados
  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lte: end,
      },
    },
  });

  console.log("Transactions", transactions);
  if (transactions.length === 0) {
    return "Nenhum dado foi encontrado para análise no período indicado!";
  } else {
    console.log("Transactions", transactions);
  }

  // Converter transações em JSON
  const dataString = transactions
    .map((t) => {
      const date = t.date.toISOString().split("T")[0];
      return `{"type":"${t.type}", "date":"${date}", "category":"${t.category}", "amount":${t.amount}}`;
    })
    .join(",");

  // Prompt para a IA
  const content = `
Você é um analista financeiro pessoal experiente. Abaixo estão as minhas transações financeiras em formato JSON com tipo (receita, despesa ou investimento), data, categoria e valor.

Com base nesses dados, faça uma análise completa e profissional da minha situação financeira. Evite repetir os dados sem análise. Foque em:

1. Avaliação da minha saúde financeira: estou gastando mais do que ganho? Minha situação é saudável, preocupante ou crítica?
2. Identificação das principais categorias de gastos e se há excessos.
3. Padrões de comportamento financeiro: há sazonalidade, gastos recorrentes ou picos incomuns?
4. Capacidade de poupança e investimento: estou conseguindo guardar dinheiro? Estou investindo de forma saudável em relação à minha renda?
5. Sugestões práticas e personalizadas para melhorar minha vida financeira.
6. Um parecer final objetivo e direto, como se fosse um resumo profissional da análise.

Use uma linguagem acessível e clara, como se estivesse conversando comigo em uma consultoria. O relatório deve ser em português do Brasil.

Dados:
[ ${dataString} ]
`;

  // Requisição à IA
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

  return result.choices[0].message.content;
};
