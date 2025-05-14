/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartBarIncreasing, Notebook, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { deleteReviewer } from "@/services/AiOutputService";

const UserReviewerCard = ({
  reviewer,
  refreshData,
}: {
  reviewer: any;
  refreshData: () => void;
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deleteReviewer(reviewer?.id as number);
      if (result?.data) {
        toast(
          <p className="text-sm text-green-500 font-bold">
            Reviewer deleted successfully
          </p>
        );
        refreshData();
      }
    } catch {
      toast(
        <p className="text-sm text-red-500 font-bold">
          Internal error occured while deleting the reviewer
        </p>
      );
    }
  };

  return (
    <div className="p-5 rounded-lg bg-dark gap-3 relative">
      <div className="absolute bottom-1 right-2">
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash className="w-5 h-5 text-red-500 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                reviewer and remove related data from our servers.
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
      </div>

      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <Notebook className="w-4 h-4 text-primary" />
            <p
              className="text-sm font-bold line-clamp-1 cursor-pointer"
              onClick={() =>
                router.push(
                  `/dashboard/course/review/reviewView/${reviewer?.courseId}`
                )
              }
            >
              {reviewer?.courseName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ChartBarIncreasing className="w-4 h-4 text-primary" />
            <p className="text-xs text-gray-400">{reviewer?.level}</p>
          </div>
        </div>
        {reviewer?.courseBanner ? (
          <Image
            src={reviewer?.courseBanner}
            alt="banner"
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur.jpg"
          />
        ) : (
          <Image
            src={"/empty-img-placeholder.jpg"}
            alt="banner"
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur.jpg"
          />
        )}
      </div>
    </div>
  );
};

export default UserReviewerCard;
