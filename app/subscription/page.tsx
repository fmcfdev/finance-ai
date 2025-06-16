import { auth } from "@clerk/nextjs/server";
import NavBar from "../_components/navbar";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_component/acquire-plan-button";
import ActivePlanBadge from "./_component/active-plan-badge";

const SubscriptionPage = () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <div className="p-6">
        <div className="flex justify-start">
          <h1 className="text-2xl font-bold">Assinatura</h1>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex items-center gap-4 border-b-[1px] py-10">
              <CardTitle className="grid w-full grid-cols-[1fr,2fr,1fr] items-center">
                <ActivePlanBadge plan="Free" />
                <div className="text-center text-2xl">Plano básico</div>
                <div></div>
              </CardTitle>
              <CardDescription className="flex items-center">
                <span className="mr-2 text-3xl text-white">R$</span>
                <span className="mr-1 text-6xl font-semibold text-white">
                  0
                </span>
                <span className="text-2xl text-muted-foreground">,00/mês</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start justify-center gap-8 py-10">
              <div className="flex flex-col gap-4">
                <p className="flex gap-2">
                  <CheckIcon className="text-primary" /> Apenas 10 transações
                  por dia 7/10
                </p>
                <p className="flex gap-2">
                  <XIcon /> Relatórios de IA ilimitados
                </p>
                <p className="flex gap-2">
                  <XIcon /> ...
                </p>
              </div>
              {/* <Button
                className="w-full rounded-full border-primary text-primary hover:bg-primary/30"
                variant="outline"
              >
                Fazer Upgrade
              </Button> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-4 border-b-[1px] py-10">
              <CardTitle className="grid w-full grid-cols-[1fr,2fr,1fr] items-center">
                <ActivePlanBadge plan="Pro" />
                <div className="text-center text-2xl">Plano Pro</div>
                <div></div>
              </CardTitle>
              <CardDescription className="flex items-center">
                <span className="mr-2 text-3xl text-white">R$</span>
                <span className="mr-1 text-6xl font-semibold text-white">
                  19
                </span>
                <span className="text-2xl text-muted-foreground">,90/mês</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start justify-center gap-8 py-10">
              <div className="flex flex-col gap-4">
                <p className="flex gap-2">
                  <CheckIcon className="text-primary" /> Transações ilimitadas
                </p>
                <p className="flex gap-2">
                  <CheckIcon className="text-primary" /> Relatórios de IA
                  ilimitados
                </p>
                <p className="flex gap-2">
                  <CheckIcon className="text-primary" /> ...
                </p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
