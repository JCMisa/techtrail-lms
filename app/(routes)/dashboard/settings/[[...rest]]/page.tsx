"use client";

import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const SettingPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-center h-full p-5 relative">
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="absolute top-5 right-7 z-20"
          >
            Go Back
          </Button>
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
