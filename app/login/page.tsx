import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-2">
      {/* Esquerda */}
      <div className="ms-auto flex h-full w-full flex-col justify-center p-8">
        <div className="flex max-w-[500px] flex-col justify-center">
          <Image
            src="/logo.svg"
            alt="Finance AI"
            width={173}
            height={39}
            className="mb-8"
          />
          <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
          <p className="mb-8 text-muted-foreground">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>
          <SignInButton>
            <Button variant="outline">
              <LogInIcon className="mr-2" />
              Entrar no Finance AI
            </Button>
          </SignInButton>
        </div>
      </div>
      <div className="relative h-full w-full">
        {/* Direita */}
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
