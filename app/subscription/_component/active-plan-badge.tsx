"use client";

import { useUser } from "@clerk/nextjs";
import { PlanType } from "../_data/plan-types";

type PlanTypex = { plan: "Pro" } | { plan: "Free" };

const ActivePlanBadge = (cardPlanType: PlanTypex) => {
  const { user } = useUser();
  const hasProPlan = user?.publicMetadata.subscriptionPlan === PlanType.pro;
  const isProCard = PlanType.pro === cardPlanType.plan;

  const showBadge = isProCard ? hasProPlan : !hasProPlan;
  return (
    <>
      <div className="text-[16px] text-primary">
        {showBadge && (
          <span className="rounded-full bg-white/[5%] px-2 py-1 font-bold">
            Atual
          </span>
        )}
      </div>
    </>
  );
};
export default ActivePlanBadge;
