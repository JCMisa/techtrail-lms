/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllReviewersByUserEmail } from "@/services/AiOutputService";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import SkeletonCard from "./SkeletonCard";
import ReviewerCard from "./ReviewerCard";
import Empty from "@/app/_components/Empty";

const ReviewersList = () => {
  const { user } = useUser();

  const [reviewersList, setReviewersList] = useState<[] | any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllUserReviewers = async () => {
    setLoading(true);
    try {
      const result = await getAllReviewersByUserEmail(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result) {
        setReviewersList(result?.data);
        console.log("reviewer list: ", result?.data);
      }
    } catch (error) {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching all reviewers
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getAllUserReviewers();
  }, [user]);

  return (
    <div>
      {!loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {reviewersList?.length > 0 &&
            reviewersList?.map((reviewer: any, index: number) => (
              <ReviewerCard
                key={reviewer?.id || index}
                reviewer={reviewer}
                refreshData={() => getAllUserReviewers()}
              />
            ))}
        </div>
      ) : (
        // skeleton
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((item) => (
            <SkeletonCard key={item} />
          ))}
        </div>
      )}
      {reviewersList?.length == 0 && (
        <Empty
          header="No Reviewers Found"
          subheader="Please wait while we retrieve necessary data"
        />
      )}
    </div>
  );
};

export default ReviewersList;
