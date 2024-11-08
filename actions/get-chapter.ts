/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/utils/db";
import { attachment, chapter, course, purchase } from "@/utils/schema";
import { and, asc, eq, gt } from "drizzle-orm";

export const getChapterInfo = async (
  userId: string,
  courseId: string,
  chapterId: string
) => {
  try {
    // check first if this course is purchased already by the user
    const purchaseModel = await db
      .select()
      .from(purchase)
      .where(and(eq(purchase.userId, userId), eq(purchase.courseId, courseId)));

    // fetch the course that is published only
    const courseModel = await db
      .select()
      .from(course)
      .where(and(eq(course.courseId, courseId), eq(course.isPublished, true)));

    // fetch the chapters
    const chapterModel = await db
      .select()
      .from(chapter)
      .where(
        and(eq(chapter.chapterId, chapterId), eq(chapter.isPublished, true))
      );

    if (!courseModel || !chapterModel) {
      console.log("No course or chapter found");
    }

    let attachmentModel: any = null;
    let videoUrlModel: any = null;
    let nextChapterModel: any = null;

    if (purchaseModel) {
      attachmentModel = await db
        .select()
        .from(attachment)
        .where(eq(attachment.courseId, courseId));
    }

    if (chapterModel[0]?.isFree || purchaseModel.length > 0) {
      videoUrlModel = await db
        .select({
          videoUrl: chapter.videoUrl,
        })
        .from(chapter)
        .where(eq(chapter.chapterId, chapterId));

      nextChapterModel = await db
        .select()
        .from(chapter)
        .where(
          and(
            eq(chapter.courseId, courseId),
            eq(chapter.isPublished, true),
            gt(chapter.position, chapterModel[0]?.position as number)
          )
        )
        .orderBy(asc(chapter.position));
    }

    return {
      chapterModel,
      courseModel,
      videoUrlModel,
      attachmentModel,
      nextChapterModel,
      purchaseModel,
    };
  } catch (error) {
    console.log("[GET_CHAPTER] ", error);
  }
};
