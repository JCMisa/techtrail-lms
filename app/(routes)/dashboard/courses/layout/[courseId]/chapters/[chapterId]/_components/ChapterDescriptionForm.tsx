/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "@/components/custom/editor";
import { Preview } from "@/components/custom/preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { chapter } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { Brain, LoaderCircle, Pencil } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface ChapterDescriptionFormProps {
  initialData: {
    title: string;
    description: string;
  };
  courseRecord: any;
  courseId: string;
  chapterId: string;
  refreshData: () => void;
}

const ChapterDescriptionForm = ({
  initialData,
  courseRecord,
  courseId,
  chapterId,
  refreshData,
}: ChapterDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [aiOutputChapterDescription, setAiOutputChapterDescription] = useState<
    string | null
  >("");

  const toggleEdit = () => setIsEditing((current) => !current);

  const generateAiChapterDescription = async () => {
    try {
      setLoading(true);

      const PROMPT = `based on the chapter title named: ${initialData?.title} under the course named: ${courseRecord?.title}, generate a object with property named aiChapterDescription with a value of course chapter description in string format that will explain the chapter in a professional manner, add list of ideas if possible, make it in JSON format.`;
      const result = await chatSession.sendMessage(PROMPT);
      if (result) {
        setAiOutputChapterDescription(
          JSON.parse(result?.response?.text())?.aiChapterDescription
        );
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while generate AI response
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await db
        .update(chapter)
        .set({
          description: updatedDescription,
        })
        .where(
          and(eq(chapter?.courseId, courseId), eq(chapter.chapterId, chapterId))
        );

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Chapter description updated successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating chapter description
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuillChange = (value: string) => {
    setUpdatedDescription(value);
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>Chapter Description</p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Chapter Description
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <div
          className={cn(
            "text-xs mt-2",
            !initialData?.description && "text-slate-500 italic"
          )}
        >
          {initialData?.description ? (
            <Preview value={initialData?.description} />
          ) : (
            "No description"
          )}
        </div>
      ) : (
        <div className="space-y-4 mt-4 flex flex-col">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-between">
              <p className="text-xs text-gray-500">Chapter description</p>
              <Button onClick={() => generateAiChapterDescription()}>
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    <Brain />
                    <p className="text-sm">Ask AI</p>
                  </div>
                )}
              </Button>
            </div>
            <Editor onChange={handleQuillChange} value={updatedDescription} />
            {aiOutputChapterDescription ? (
              <p className="text-xs text-gray-500">
                {aiOutputChapterDescription}
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                Copy and paste the AI generated chapter description that will be
                shown here after clicking the Ask AI button
              </p>
            )}
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              disabled={updatedDescription === ""}
              onClick={() => onSubmit()}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
