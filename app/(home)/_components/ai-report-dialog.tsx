"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { HasUserProPlan } from "@/app/_data/get-clerk-user-metadado";
import { getMonthName } from "@/app/_utils/date-util";
import { GetAIReport } from "@/app/api/OpenAI";
import { FileChartColumnIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

type AIReportDialogProps = {
  month: number;
};

const AIReportDialog = ({ month }: AIReportDialogProps) => {
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [hasProPlan, setHasProPlan] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false); // controla o estado do Dialog

  const handleAIReport = async () => {
    try {
      setLoading(true);
      if (!isNaN(month) && month >= 1 && month <= 12 && hasProPlan) {
        const reportAI = await GetAIReport(month);
        setReportContent(reportAI);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyProPlanUser = async () => {
    setHasProPlan(await HasUserProPlan());
  };

  useEffect(() => {
    verifyProPlanUser();
  }, []);

  // Função que controla o fechamento:
  // Se isLoading for true, não fecha de jeito nenhum.
  // Se quiser permitir fechar só pelo botão Fechar, fechar só quando isLoading false.
  const handleOpenChange = (newOpen: boolean) => {
    if (isLoading && !newOpen) {
      // Tenta fechar, mas isLoading ativo, não fecha
      return;
    }
    if (!newOpen) {
      // Limpa conteúdo ao fechar
      setReportContent(null);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full hover:bg-white/10"
          onClick={verifyProPlanUser}
        >
          Relatório IA
          <FileChartColumnIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="mb-4">Relatório FinanceAI</DialogTitle>
          <DialogDescription className="mb-4 text-white/80">
            {hasProPlan ? (
              <>
                Clique no botão abaixo para IA gerar seu relatório de análise
                financeira do período de{" "}
                {getMonthName(String(month).padStart(2, "0"))} de 2025.
              </>
            ) : (
              <span className="space-y-2">
                <p>
                  Assine o plano <strong>Pro</strong> e tenha acesso imediato ao
                  gerador de relatórios de IA mais avançado que você já viu.
                </p>
                <p>
                  Descubra análises completas das suas finanças, dicas práticas
                  para economizar, estratégias para aumentar sua renda e
                  orientações sobre os melhores investimentos.
                </p>
                <p>
                  <Link
                    href="/subscription"
                    className="font-bold text-primary underline underline-offset-2"
                  >
                    Migre para o Pro
                  </Link>{" "}
                  agora mesmo e transforme sua vida financeira com inteligência.
                </p>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose mr-2 max-h-60 pl-2 pr-4 text-justify prose-h2:text-lg prose-h2:text-white prose-h3:text-base prose-h3:text-white prose-h4:text-white prose-p:text-sm prose-p:text-white prose-strong:text-white prose-ul:text-sm prose-ul:text-white">
          <Markdown>{reportContent}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            {/* Botão fecha só se não estiver carregando */}
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => setOpen(false)}
            >
              Fechar
            </Button>
          </DialogClose>
          {hasProPlan ? (
            <Button
              className="font-bold"
              onClick={handleAIReport}
              disabled={isLoading}
            >
              Gerar Relatório{" "}
              {isLoading && <Loader2Icon className="animate-spin" />}
            </Button>
          ) : (
            <Button className="font-bold">Migrar para o Pro</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIReportDialog;
