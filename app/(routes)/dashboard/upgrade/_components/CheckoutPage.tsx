/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { subscribedUsers } from "@/utils/schema";
import { toast } from "sonner";
import { eq } from "drizzle-orm";
import { format } from "date-fns";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const { user } = useUser();

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<any>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState(null);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      });
  }, [amount]);

  const saveSubscripiton = async (paymentIntentId: any) => {
    try {
      const result2 = await db
        .select()
        .from(subscribedUsers)
        .where(
          eq(
            subscribedUsers.userEmail,
            user?.primaryEmailAddress?.emailAddress as string
          )
        );
      if (result2?.length === 0) {
        const result1 = await db.insert(subscribedUsers).values({
          userId: user?.id as string,
          userEmail: user?.primaryEmailAddress?.emailAddress as string,
          stripeCustomerId: paymentIntentId,
          createdAt: format(new Date(), "MM-dd-yyyy"),
          updatedAt: format(new Date(), "MM-dd-yyyy"),
        });
        if (result1) {
          toast(
            <p className="font-bold text-sm text-green-500">
              Subscribed Successfully!
            </p>
          );
        } else {
          console.log("error saving payment info");
        }
      } else {
        return;
      }
    } catch {
      toast(
        <p className="text-sm text-red-500 font-bold">
          Internal error occured while saving the payment info
        </p>
      );
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    console.log("saving payment info to database...");
    await saveSubscripiton(paymentIntentId);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade/success`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-2 rounded-md"
      id="payment-form"
    >
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-primary mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay Php${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
