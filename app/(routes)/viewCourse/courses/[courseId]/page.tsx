/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { db } from "@/utils/db";
import { chapter, course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const ViewCoursePage = ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const router = useRouter();

  const getCourseWithChapters = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .leftJoin(chapter, eq(course.courseId, chapter.courseId))
        .where(eq(course.courseId, params?.courseId));

      if (result) {
        router.push(
          `/viewCourse/courses/${result[0]?.course?.courseId}/chapters/${result[0]?.chapter?.chapterId}`
        );
      } else router.replace("/dashboard/browse");
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the course with chapters
        </p>
      );
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseWithChapters();
  }, [params?.courseId]);
};

export default ViewCoursePage;
