/* eslint-disable react-hooks/exhaustive-deps */
import Spinner from "@/components/custom/Spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  addReview,
  getUserReviewsForSpecificCourse,
} from "@/services/CourseReviewService";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ReviewCard from "../../../_components/ReviewCard";

const LeaveCourseReview = ({
  courseId,
  userId,
  userEmail,
  courseName,
}: {
  courseId: string;
  userId: string;
  userEmail: string;
  courseName: string;
}) => {
  const [message, setMessage] = useState<string>();
  const [reaction, setReaction] = useState<string>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ownReviews, setOwnReviews] = useState<
    | [
        {
          id: number;
          courseId: string;
          userId: string;
          createdBy: string;
          message: string;
          reaction: string;
          isChecked: boolean;
          createdAt: string;
        }
      ]
    | null
  >(null);

  const reactions = [
    { label: "👍🏻", value: "thumbsUp", style: "upload-rev" },
    { label: "❤", value: "heart", style: "live-video-rev" },
    { label: "👎🏻", value: "thumbsDown", style: "life-event-rev" },
  ];

  const getOwnReviewsForSpecificCourse = async () => {
    try {
      const result = await getUserReviewsForSpecificCourse(userEmail, courseId);
      if (result?.data) {
        setOwnReviews(result?.data);
      }
    } catch {
      toast(
        <p className="text-sm text-red-500 font-bold">
          Internal error occured while fetching your reviews
        </p>
      );
    }
  };

  useEffect(() => {
    getOwnReviewsForSpecificCourse();
  }, [userEmail, courseId]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await addReview(
        courseId,
        userId,
        userEmail,
        message as string,
        reaction as string,
        isChecked,
        moment().format("MM-DD-YYYY")
      );

      if (result?.data) {
        toast(
          <p className="text-sm text-green-500 font-bold">
            Review posted successfully
          </p>
        );
        getOwnReviewsForSpecificCourse();
      }
    } catch {
      toast(
        <p className="text-sm text-red-500 font-bold">
          Internal error occured while posting your review
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        {/* message */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold mb-2">
            Congratulations! You&apos;ve Completed the Course! 🎉
          </h1>
          <p className="text-sm text-gray-200">
            Well done! You&apos;ve successfully completed the {courseName}{" "}
            course. Your dedication and hard work have paid off. This is a
            significant achievement, and we&apos;re incredibly proud of you.
          </p>
          <p className="text-sm text-gray-200">
            You&apos;ve gained valuable knowledge and skills that will
            undoubtedly benefit you in your future endeavors. We encourage you
            to continue learning and exploring new opportunities.
          </p>
          <p className="text-sm text-gray-200">
            Best wishes for continued success!
          </p>
          <p className="text-sm text-gray-500 italic">~ BBCM</p>
        </div>
        {/* form */}
        <div className="post-card-rev flex flex-col gap-3 shadow-lg">
          <textarea
            placeholder="What can you say about this course?"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <hr className="hr-rev" />
          <div className="button-row-rev flex items-center gap-5" id="first">
            {reactions.map(
              (
                reaction: { label: string; value: string; style: string },
                index: number
              ) => (
                <button
                  key={reaction.value}
                  className={`${reaction.style} ${
                    activeIndex !== index && "opacity-50"
                  }`}
                  onClick={() => {
                    setReaction(reaction.value);
                    setActiveIndex(index);
                  }}
                >
                  {reaction.label}
                </button>
              )
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(value) => setIsChecked(value as boolean)}
              // checked={initialData && initialData?.isFree}
              // onCheckedChange={(value) => onSubmit(value)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Let others see my review to this course
            </label>
          </div>
          <Button className="w-full" onClick={() => handleSubmit()}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </div>
      </div>
      {/* your reviews preview */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold">Your Feedbacks to this Course</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {ownReviews && ownReviews?.length > 0 ? (
            ownReviews?.map(
              (review: {
                id: number;
                courseId: string;
                userId: string;
                createdBy: string;
                message: string;
                reaction: string;
                isChecked: boolean;
                createdAt: string;
              }) => (
                <div key={review?.id}>
                  <ReviewCard
                    review={review}
                    showDelete={true}
                    refreshData={() => getOwnReviewsForSpecificCourse()}
                  />
                </div>
              )
            )
          ) : (
            <p className="text-gray-400 flex items-center justify-center my-5">
              You have no reviews for this course.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaveCourseReview;
