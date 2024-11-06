/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { db } from "@/utils/db";
import { category, chapter } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";

interface CourseCardProps {
  courseId: string;
  title: string;
  imageUrl: string;
  price: number;
  categoryId: number;
}
const CourseCard = ({
  courseId,
  title,
  imageUrl,
  price,
  categoryId,
}: CourseCardProps) => {
  const [courseChaptersList, setCourseChaptersList] = useState<[] | any>([]);
  const [courseCategory, setCourseCategory] = useState<any>({});

  // get the chapters based on the courseId from the props
  const getChaptersByCourseId = async () => {
    try {
      const result = await db
        .select()
        .from(chapter)
        .where(eq(chapter.courseId, courseId));

      if (result) {
        setCourseChaptersList(result);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while getting chapters of the course
        </p>
      );
    }
  };

  useEffect(() => {
    getChaptersByCourseId();
  }, [courseId]);

  // get category name based on categoryId from props
  const getCategoryName = async () => {
    try {
      const result = await db
        .select()
        .from(category)
        .where(eq(category.id, categoryId));

      if (result) {
        setCourseCategory(result[0]);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while getting the course category name
        </p>
      );
    }
  };

  useEffect(() => {
    getCategoryName();
  }, [categoryId]);

  return (
    <Link href={`/viewCourse/courses/${courseId}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt="courseImage"
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col p-2 pb-5 bg-dark rounded-b-md">
          <div className="text-lg md:text-base font-medium group-hover:text-light-100 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            {courseCategory && courseCategory?.name}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-gray-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {courseChaptersList && courseChaptersList?.length}{" "}
                {courseChaptersList && courseChaptersList?.length === 1
                  ? "Chapter"
                  : "Chapters"}
              </span>
            </div>
          </div>
          {/* todo: show progress */}
          <p className="text-md md:text-sm font-medium text-gray-600">
            {formatCurrency(price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
