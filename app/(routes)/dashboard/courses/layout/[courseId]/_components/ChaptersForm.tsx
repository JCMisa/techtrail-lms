/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { db } from "@/utils/db";
import { chapter } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { Loader2, LoaderCircle, PlusCircle } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
import uuid4 from "uuid4";
import ChapterList from "./ChapterList";
import { useRouter } from "next/navigation";

interface ChaptersFormProps {
  initialData: any;
  courseId: string;
  refreshData: () => void;
}

const ChaptersForm = ({
  initialData,
  courseId,
  refreshData,
}: ChaptersFormProps) => {
  const { user } = useUser();
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [chapterTitle, setChapterTitle] = useState<any>();
  const [loading, setLoading] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const data = await db
        .select()
        .from(chapter)
        .where(eq(chapter.courseId, courseId))
        .orderBy(desc(chapter.position));
      const newPosition = data?.length > 0 ? data?.length + 1 : 1;

      const chapterId = uuid4();
      const result = await db.insert(chapter).values({
        title: chapterTitle,
        courseId: courseId,
        position: newPosition,
        createdAt: moment().format("MM-DD-YYYY"),
        updatedAt: moment().format("MM-DD-YYYY"),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        chapterId: chapterId,
      });
      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Course chapter created successfully
          </p>
        );
        refreshData();
        toggleCreating();
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating chapter
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const onReorder = async (updateData: any) => {
    try {
      setIsUpdating(true);
      for (const item of updateData) {
        const result = await db
          .update(chapter)
          .set({
            position: item?.position,
          })
          .where(eq(chapter.id, item?.id));

        if (result) {
          toast(
            <p className="font-bold- text-sm text-green-500">
              Chapter reordered
            </p>
          );
        }
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while reordering chapters
        </p>
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = async (chapterId: string) => {
    router.push(`/dashboard/courses/layout/${courseId}/chapters/${chapterId}`);
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4 relative">
      {isUpdating && (
        <div className="absolute h-full w-full bg-dark/60 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-light-100" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        <p>Course Chapters</p>
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <div className="space-y-4 mt-4 flex flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">Chapter description</p>
            <Input
              placeholder="e.g. Introduction to the course"
              onChange={(e) => setChapterTitle(e.target.value)}
            />
          </div>
          <Button onClick={() => onSubmit()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Create"}
          </Button>
        </div>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.length && "text-slate-500 italic"
          )}
        >
          {!initialData?.length && "No Chapters"}
          <ChapterList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChaptersForm;
