/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Banner from "@/components/custom/banner";
import { db } from "@/utils/db";
import {
  attachment,
  chapter,
  chapterQuestion,
  course,
  purchase,
  userProgress,
} from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq, gt } from "drizzle-orm";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/custom/preview";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/CourseProgressButton";
import { ChapterQuestionType } from "@/app/(routes)/dashboard/courses/layout/[courseId]/chapters/[chapterId]/questions/[questionId]/page";
import QuestionCard from "./_components/QuestionCard";

const ChapterIdPage = ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const { user } = useUser();

  const [courseAttachments, setCourseAttachments] = useState<[] | any>([]);
  const [chapterVideoUrl, setChapterVideoUrl] = useState<string>("");
  const [nextChapter, setNextChapter] = useState<any>();
  const [chapterRecordState, setChapterRecordState] = useState<any>();
  const [purchaseRecordState, setPurchaseRecordState] = useState<[] | any>([]);
  const [courseRecordState, setCourseRecordState] = useState<any>();
  const [userProgressRecord, setUserProgressRecord] = useState<any>();
  const [chapterQuestions, setChapterQuestions] = useState<
    ChapterQuestionType[]
  >([]);

  const getChapterInfo = async () => {
    try {
      // get the course based on courseId
      const courseRecord = await db
        .select()
        .from(course)
        .where(eq(course.courseId, params?.courseId));

      if (courseRecord) {
        setCourseRecordState(courseRecord[0]);
      }

      // check if the course is purchased
      const purchaseRecord = await db
        .select()
        .from(purchase)
        .where(
          and(
            eq(purchase.userId, user?.id as string),
            eq(purchase.courseId, params?.courseId)
          )
        );

      // if a userId is in the purchase schema, meaning this course is purchased, then show to attachments of the course
      if (
        courseRecord[0]?.price === null ||
        Number(courseRecord[0]?.price) === 0 ||
        purchaseRecord?.length > 0
      ) {
        setPurchaseRecordState(purchaseRecord);

        const attachmentsRecord = await db
          .select()
          .from(attachment)
          .where(eq(attachment.courseId, params?.courseId));

        if (attachmentsRecord) {
          setCourseAttachments(attachmentsRecord); // array of attachments under a specific course
        }

        const questionsList = await db
          .select()
          .from(chapterQuestion)
          .where(
            and(
              eq(chapterQuestion.courseId, params?.courseId),
              eq(chapterQuestion.chapterId, params?.chapterId)
            )
          );

        if (questionsList) {
          setChapterQuestions(questionsList as ChapterQuestionType[]);
        }
      }

      // get the chapter infromation based on params?.chapterId and if it is published
      const chapterRecord = await db
        .select()
        .from(chapter)
        .where(
          and(
            eq(chapter.chapterId, params?.chapterId),
            eq(chapter.isPublished, true)
          )
        );

      if (chapterRecord) {
        setChapterRecordState(chapterRecord[0]);
      }

      // if the chapter is free and the course is bought by the user, then show the video and the nextChapters
      if (chapterRecord[0]?.isFree || purchaseRecord?.length > 0) {
        setChapterVideoUrl(chapterRecord[0]?.videoUrl as string);

        // get the next chapters
        const nextChaptersRecord = await db
          .select()
          .from(chapter)
          .where(
            and(
              eq(chapter.courseId, params?.courseId),
              eq(chapter.isPublished, true),
              gt(chapter.position, chapterRecord[0]?.position as number)
            )
          );

        if (nextChaptersRecord) {
          setNextChapter(nextChaptersRecord[0]);
        }
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching chapter info
        </p>
      );
    }
  };

  useEffect(() => {
    user && getChapterInfo();
  }, [user, params?.courseId, params?.chapterId]);

  const getUserProgress = async () => {
    try {
      const result = await db
        .select()
        .from(userProgress)
        .where(
          and(
            eq(userProgress.userId, user?.id as string),
            eq(userProgress.chapterId, params?.chapterId)
          )
        );

      if (result) {
        setUserProgressRecord(result[0]);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching user progress
        </p>
      );
    }
  };

  useEffect(() => {
    user && getUserProgress();
  }, [user, params?.chapterId]);

  // is locked if the chapter record is not free and if the user does not purchase to course
  const isLocked: boolean =
    chapterRecordState?.isFree == false && purchaseRecordState?.length == 0;

  return (
    <div>
      {isLocked && (
        <Banner
          variant={"warning"}
          label="You need to enroll to this course to watch this chapter."
        />
      )}
      {userProgressRecord?.isCompleted && (
        <Banner
          variant={"success"}
          label="You already completed this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer playbackUrl={chapterVideoUrl} isLocked={isLocked} />
        </div>
        <Separator />
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapterRecordState?.title}
            </h2>
            {!chapterRecordState?.isFree ? (
              purchaseRecordState?.length > 0 ? (
                <CourseProgressButton
                  courseId={params?.courseId}
                  chapterId={params?.chapterId}
                  nextChapterId={nextChapter?.chapterId}
                  isCompleted={!!userProgressRecord?.isCompleted}
                  refreshData={() => getUserProgress()}
                />
              ) : (
                <CourseEnrollButton
                  courseId={params?.courseId}
                  price={courseRecordState?.price}
                  courseName={courseRecordState?.title}
                />
              )
            ) : (
              <CourseProgressButton
                courseId={params?.courseId}
                chapterId={params?.chapterId}
                nextChapterId={nextChapter?.chapterId}
                isCompleted={!!userProgressRecord?.isCompleted}
                refreshData={() => getUserProgress()}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapterRecordState?.description} />
          </div>
          {purchaseRecordState?.length > 0 ? (
            <>
              <Separator />
              <div className="p-4 flex flex-col gap-2">
                {courseAttachments?.map((attachment: any) => (
                  <a
                    href={attachment?.url}
                    key={attachment?.id}
                    target="_blank"
                    className="flex gap-2 items-center p-3 w-full bg-dark-100 border text-light rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1 text-xs">{attachment?.name}</p>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <Banner
              variant={"warning"}
              label="Buy this course to access course attachments if any."
            />
          )}

          {purchaseRecordState?.length > 0 ? (
            <>
              <Separator />
              <div className="p-4 flex flex-col gap-5">
                {chapterQuestions?.map((question: ChapterQuestionType) => (
                  <QuestionCard key={question?.id} question={question} />
                ))}
              </div>
            </>
          ) : (
            <Banner
              variant={"warning"}
              label="Buy this course to access chapter questions if any."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
