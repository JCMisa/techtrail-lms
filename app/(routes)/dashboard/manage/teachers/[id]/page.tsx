/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { findUserById, updateUserRole } from "@/services/UserService";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Empty from "@/app/_components/Empty";
import Link from "next/link";
import DeleteAction from "./_components/DeleteAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export type UserType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  imageUrl: string;
  createdAt: string;
  role: string;
};
const TeacherDetails = ({ params }: { params: { id: number } }) => {
  const [teacher, setTeacher] = useState<UserType>();
  const [userCourses, setUserCourses] = useState<any>();

  const getTeacherById = async () => {
    try {
      const result = await findUserById(params?.id);
      if (result) {
        setTeacher(result?.data);

        const userCourseList = await db
          .select()
          .from(course)
          .where(eq(course.userEmail, result?.data?.email as string));

        if (userCourseList) {
          console.log("courses created by teacher: ", userCourseList);
          setUserCourses(userCourseList);
        }
      }
    } catch (error) {
      console.log("get teacher by id error: ", error);
    }
  };

  useEffect(() => {
    getTeacherById();
  }, [params]);

  const handleUpdateRole = async (value: string) => {
    try {
      const result = await updateUserRole(params?.id, value);
      if (result) {
        toast(
          <p className="text-sm font-bold text-green-500">
            User role updated successfully
          </p>
        );
        getTeacherById(); // Refresh the teacher details after role update.
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating the user role
        </p>
      );
    }
  };

  return (
    <div className="p-6 flex items-center justify-center py-20">
      <div className="card-profile p-5 relative overflow-auto card-scroll">
        <DeleteAction teacherId={params?.id} teacherInfo={teacher} />
        <div className="profileImage-profile">
          {teacher && (
            <Image
              src={
                teacher?.imageUrl
                  ? teacher?.imageUrl
                  : "/empty-img-placeholder.jpg"
              }
              alt="profile"
              width={1000}
              height={1000}
              className="rounded-full"
            />
          )}
        </div>

        <div className="my-5 w-full">
          <Select
            onValueChange={(value) => handleUpdateRole(value)}
            defaultValue={teacher?.role}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="user">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="textContainer-profile">
          <p className="name-profile text-4xl font-bold">
            {teacher?.firstname} {teacher?.lastname}
          </p>
          <p className="profile-profile">{teacher?.email}</p>
        </div>
        <div className="flex flex-col gap-5 my-20">
          <h2 className="text-2xl font-bold">Created Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {userCourses?.length > 0 ? (
              userCourses?.map((item: any) => (
                <Link
                  href={`/viewCourse/courses/${item?.courseId}`}
                  key={item?.id}
                >
                  <div className="group hover:shadow-md transition overflow-hidden rounded-lg p-3 h-full">
                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                      {item?.imageUrl ? (
                        <Image
                          fill
                          className="object-cover"
                          alt="courseImage"
                          src={item?.imageUrl && (item?.imageUrl as string)}
                        />
                      ) : (
                        <Image
                          fill
                          className="object-cover"
                          alt="courseImage"
                          src={"/empty-img-placeholder.jpg"}
                        />
                      )}
                    </div>
                    <div className="flex flex-col p-2 pb-5 bg-dark rounded-b-md">
                      <div className="text-lg md:text-base font-medium group-hover:text-light-100 transition line-clamp-1">
                        {item?.title}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <Empty
                header="No Courses Found"
                subheader="This user doesnt have courses yet"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
