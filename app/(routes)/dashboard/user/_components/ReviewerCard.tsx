/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartBarIncreasing, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import DropdownOption from "./DropdownOption";
import LoadingDialog from "@/app/_components/LoadingDialog";
import { toast } from "sonner";
import { deleteReviewer } from "@/services/AiOutputService";

const ReviewerCard = ({
  reviewer,
  displayUser = false,
  refreshData,
}: {
  reviewer: any;
  displayUser?: boolean;
  refreshData: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const deleteCourse = async (id: number) => {
    setLoading(true);
    try {
      const result = await deleteReviewer(id);
      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Reviewer deleted successfully
          </p>
        );
        refreshData();
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while deleting reviewer
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-dark-100 border border-dark-100 rounded-lg shadow-md">
      <div>
        <Image
          src={reviewer?.courseBanner}
          alt="banner"
          width={1000}
          height={1000}
          className="rounded-t-lg w-full min-h-[200px] max-h-[200px]"
        />
      </div>
      <div className="p-5 flex flex-col gap-5">
        <div>
          <p className="w-full p-2 min-h-14 max-h-14 bg-dark overflow-hidden font-bold text-light-100 text-sm rounded-lg">
            {reviewer?.courseName}
          </p>
        </div>
        <p className="w-full min-h-52 max-h-52 bg-dark overflow-hidden overflow-y-auto card-scroll text-xs p-3 text-gray-400 rounded-lg">
          {reviewer?.description}
        </p>
        <div className="flex flex-row items-center justify-between">
          <ChartBarIncreasing />
          {!displayUser ? (
            <DropdownOption
              children={<EllipsisVertical />}
              deleteCourse={() => deleteCourse(reviewer?.id)}
              reviewerCourseId={reviewer?.courseId}
            />
          ) : (
            <div className="flex items-center gap-3 mt-2 overflow-hidden">
              <Image
                src={reviewer?.profileImage}
                width={35}
                height={35}
                alt="img"
                className="rounded-full"
              />
              <h2 className="text-sm">{reviewer?.username}</h2>
            </div>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default ReviewerCard;
