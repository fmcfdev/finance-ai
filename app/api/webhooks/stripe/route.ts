import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (
    !process.env.PAYMENT_GATEWAY_SECRET_KEY ||
    !process.env.PAYMENT_GATEWAY_WEBHOOK_SECRET
  ) {
    return NextResponse.error();
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.PAYMENT_GATEWAY_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.PAYMENT_GATEWAY_WEBHOOK_SECRET,
  );

  type InvoiceWithParent = Stripe.Invoice & {
    parent?: {
      subscription_details?: {
        metadata?: {
          clerk_user_id?: string;
          subscription?: string;
        };
      };
    };
  };

  switch (event.type) {
    case "invoice.payment_succeeded": {
      const invoicePaymentSucceeded = event.data.object as InvoiceWithParent;

      const subscription_details =
        invoicePaymentSucceeded.parent?.subscription_details;

      const customer = invoicePaymentSucceeded.customer;
      const subscription = subscription_details?.metadata?.subscription;
      const clerkUserId = subscription_details?.metadata?.clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: "pro",
        },
      });

      break;
    }
  }

  return NextResponse.json({ received: true });
};
