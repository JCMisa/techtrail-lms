/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { findUserByEmail } from "@/services/UserService";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Unauthorized from "../../../_components/Unauthorized";
import LoadingDialog from "@/app/_components/LoadingDialog";
import { db } from "@/utils/db";
import { attachment, category, course } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import Empty from "@/app/_components/Empty";
import { IconBadge } from "@/components/custom/icon-badge";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListCheck,
} from "lucide-react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import AttachmentForm from "./_components/AttachmentForm";

interface PROPS {
  params: {
    courseId: string;
  };
}

const CourseLayoutPage = ({ params }: PROPS) => {
  const { user } = useUser();

  const [loggedInUser, setLoggedInUser] = useState<{
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    imageUrl: string;
    createdAt: string;
    role: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [courseModel, setCourseModel] = useState<any>();
  const [categories, setCategories] = useState<[] | any>();
  const [attachmentModel, setAttachmentModel] = useState<any>([]);

  const getUserByEmail = async () => {
    setLoading(true);
    try {
      const result = await findUserByEmail(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result) {
        setLoggedInUser(result?.data);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching the user
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getUserByEmail();
  }, [user]);

  const getCourseById = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(course)
        .where(
          and(
            eq(course?.courseId, params?.courseId),
            eq(
              course?.userEmail,
              user?.primaryEmailAddress?.emailAddress as string
            )
          )
        );

      if (result) {
        setCourseModel(result[0]);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fething the course
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getCourseById();
  }, [user, params]);

  const getAllCourseAttachments = async () => {
    try {
      const result = await db
        .select()
        .from(attachment)
        .where(
          and(
            eq(attachment?.courseId, params?.courseId),
            eq(
              attachment?.updatedBy,
              user?.primaryEmailAddress?.emailAddress as string
            )
          )
        );

      if (result) {
        setAttachmentModel(result);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fething the course attachments
        </p>
      );
      console.log(error);
    }
  };

  useEffect(() => {
    user && getAllCourseAttachments();
  }, [user, params]);

  const getCourseCategories = async () => {
    try {
      const result = await db.select().from(category);
      if (result) {
        setCategories(result);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching all categories
        </p>
      );
    }
  };

  useEffect(() => {
    getCourseCategories();
  }, []);

  const requiredFields = [
    courseModel && courseModel?.title,
    courseModel && courseModel?.description,
    courseModel && courseModel?.imageUrl,
    courseModel && courseModel?.price,
    courseModel && courseModel?.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div>
      {loggedInUser?.role === "admin" || loggedInUser?.role === "teacher" ? (
        <div className="p-6">
          {course ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-2xl font-medium">Course Layout</h1>
                  <span className="text-sm text-gray-500">
                    Complete all fields {completionText}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={LayoutDashboard} />
                    <h2 className="text-xl">Customize your course</h2>
                  </div>

                  <TitleForm
                    initialData={courseModel}
                    courseId={courseModel?.courseId}
                    refreshData={() => getCourseById()}
                  />

                  <DescriptionForm
                    initialData={courseModel}
                    courseId={courseModel?.courseId}
                    refreshData={() => getCourseById()}
                  />

                  <ImageForm
                    initialData={courseModel}
                    courseId={courseModel?.courseId}
                    refreshData={() => getCourseById()}
                  />

                  <CategoryForm
                    initialData={courseModel}
                    courseId={courseModel?.courseId}
                    refreshData={() => getCourseById()}
                    options={categories && categories}
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-x-2">
                      <IconBadge icon={ListCheck} />
                      <h2 className="text-xl">Course Chapters</h2>
                    </div>
                    <div>todo: chapters</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-x-2">
                      <IconBadge icon={CircleDollarSign} />
                      <h2 className="text-xl">Sell your course</h2>
                    </div>
                    <PriceForm
                      initialData={courseModel}
                      courseId={courseModel?.courseId}
                      refreshData={() => getCourseById()}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-x-2">
                      <IconBadge icon={File} />
                      <h2 className="text-xl">Resources & Attachments</h2>
                    </div>
                    <AttachmentForm
                      initialData={attachmentModel}
                      courseId={courseModel?.courseId}
                      refreshData={() => getAllCourseAttachments()}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Empty
              header="No Course Found"
              subheader="Please wait while we check for courses in our database"
            />
          )}
        </div>
      ) : (
        <Unauthorized />
      )}
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CourseLayoutPage;
