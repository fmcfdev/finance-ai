import { MONTH_OPTIONS } from "../(home)/_components/time-select";

export const getPtBRMonthName = (index: number) => {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  return meses[index];
};

export const getMonthName = (monthValue: string): string => {
  const option = MONTH_OPTIONS.find((opt) => opt.value === monthValue);
  return option?.label || "Mês inválido";
};
