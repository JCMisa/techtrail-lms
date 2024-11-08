/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Banner from "@/components/custom/banner";
import { db } from "@/utils/db";
import { attachment, chapter, purchase } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq, gt } from "drizzle-orm";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import VideoPlayer from "./_components/VideoPlayer";

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

  const getChapterInfo = async () => {
    try {
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
      if (purchaseRecord?.length > 0) {
        setPurchaseRecordState(purchaseRecord);

        const attachmentsRecord = await db
          .select()
          .from(attachment)
          .where(eq(attachment.courseId, params?.courseId));

        if (attachmentsRecord) {
          setCourseAttachments(attachmentsRecord); // array of attachments under a specific course
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

  // is locked if the chapter record is not free and if the user does not purchase to course
  const isLocked: boolean =
    chapterRecordState?.isFree == false && purchaseRecordState?.length == 0;

  return (
    <div>
      {isLocked && (
        <Banner
          variant={"warning"}
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params?.chapterId}
            title={chapterRecordState?.title}
            courseId={params?.courseId}
            nextChapterId={nextChapter?.chapterId}
            playbackUrl={chapterVideoUrl}
            isLocked={isLocked}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
