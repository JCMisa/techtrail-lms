/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/utils/db";
import { chapter, purchase } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import CourseSidebarItem from "./CourseSidebarItem";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import CourseProgress from "@/components/custom/CourseProgress";

const CourseSidebar = ({
  course,
  progressCount,
}: {
  course: any;
  progressCount: number;
}) => {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [purchaseState, setPurchaseState] = useState<any>();
  const [courseChapters, setCourseChapters] = useState<[] | any>();

  const getPurchase = async () => {
    try {
      const result = await db
        .select()
        .from(purchase)
        .where(
          and(
            eq(purchase.userId, user?.id as string),
            eq(purchase.courseId, course?.courseId)
          )
        );

      if (result) {
        setPurchaseState(result[0]);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching purchase
        </p>
      );
    }
  };

  useEffect(() => {
    user && getPurchase();
  }, [user, course]);

  const getCourseChapters = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(chapter)
        .where(eq(chapter.courseId, course?.courseId))
        .orderBy(chapter.position);

      if (result) {
        setCourseChapters(result);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching chapters
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseChapters();
  }, [course?.courseId]);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <div className="flex flex-row items-center gap-x-2">
          <ArrowLeftCircle
            className="w-4 h-4 cursor-pointer"
            onClick={() => router.replace("/dashboard/browse")}
          />
          <h1 className="font-semibold">{course?.title}</h1>
        </div>
        {purchaseState && (
          <div className="mt-10">
            <CourseProgress
              variant={progressCount === 100 ? "success" : "default"}
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {!loading ? (
          courseChapters &&
          courseChapters?.map((chapter: any) => (
            <CourseSidebarItem
              key={chapter?.id}
              chapterId={chapter?.chapterId}
              label={chapter?.title}
              courseId={course?.courseId}
              isLocked={!chapter?.isFree && !purchaseState}
              progressCount={progressCount}
            />
          ))
        ) : (
          <div className="flex items-center py-2 flex-col gap-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="pl-6 bg-dark-100 w-[90%] min-h-16 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSidebar;
