"use client";

import React from "react";
import UsageTrack from "../_components/UsageTrack";
import UserInfo from "./_components/UserInfo";
import { useUser } from "@clerk/nextjs";
import UserCourses from "./_components/UserCourses";
import UserReviewers from "./_components/UserReviewers";
import UserCertificates from "./_components/UserCertificates";

const ProfilePage = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* user info */}
        <div>
          <UserInfo user={user} />
        </div>
        {/* user courses */}
        <div className="md:col-span-2 min-h-80 max-h-80 overflow-auto card-scroll">
          <UserCourses user={user} />
        </div>
      </div>

      {/* user reviewers */}
      <div className="w-full min-h-80 max-h-80 overflow-auto card-scroll">
        <UserReviewers user={user} />
      </div>

      {/* user certificates */}
      <div className="w-full min-h-80 max-h-80 overflow-auto card-scroll">
        <UserCertificates user={user} />
      </div>
      <UsageTrack />
    </div>
  );
};

export default ProfilePage;
