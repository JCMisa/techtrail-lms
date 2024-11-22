/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProgress } from "@/actions/get-progress";
import CourseProgress from "@/components/custom/CourseProgress";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UserCourseCard = ({
  purchasedCourse,
  user,
}: {
  purchasedCourse: any;
  user: any;
}) => {
  const router = useRouter();

  const [courseInfo, setCourseInfo] = useState<any>();
  const [progressCount, setProgressCount] = useState<number>(0);

  const getCourseInfo = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.courseId, purchasedCourse?.courseId));

      if (result) {
        setCourseInfo(result[0]);
        setProgressCount(await getProgress(user?.id, result[0]?.courseId));
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching course info
        </p>
      );
    }
  };

  useEffect(() => {
    getCourseInfo();
  }, [purchasedCourse]);

  return (
    <div
      onClick={() => router.push(`/viewCourse/courses/${courseInfo?.courseId}`)}
      className="p-5 rounded-lg bg-dark gap-3 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-primary" />
            <p className="text-sm font-bold line-clamp-1">
              {courseInfo?.title}
            </p>
          </div>
          <CourseProgress
            variant={progressCount === 100 ? "success" : "default"}
            value={progressCount}
          />
        </div>
        {courseInfo?.imageUrl ? (
          <Image
            src={courseInfo?.imageUrl}
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

export default UserCourseCard;
