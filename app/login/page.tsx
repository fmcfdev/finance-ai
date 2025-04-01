import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

const LoginPage = () => {
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
          <p className="text-muted-foreground mb-8">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Entrar com Google
          </Button>
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
