/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import LoadingDialog from "@/app/_components/LoadingDialog";
import { getReviewerByCourseId } from "@/services/AiOutputService";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Details from "../../reviewCreate/[courseId]/_components/Details";
import CourseComponent from "./_components/CourseComponent";
import { Button } from "@/components/ui/button";
import YoutubeIframe from "./_components/YoutubeIframe";

interface PROPS {
  params: {
    courseId: string;
  };
}

const ViewReviewer = ({ params }: PROPS) => {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [activeIndex, setactiveIndex] = useState(0);
  const [course, setCourse] = useState<any>();
  const [bgImage, setBgImage] = useState<string>();

  const getReviewerById = async () => {
    setLoading(true);
    try {
      const result: any = await getReviewerByCourseId(params?.courseId);
      if (result) {
        setCourse(result?.data);
        console.log("reviewer: ", result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-red-500 text-sm">
          Internal error occured while fetching the reviewer
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getReviewerById();
  }, [user, params]);

  // generate random number to display random bg image
  const getRandomBgImage = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) {
      setBgImage("bg-img1");
    } else if (randomNumber === 2) {
      setBgImage("bg-img2");
    } else {
      setBgImage("bg-img3");
    }
  };

  useEffect(() => {
    getRandomBgImage();
  }, []);

  const completeCourse = () => {};

  return (
    <div className="mb-20 md:mb-0">
      <div
        className={`min-h-screen w-full overflow-x-hidden flex justify-center items-center ${bgImage} bg-fixed bg-no-repeat bg-cover bg-center no-print`}
      >
        <div className="flex flex-col gap-3 p-10 sm:p-5 w-full">
          <h2 className="text-2xl sm:text-6xl font-black linear-text">
            {course?.courseName}
          </h2>
          <p className="text-xs sm:text-lg">{course?.description}</p>
        </div>
      </div>

      <div className="p-10">
        <Details reviewer={course} showTitle={false} />

        <div>
          {/* stepper */}
          <div className="flex flex-col items-center justify-center mt-10 overflow-x-auto card-scroll no-print">
            <div className="flex mt-10 mb-7">
              {course &&
                JSON.parse(course?.chaptersArray)?.map(
                  (item: any, index: number) => (
                    <div
                      key={item.id || index}
                      className="flex flex-row items-center"
                    >
                      <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                        <div
                          className={`bg-dark-100 p-3 w-5 h-5 text-center flex items-center justify-center rounded-full text-white text-xs ${
                            activeIndex >= index && "linear-bg"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </div>
                      {index !==
                        course?.courseOutput?.course?.chapters?.length - 1 && (
                        <div
                          className={`h-1 w-[15px] rounded-full bg-gray-300 ${
                            activeIndex - 1 >= index && "linear-bg"
                          }`}
                        ></div>
                      )}
                    </div>
                  )
                )}
            </div>
          </div>

          {/* video */}
          <div className="flex justify-center my-6 p-5 bg-dark rounded-lg">
            <YoutubeIframe
              videoId={course?.courseVideo}
              videoTitle={course?.courseName}
            />
          </div>

          <div className="mt-10">
            {/* components */}
            {course &&
              JSON.parse(course?.chaptersArray)?.map(
                (chapter: any, index: number) =>
                  activeIndex === index && (
                    <div key={index}>
                      <CourseComponent chapter={chapter} />
                    </div>
                  )
              )}
            {/* {activeIndex >= course?.courseOutput?.course?.chapters?.length && (
              <CourseCompletePage course={course} user={user} />
            )} */}

            {/* next & prev btns */}
            <div className="flex flex-col gap-3 sm:flex-row justify-between mt-10 items-center overflow-auto card-scroll no-print">
              <Button
                onClick={() => setactiveIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="min-w-32 border-primary hover:bg-primary hover:text-white"
                variant={"outline"}
              >
                Previous
              </Button>
              {/* {activeIndex < course &&
                JSON.parse(course?.chaptersArray)?.length && (
                  <Button
                    onClick={() => setactiveIndex(activeIndex + 1)}
                    className="min-w-32"
                  >
                    Next
                  </Button>
                )} */}
              <Button
                onClick={() => setactiveIndex(activeIndex + 1)}
                className="min-w-32"
              >
                Next
              </Button>
              {/* {activeIndex === course &&
                JSON.parse(course?.chaptersArray)?.length && (
                  <Button onClick={() => completeCourse()} className="min-w-32">
                    {loading ? (
                      <Spinner />
                    ) : (
                      "Complete Course"
                    )}
                  </Button>
                )} */}
            </div>
          </div>
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default ViewReviewer;
