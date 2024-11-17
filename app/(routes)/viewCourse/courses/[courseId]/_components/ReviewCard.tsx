import { Badge } from "@/components/ui/badge";
import { Heart, ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteReview } from "@/services/CourseReviewService";

const ReviewCard = ({
  review,
  showDelete,
  refreshData,
}: {
  review: {
    id: number;
    courseId: string;
    userId: string;
    createdBy: string;
    message: string;
    reaction: string;
    isChecked: boolean;
    createdAt: string;
  };
  showDelete: boolean;
  refreshData?: () => void;
}) => {
  const handleDelete = async () => {
    try {
      const result = await deleteReview(review?.id);
      if (result?.data) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Review deleted successfully
          </p>
        );
        if (refreshData) {
          refreshData();
        }
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while deleting the review
        </p>
      );
    }
  };
  return (
    <div className="flex flex-col gap-2 text-white max-w-md w-full bg-neutral-900 p-5 rounded-md shadow-md hover:scale-105 hover:duration-150 duration-150">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row justify-between w-full">
          <div className="bg-neutral-700 rounded-md w-auto h-full text-[10px] px-2 text-center flex items-center justify-centers">
            {review?.createdAt}
          </div>
          <div className="flex items-center gap-3">
            {review?.isChecked && (
              <Badge className="bg-emerald-500">Public</Badge>
            )}
            {!review?.isChecked && <Badge className="bg-dark">Private</Badge>}
            {showDelete && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Trash className="w-5 h-5 cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your review from this course.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete()}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="bg-neutral-700 rounded-md w-auto h-full text-[11px] p-2 text-center flex items-center justify-centers">
          {review?.createdBy}
        </div>

        <div className="text-xs">
          <div className="flex flex-row">
            {review?.reaction === "thumbsUp" && (
              <ThumbsUp className="text-yellow-500" />
            )}
            {review?.reaction === "thumbsDown" && (
              <ThumbsDown className="text-red-500" />
            )}
            {review?.reaction === "heart" && (
              <Heart className="text-pink-500" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-neutral-700 rounded-md w-full h-20 p-2 text-sm overflow-auto card-scroll">
        {review?.message}
      </div>
    </div>
  );
};

export default ReviewCard;
