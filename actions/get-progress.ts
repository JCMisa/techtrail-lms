import { db } from "@/utils/db";
import { chapter, userProgress } from "@/utils/schema";
import { and, count, eq, sql } from "drizzle-orm";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number | any> => {
  try {
    const publishedChapters = await db
      .select()
      .from(chapter)
      .where(
        and(eq(chapter.courseId, courseId), eq(chapter.isPublished, true))
      );

    const publishedChapterIds = publishedChapters?.map((chapter) => chapter.id);

    const validCompletedChapters = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.isCompleted, true),
          sql`${userProgress.chapterId} IN (${sql.join(
            publishedChapterIds,
            ","
          )})`
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
