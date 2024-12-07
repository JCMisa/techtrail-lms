/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CourseCard from "@/components/custom/CourseCard";
import { findUserById } from "@/services/UserService";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TeacherCourses = ({ teacherId }: { teacherId: number }) => {
  const [teacherCourses, setTeacherCourses] = useState<any>();

  const getTeacher = async () => {
    try {
      const result = await findUserById(teacherId);
      if (result?.data) {
        const teacherCoursesList = await db
          .select()
          .from(course)
          .where(eq(course.userEmail, result?.data?.email as string));

        if (teacherCoursesList?.length > 0) {
          setTeacherCourses(teacherCoursesList);
        }
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the teacher
        </p>
      );
    }
  };

  useEffect(() => {
    getTeacher();
  }, [teacherId]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Created Courses</h2>
      {teacherCourses?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {teacherCourses?.map((teacherCourse: any) => (
            <CourseCard
              key={teacherCourse?.id}
              courseId={teacherCourse?.courseId as string}
              title={teacherCourse?.title as string}
              imageUrl={teacherCourse?.imageUrl as string}
              price={Number(teacherCourse?.price)}
              categoryId={Number(teacherCourse?.categoryId)}
            />
          ))}
        </div>
      ) : (
        <p>No courses found for this teacher.</p>
      )}
    </div>
  );
};

export default TeacherCourses;
