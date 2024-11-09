import { db } from "@/utils/db";
import { purchase } from "@/utils/schema";
import { and, eq } from "drizzle-orm";

type CourseWithProgressWithCategory = {
  category: any;
  chapters: any[];
  progress: number | null;
};

type UserCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getUserCourses = async (userId: string): Promise<UserCourses> => {
  try {
    const purchasedCourses = await db
      .select()
      .from(purchase)
      .where(and(eq(purchase.userId, userId)));
  } catch (error) {
    console.log("[GET_USER_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
