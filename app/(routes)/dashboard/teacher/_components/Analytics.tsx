/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import Empty from "@/app/_components/Empty";
import { db } from "@/utils/db";
import { course, purchase } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq, inArray } from "drizzle-orm";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { toast } from "sonner";
import DataCard from "./DataCard";

export type CourseType = {
  id: number;
  userId: string;
  userEmail: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  isPublished: boolean;
  categoryId: string;
  createdAt: string;
  updatedBy: string;
  courseId: string;
};

export type PurchasedCourses = {
  id: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  userEmail: string;
  userId: string;
};

const Analytics = () => {
  const { user } = useUser();

  const [purchasedTeacherCourses, setPurchasedTeacherCourses] = useState<any>();
  const [teacherCoursesIds, setTeacherCoursesIds] = useState<any>();
  const [totalRevenue, setTotalRevenue] = useState<number>();
  const [totalSales, setTotalSales] = useState<number>();

  const getTeacherCourses = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.userId, user?.id as string));

      if (result?.length > 0) {
        const ids = result?.map((item: any) => item.courseId);
        setTeacherCoursesIds(ids);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching teacher courses
        </p>
      );
    }
  };

  useEffect(() => {
    user && getTeacherCourses();
  }, [user]);

  const getTeacherPurchasedCourses = async () => {
    try {
      const result = await db
        .select()
        .from(purchase)
        .where(inArray(purchase.courseId, teacherCoursesIds));

      if (result?.length > 0) {
        console.log("purchased courses: ", result);
        const purchases = result?.map((item: any) => item?.price);
        // add the prices in the purchases array
        const purchaseTotal = purchases.reduce(
          (acc, curr) => acc + Number(curr),
          0
        );
        setTotalRevenue(purchaseTotal);
        setTotalSales(result?.length);
        const purchasedCoursesIds = result?.map((item: any) => item?.courseId);
        const result2 = await db
          .select()
          .from(course)
          .where(
            and(
              eq(course.userId, user?.id as string),
              inArray(course.courseId, purchasedCoursesIds)
            )
          );

        if (result2.length > 0) {
          console.log("teacher purchased courses: ", result2);
          setPurchasedTeacherCourses(result2);
          // todo: i can get what courses are purchased but not how many times
        }
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching teacher purchased courses
        </p>
      );
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    teacherCoursesIds && getTeacherPurchasedCourses();
  }, [teacherCoursesIds]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label={"Total Revenue"}
          value={totalRevenue || 0}
          shouldFormat={true}
        />
        <DataCard label={"Total Sales"} value={totalSales || 0} />
      </div>
      {purchasedTeacherCourses?.length > 0 ? (
        <div className="bg-dark rounded-xl w-full p-4 h-full flex flex-col gap-8">
          {/* title */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Purchased Courses with Price
            </h2>
            <MoreHorizontal width={20} height={20} />
          </div>
          {/* chart */}
          <div className="w-full h-[75%] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                width={150}
                height={40}
                data={purchasedTeacherCourses}
                barSize={100}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="title"
                  tick={{ fill: "#EBD3F8" }}
                  tickLine={false}
                />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    borderColor: "lightgray",
                  }}
                />
                <Legend
                  align="left"
                  verticalAlign="top"
                  wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
                />
                <Bar
                  dataKey="price"
                  fill="#0098ff"
                  legendType="circle"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <Empty
          header="No Analytics Found"
          subheader="Please wait while we fetch necessary data to show"
        />
      )}
    </>
  );
};

export default Analytics;
