/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Empty from "@/app/_components/Empty";
import { getAllReviewersByUserEmail } from "@/services/AiOutputService";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import UserReviewerCard from "./UserReviewerCard";

const UserReviewers = ({ user }: { user: any }) => {
  const [userReviewers, setUserReviewers] = useState<any>([]);

  const getUserReviewers = async () => {
    try {
      const result = await getAllReviewersByUserEmail(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result) {
        setUserReviewers(result?.data);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching user reviewers
        </p>
      );
    }
  };

  useEffect(() => {
    user && getUserReviewers();
  }, [user]);

  return (
    <>
      <h2 className="text-lg font-bold">My Reviewers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        {userReviewers?.length > 0 ? (
          userReviewers?.map((reviewer: any) => (
            <div key={reviewer?.id}>
              <UserReviewerCard reviewer={reviewer} />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <Empty
              header="You have no Reviewers"
              subheader="Please wait while we fetch necessary data to show"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UserReviewers;
