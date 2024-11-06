/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { and, eq, like } from "drizzle-orm";

type CourseWithProgressWithCategory = {
  category: any | null;
  chapters: { chapterId: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[] | any> => {
  try {
    const courses = await db
      .select()
      .from(course)
      .where(
        and(eq(course.isPublished, true), like(course.title, title as string))
      );
  } catch (error) {
    console.log("[GET_COURSES", error);
    return [];
  }
};
