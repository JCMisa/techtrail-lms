/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "@/components/custom/Spinner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Brain, Pencil } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface DescriptionFormProps {
  initialData: {
    title: string;
    description: string;
  };
  courseId: string;
  refreshData: () => void;
}

const DescriptionForm = ({
  initialData,
  courseId,
  refreshData,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [aiOutputDescription, setAiOutputDescription] = useState<string | null>(
    ""
  );

  const toggleEdit = () => setIsEditing((current) => !current);

  const generateAiDescription = async () => {
    try {
      setLoading(true);

      const PROMPT = `based on the ${initialData?.title}, generate a object with property named aiDescription with a value of five to ten sentences course description that will explain the course in a professional manner, make it in JSON format.`;
      const result = await chatSession.sendMessage(PROMPT);
      if (result) {
        setAiOutputDescription(
          JSON.parse(result?.response?.text())?.aiDescription
        );
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while generating AI response
        </p>
      );
      console.log("ai response error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await db
        .update(course)
        .set({
          description: updatedDescription,
        })
        .where(eq(course?.courseId, courseId));

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Course description updated successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating description
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>Course Description</p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            "text-xs mt-2",
            !initialData?.description && "text-slate-500 italic"
          )}
        >
          {initialData?.description
            ? initialData?.description
            : "No description"}
        </p>
      ) : (
        <div className="space-y-4 mt-4 flex flex-col">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-between">
              <p className="text-xs text-gray-500">Course description</p>
              <Button onClick={() => generateAiDescription()}>
                {loading ? (
                  <Spinner />
                ) : (
                  <div className="flex items-center gap-2">
                    <Brain />
                    <p className="text-sm">Ask AI</p>
                  </div>
                )}
              </Button>
            </div>
            <Textarea
              placeholder="Provide more information about your course"
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            {aiOutputDescription ? (
              <p className="text-xs text-gray-500">{aiOutputDescription}</p>
            ) : (
              <p className="text-xs text-gray-500">
                Copy and paste the AI generated description that will be shown
                here after clicking the Ask AI button
              </p>
            )}
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              disabled={updatedDescription === ""}
              onClick={() => onSubmit()}
            >
              {loading ? <Spinner /> : "Save"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionForm;
