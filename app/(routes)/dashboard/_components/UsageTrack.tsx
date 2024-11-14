/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { TotalUsageContext } from "@/app/_context/TotalUsageContext";
import { Progress } from "@/components/ui/progress";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { UserSubscriptionContext } from "@/app/_context/UserSubscriptionContext";
import { subscribedUsers } from "@/utils/schema";
import { getAllReviewersByUserEmail } from "@/services/AiOutputService";
import { Button } from "@/components/ui/button";

const UsageTrack = () => {
  const { user } = useUser();
  const router = useRouter();

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { setUserSubscription } = useContext(UserSubscriptionContext);
  const [maxReviewers, setMaxReviewers] = useState(5);

  const isUserSubscribed = async () => {
    const result = await db
      .select()
      .from(subscribedUsers)
      .where(
        eq(
          subscribedUsers?.userEmail,
          user?.primaryEmailAddress?.emailAddress as string
        )
      );

    if (
      result.length != 0 ||
      user?.primaryEmailAddress?.emailAddress === "johncarlomisa399@gmail.com"
    ) {
      // if yung current user is in the subscribedUsers schema, then he is subscribed and paid already
      setUserSubscription(true);
      setMaxReviewers(1000);
    }
  };

  const getTotalUsage = async () => {
    const result = await getAllReviewersByUserEmail(
      user?.primaryEmailAddress?.emailAddress as string
    );

    if (result) {
      setTotalUsage(result?.data?.length);
    }
  };

  useEffect(() => {
    user && getTotalUsage();
    user && isUserSubscribed();
  }, [user]);

  return (
    <div className="m-5 w-full">
      <div className="bg-dark-100 text-white rounded-lg p-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium">Credits</h2>
          <Button
            variant={"outline"}
            size={"sm"}
            className="text-primary border-primary-100 hover:bg-dark-100 hover:text-primary-100"
            onClick={() => getTotalUsage()}
          >
            Refresh
          </Button>
        </div>

        <Progress value={(totalUsage / maxReviewers) * 100} />
        <h2 className="text-xs my-2">
          {totalUsage}/{maxReviewers} credits used
        </h2>
      </div>
      <Button
        onClick={() => router.push("/dashboard/upgrade")}
        className="w-full my-3"
      >
        Upgrade
      </Button>
    </div>
  );
};

export default UsageTrack;
