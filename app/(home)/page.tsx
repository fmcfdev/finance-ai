import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

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

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1>Dashboard</h1>
          <TimeSelect />
        </div>
      </div>
      <div className="grid grid-cols-[2fr,1fr]">
        <SummaryCards month={month} />
      </div>
    </>
  );
};

export default Home;
