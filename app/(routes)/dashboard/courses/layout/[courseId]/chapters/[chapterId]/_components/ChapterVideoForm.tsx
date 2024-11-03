/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FileUpload from "@/app/(routes)/dashboard/courses/_components/FileUpload";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chapter } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import ReactPlayer from "react-player";

interface ChapterVideoFormProps {
  initialData: any;
  courseId: string;
  chapterId: string;
  refreshData: () => void;
}

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
  refreshData,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (video: any) => {
    try {
      const result = await db
        .update(chapter)
        .set({
          videoUrl: video?.videoUrl,
        })
        .where(
          and(eq(chapter?.courseId, courseId), eq(chapter.chapterId, chapterId))
        );
      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Chapter video url updated successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating video url
        </p>
      );
    }
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>
          Chapter Video{" "}
          <span className="text-sm italic text-gray-500">(optional)</span>
        </p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && "Cancel"}
          {!isEditing && !initialData?.videoUrl && (
            <>
              <PlusCircle className="h-4 w-5 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData?.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-dark-100 rounded-md">
            <VideoIcon className="h-10 w-10 text-light-100" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <ReactPlayer
              url={initialData?.videoUrl}
              playing={true}
              loop={true}
              muted={true}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload the chapter&apos;s video
          </div>
        </div>
      )}
      {initialData?.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2 italic">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
