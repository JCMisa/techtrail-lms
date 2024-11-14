"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { UserSubscriptionContext } from "@/app/_context/UserSubscriptionContext";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "./_components/CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const UpgradePage = () => {
  const router = useRouter();
  const { userSubscription } = useContext(UserSubscriptionContext);

  const amount = 3000;
  return (
    <div>
      <section className="text-gray-400 bg-dark rounded-lg body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              Pricing
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Upgrade your plan to enjoy limitless possibilities.
            </p>
            <div className="flex mx-auto border-2 border-dark-500 rounded overflow-hidden mt-6">
              <button className="py-1 px-4 bg-dark-100 text-white focus:outline-none">
                Free
              </button>
              <button className="py-1 px-4 text-gray-300 focus:outline-none">
                Forever
              </button>
            </div>
          </div>
          <div className="flex flex-wrap -m-4 mb-3">
            <div className="p-4  md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-700 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">
                  START
                </h2>
                <h1 className="text-5xl text-white pb-4 mb-4 border-b border-gray-800 leading-none">
                  Free
                </h1>
                <p className="flex items-center text-gray-400 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  3 reviewer categories
                </p>
                <p className="flex items-center text-gray-400 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  5 reviewers limit
                </p>
                <p className="flex items-center text-gray-400 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Unlimited reviewer access
                </p>
                <button className="flex items-center mt-auto text-white bg-gray-800 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-700 rounded">
                  Continue
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-400 mt-3">
                  Literally you probably haven&apos;t heard of them jean shorts.
                </p>
              </div>
            </div>
            <div className="p-4  md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-primary flex flex-col relative overflow-hidden">
                <span className="bg-primary text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  POPULAR
                </span>
                <h2 className="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">
                  PRO
                </h2>
                <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-primary-100">
                  <span>Php 3000</span>
                  <span className="text-lg ml-1 font-normal text-gray-400">
                    /forever
                  </span>
                </h1>
                <p className="flex items-center text-gray-400 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  6 reviewer categories
                </p>
                <p className="flex items-center text-gray-400 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  1000 reviewers
                </p>
                <p className="flex items-center text-gray-400 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Unlimited reviewer access
                </p>
                <p className="flex items-center text-gray-400 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Provide app testimonial
                </p>
                <Dialog>
                  <DialogTrigger asChild className="flex">
                    <button
                      disabled={userSubscription}
                      className="flex items-center mt-auto text-white bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary-100 rounded"
                      onClick={() => router.push("#payment-form")}
                    >
                      {userSubscription ? "Active Plan" : "Get Started"}
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4 ml-auto"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        <h2 className="mb-3 text-lg font-bold">Upgrade Plan</h2>
                      </DialogTitle>
                      <DialogDescription>
                        <Elements
                          stripe={stripePromise}
                          options={{
                            mode: "payment",
                            amount: convertToSubcurrency(amount),
                            currency: "PHP",
                          }}
                        >
                          <CheckoutPage amount={amount} />
                        </Elements>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button
                          variant={"outline"}
                          className="mt-5 w-full flex items-end self-end"
                        >
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <p className="text-xs text-gray-400 mt-3">
                  Literally you probably haven&apos;t heard of them jean shorts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpgradePage;
