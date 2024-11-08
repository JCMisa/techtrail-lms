/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { db } from "@/utils/db";
import { chapter, course } from "@/utils/schema";
import { asc, eq } from "drizzle-orm";
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

  const getChapter = async () => {
    try {
      const result = await db
        .select()
        .from(chapter)
        .where(eq(chapter.courseId, params?.courseId))
        .orderBy(asc(chapter.position));

      if (result) {
        router.push(
          `/viewCourse/courses/${params?.courseId}/chapters/${result[0]?.chapterId}`
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
    getChapter();
  }, [params?.courseId]);
};

export default ViewCoursePage;
