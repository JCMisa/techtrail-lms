/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import LoadingDialog from "@/app/_components/LoadingDialog";
import { getReviewerByCourseId } from "@/services/AiOutputService";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import BasicInfo from "./_components/BasicInfo";
import Details from "./_components/Details";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";

interface PROPS {
  params: {
    courseId: string;
  };
}
const ReviewCreate = ({ params }: PROPS) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [reviewer, setReviewer] = useState();

  const getReviewerLayoutByCourseId = async () => {
    setLoading(true);
    try {
      const result = await getReviewerByCourseId(params?.courseId);
      if (result) {
        console.log("reviewer: ", result?.data);
        setReviewer(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the reviewer
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviewerLayoutByCourseId();
  }, [params]);

  const generateChapterContent = async () => {};

  return (
    <div className="p-5">
      <div className="flex flex-row items-center justify-center gap-2 my-5">
        <h2 className="text-center text-3xl font-bold">Manage Your Reviewer</h2>
      </div>

      <div className="flex flex-col gap-3">
        {/* basic info */}
        <div className="bg-dark-100 rounded-lg">
          <BasicInfo
            reviewer={reviewer}
            refreshData={() => getReviewerLayoutByCourseId()}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          {/* more details */}
          <div>
            <Details reviewer={reviewer} />
          </div>
          {/* chapter list */}
          <div className="w-full">
            <ChapterList
              reviewer={reviewer}
              refreshData={() => getReviewerLayoutByCourseId()}
            />
          </div>
        </div>
      </div>

      {/* submit button */}
      <Button onClick={generateChapterContent} className="my-5 float-end">
        {loading ? (
          <LoaderCircle className={"animate-spin"} />
        ) : (
          "Generate Reviewer"
        )}
      </Button>
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default ReviewCreate;
