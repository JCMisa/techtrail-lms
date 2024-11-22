/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartBarIncreasing, Notebook } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const UserReviewerCard = ({ reviewer }: { reviewer: any }) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/dashboard/course/review/reviewView/${reviewer?.courseId}`)
      }
      className="p-5 rounded-lg bg-dark gap-3 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <Notebook className="w-4 h-4 text-primary" />
            <p className="text-sm font-bold line-clamp-1">
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
          />
        ) : (
          <Image
            src={"/empty-img-placeholder.jpg"}
            alt="banner"
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default UserReviewerCard;
