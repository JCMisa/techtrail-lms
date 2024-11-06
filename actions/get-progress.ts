/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/utils/db";
import { chapter, userProgress } from "@/utils/schema";
import { and, eq, inArray } from "drizzle-orm";

export const getProgress = async (
  userId: any,
  courseId: any
): Promise<number | any> => {
  try {
    const publishedChapters = await db
      .select({
        chapterId: chapter.chapterId,
      })
      .from(chapter)
      .where(
        and(eq(chapter.courseId, courseId), eq(chapter.isPublished, true))
      );

    const publishedChapterIds = publishedChapters?.map(
      (chapter: any) => chapter.chapterId
    );

    const validCompletedChapters = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.isCompleted, true),
          inArray(userProgress.chapterId, publishedChapterIds)
        )
      );

    const progressPercentage =
      (validCompletedChapters?.length / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("pGET_PROGRESS", error);
    return 0;
  }
};
