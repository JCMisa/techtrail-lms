/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseOptions from "@/components/custom/CourseOptions";
import { IconBadge } from "@/components/custom/icon-badge";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatCurrency";
import { db } from "@/utils/db";
import { category, chapter, course, purchase } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { BookOpen, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UserCourseCard = ({ courseId }: { courseId: string }) => {
  const { user } = useUser();

  const [courseRecord, setCourseRecord] = useState<any>();
  const [courseChaptersList, setCourseChaptersList] = useState<[] | any>([]);
  const [courseCategory, setCourseCategory] = useState<any>({});
  const [isPurchased, setIsPurchased] = useState(false);
  const [isFree, setIsFree] = useState(false);

  const getCourseByCourseId = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.courseId, courseId));

      if (result) {
        setCourseRecord(result[0]);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching course
        </p>
      );
    }
  };

  useEffect(() => {
    getCourseByCourseId();
  }, [courseId]);

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
        .where(eq(category.id, courseRecord?.categoryId));

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
  }, [courseRecord?.categoryId]);

  // check if course is purchased
  const checkIfPurchased = async () => {
    try {
      const result = await db
        .select()
        .from(purchase)
        .where(
          and(
            eq(purchase.userId, user?.id as string),
            eq(purchase.courseId, courseId)
          )
        );

      if (result?.length > 0) {
        setIsPurchased(true);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while checking if course is purchased
        </p>
      );
    }
  };

  useEffect(() => {
    user && checkIfPurchased();
  }, [user, courseId]);

  // check if course is free
  const checkIfFree = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.courseId, courseId));

      if (Number(result[0]?.price) === 0 || result[0]?.price === null) {
        setIsFree(true);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while checking if course is free
        </p>
      );
    }
  };

  useEffect(() => {
    checkIfFree();
  }, [courseId]);

  return (
    <Link href={`/viewCourse/courses/${courseId}`}>
      <div className="group hover:shadow-sm transition overflow-hidden shadow-lg rounded-lg h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          {courseRecord?.imageUrl ? (
            <Image
              fill
              className="object-cover"
              alt="courseImage"
              src={courseRecord?.imageUrl && courseRecord?.imageUrl}
              loading="lazy"
              placeholder="blur"
              blurDataURL="/blur.jpg"
            />
          ) : (
            <Image
              fill
              className="object-cover"
              alt="courseImage"
              src={"/empty-img-placeholder.jpg"}
              loading="lazy"
              placeholder="blur"
              blurDataURL="/blur.jpg"
            />
          )}
        </div>
        <div className="flex flex-col p-2 pb-5 bg-dark-100 rounded-b-md">
          <div className="text-lg md:text-base font-medium group-hover:text-light-100 transition line-clamp-1">
            {courseRecord?.title}
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
          <div className="flex items-center justify-between">
            {isPurchased && (
              <Badge className="w-[50%] flex items-center justify-center text-xs text-white bg-emerald-600 hover:bg-emerald-700">
                Purchased
              </Badge>
            )}
            {!isPurchased && !isFree && (
              <p className="text-md md:text-sm font-medium text-gray-600">
                {formatCurrency(courseRecord?.price)}
              </p>
            )}
            {isFree && (
              <Badge className="w-[50%] flex items-center justify-center text-xs">
                Free
              </Badge>
            )}
            <CourseOptions icon={<EllipsisVertical />} courseId={courseId} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCourseCard;
