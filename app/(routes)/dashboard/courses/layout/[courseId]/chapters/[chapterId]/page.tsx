/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import Unauthorized from "@/app/(routes)/dashboard/_components/Unauthorized";
import Empty from "@/app/_components/Empty";
import LoadingDialog from "@/app/_components/LoadingDialog";
import { IconBadge } from "@/components/custom/icon-badge";
import { findUserByEmail } from "@/services/UserService";
import { db } from "@/utils/db";
import { chapter } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";

interface PROPS {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterEdit = ({ params }: PROPS) => {
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
  const [chapterRecord, setChapterRecord] = useState<any>();

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

  // get chapter record based on the params?.chapterId
  const getChapter = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(chapter)
        .where(
          and(
            eq(chapter.courseId, params?.courseId),
            eq(chapter.chapterId, params?.chapterId),
            eq(
              chapter.createdBy,
              user?.primaryEmailAddress?.emailAddress as string
            )
          )
        );

      if (result) {
        setChapterRecord(result[0]);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the chapter
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getChapter();
  }, [user, params]);

  // get all required fields to be filled inside a single chapter
  const requiredFields = [
    chapterRecord && chapterRecord?.title,
    chapterRecord && chapterRecord?.description,
    chapterRecord && chapterRecord?.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      {loggedInUser?.role === "admin" || loggedInUser?.role === "teacher" ? (
        !chapterRecord ? (
          <Empty
            header={`No Chapter with chapterId: ${params?.chapterId} found`}
            subheader="Please wait while we retrieve necessary data from the database"
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="w-full">
                <Link
                  href={`/dashboard/courses/layout/${params?.courseId}`}
                  className="flex items-center text-sm hover:opacity-75 transition mb-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to course layout
                </Link>

                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Chapter Creation</h1>
                    <span className="text-sm text-gray-500">
                      Complete all fields {completionText}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={LayoutDashboard} />
                    <h2 className="text-xl">Customize your chapter</h2>
                  </div>
                  <ChapterTitleForm
                    initialData={chapterRecord}
                    courseId={params?.courseId}
                    chapterId={params?.chapterId}
                    refreshData={() => getChapter()}
                  />
                  <ChapterDescriptionForm
                    initialData={chapterRecord}
                    courseId={params?.courseId}
                    chapterId={params?.chapterId}
                    refreshData={() => getChapter()}
                  />
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <Unauthorized />
      )}
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default ChapterEdit;
