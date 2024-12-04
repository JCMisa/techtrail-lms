/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import ReviewCard from "@/app/(routes)/viewCourse/courses/[courseId]/_components/ReviewCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { getPublishedReviewsByCourseId } from "@/services/CourseReviewService";
import { findUserByEmail } from "@/services/UserService";
import { db } from "@/utils/db";
import { category, course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Calendar, Coins, LayoutGrid } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";

const CourseDetailsPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const courseRecord = await db
    .select()
    .from(course)
    .where(eq(course.courseId, params?.courseId));

  const courseCategory = await db
    .select()
    .from(category)
    .where(eq(category.id, Number(courseRecord[0]?.categoryId)));

  const courseReviews = await getPublishedReviewsByCourseId(params?.courseId);

  const courseOwner = await findUserByEmail(
    courseRecord[0]?.userEmail as string
  );

  return (
    <section>
      <div className="container flex flex-wrap px-5 py-24 mx-auto items-center">
        {/* course image */}
        <div className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 md:mb-0 mb-10 pb-10 border-b border-dark flex flex-col gap-5">
          {courseRecord?.length > 0 ? (
            <Image
              src={courseRecord[0]?.imageUrl as string}
              alt="courseBanner"
              width={1000}
              height={1000}
              className="rounded-lg"
            />
          ) : (
            <Image
              src={"/empty-img-placeholder.jpg"}
              alt="courseBanner"
              width={1000}
              height={1000}
            />
          )}
          {/* course owner details */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
            <div className="flex flex-col gap-3">
              <Button>
                <Link href={`/viewCourse/courses/${params?.courseId}`}>
                  Start
                </Link>
              </Button>
              <Link
                href={`/dashboard/teacherProfile/${courseOwner?.data?.id}`}
                className="flex flex-row items-center gap-2 cursor-pointer"
              >
                {courseOwner?.data ? (
                  <Image
                    src={courseOwner?.data?.imageUrl as string}
                    alt="ownerProfile"
                    width={1000}
                    height={1000}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <Image
                    src={"/empty-img-placeholder.jpg"}
                    alt="ownerProfile"
                    width={1000}
                    height={1000}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex flex-col items-start">
                  <p className="text-sm font-bold">
                    {courseOwner?.data?.firstname} {courseOwner?.data?.lastname}
                  </p>
                  <span className="text-xs">{courseOwner?.data?.email}</span>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500">JOINED AT</span>
                <span className="text-sm">
                  {moment(courseOwner?.data?.createdAt).format("MMM-DD-YYYY")}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500">ROLE</span>
                <span className="text-sm">
                  {courseOwner?.data?.role === "admin" && (
                    <Badge className="bg-primary">Admin</Badge>
                  )}
                  {courseOwner?.data?.role === "teacher" && (
                    <Badge className="bg-secondary-100">Teacher</Badge>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* course details */}
        <div className="flex flex-col md:w-1/2 md:pl-12 gap-5">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400">TITLE</p>
            <h2 className="text-2xl font-bold line-clamp-1">
              {courseRecord[0]?.title}
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400">DESCRIPTION</p>
            <h2 className="text-sm">{courseRecord[0]?.description}</h2>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-1 items-center">
              <div className="flex items-center gap-1">
                <LayoutGrid className="w-4 h-4 text-primary" />
                <p className="text-xs text-gray-400">CATEGORY</p>
              </div>
              <h2 className="text-sm">
                {courseCategory && courseCategory[0]?.name}
              </h2>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-emerald-500" />
                <p className="text-xs text-gray-400">PRICE</p>
              </div>
              <h2 className="text-sm">
                {courseRecord &&
                  formatCurrency(
                    Number(courseRecord[0]?.price ? courseRecord[0]?.price : 0)
                  )}
              </h2>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="flex items-center gap-1 ">
                <Calendar className="w-4 h-4 text-secondary-100" />
                <p className="text-xs text-gray-400">CREATED AT</p>
              </div>
              <h2 className="text-sm">
                {courseRecord &&
                  moment(courseRecord[0]?.createdAt).format("MMM/DD/YYYY")}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* course reviews */}
      <div className="px-5 pb-24">
        <h1 className="text-2xl font-bold mb-5">Course Reviews</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {courseReviews?.data?.length > 0 ? (
            courseReviews?.data?.map(
              (review: {
                id: number;
                courseId: string;
                userId: string;
                createdBy: string;
                message: string;
                reaction: string;
                isChecked: boolean;
                createdAt: string;
              }) => (
                <div key={review?.id}>
                  <ReviewCard review={review} showDelete={false} />
                </div>
              )
            )
          ) : (
            <div className="w-full flex items-center justify-center">
              <p className="text-xs text-gray-500">
                No reviews found for this course
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsPage;
