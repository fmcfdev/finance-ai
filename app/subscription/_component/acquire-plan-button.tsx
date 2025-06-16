"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import { PlanType } from "../_data/plan-types";
import Link from "next/link";

const handleAcquirePlanClick = async () => {
  const { sessionId } = await createStripeCheckout();

  if (!process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_PUBLISHABLE_KEY) {
    throw new Error("Stripe publishble key not found");
  }

  const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_PUBLISHABLE_KEY,
  );

  if (!stripe) {
    throw new Error("Stripe not found");
  }
  await stripe.redirectToCheckout({ sessionId });
};

const AcquirePlanButton = () => {
  const { user } = useUser();
  const hasProPlan = user?.publicMetadata.subscriptionPlan === PlanType.pro;
  if (hasProPlan) {
    return (
      <Button
        className="w-full rounded-full border-primary text-primary hover:bg-primary/30"
        variant="outline"
      >
        <Link
          href={`${
            process.env
              .NEXT_PUBLIC_PAYMENT_GATEWAY_CUSTOMER_PORTAL_URL as string
          }?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  } else {
    return (
      <Button
        className="w-full rounded-full bg-primary"
        onClick={handleAcquirePlanClick}
      >
        Adquirir plano
      </Button>
    );
  }
};

export default AcquirePlanButton;
