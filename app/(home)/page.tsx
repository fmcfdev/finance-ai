import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";

interface HomeProps {
  searchParams: {
    month?: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const montIsInvalid = !month || !isMatch(month, "MM");
  if (montIsInvalid) {
    redirect("/?month=01");
  }

  const dashboard = await getDashboard(month);

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1>Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} {...dashboard} />
        <div className="grid grid-cols-3 grid-rows-1 gap-6">
          <TransactionsPieChart {...dashboard} />
        </div>
      </div>
    </>
  );
};

export default Home;
