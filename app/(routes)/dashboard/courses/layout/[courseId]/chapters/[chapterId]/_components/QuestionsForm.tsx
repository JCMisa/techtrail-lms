/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { db } from "@/utils/db";
import { chapterQuestion } from "@/utils/schema";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation";
import Spinner from "@/components/custom/Spinner";
import { Textarea } from "@/components/ui/textarea";
import QuestionList from "./QuestionList";
import { useUser } from "@clerk/nextjs";

interface QuestionsFormProps {
  initialData: any;
  courseId: string;
  chapterId: string;
  refreshData: () => void;
}

const QuestionsForm = ({
  initialData,
  courseId,
  chapterId,
  refreshData,
}: QuestionsFormProps) => {
  const { user } = useUser();
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [questionTitle, setQuestionTitle] = useState<any>();
  const [questionAnswer, setQuestionAnswer] = useState<any>();
  const [answerExplanation, setAnswerExplanation] = useState<any>();
  const [optionOne, setOptionOne] = useState<any>();
  const [optionTwo, setOptionTwo] = useState<any>();
  const [optionThree, setOptionThree] = useState<any>();
  const [optionFour, setOptionFour] = useState<any>();
  const [loading, setLoading] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const questionId = uuid4();
      const result = await db.insert(chapterQuestion).values({
        courseId: courseId,
        chapterId: chapterId,
        questionId: questionId,
        question: questionTitle,
        answer: questionAnswer,
        explanation: answerExplanation,
        optionOne: optionOne,
        optionTwo: optionTwo,
        optionThree: optionThree,
        optionFour: optionFour,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Chapter question created successfully
          </p>
        );
        refreshData();
        toggleCreating();
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating question
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const onEdit = async (questionId: string) => {
    router.push(
      `/dashboard/courses/layout/${courseId}/chapters/${chapterId}/questions/${questionId}`
    );
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4 relative">
      <div className="font-medium flex items-center justify-between">
        <p>Chapter Questions</p>
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add a question
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <div className="space-y-4 mt-4 flex flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-xs text-gray-500">Question</p>
                <Input
                  placeholder="e.g. What is ...?"
                  onChange={(e) => setQuestionTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p className="text-xs text-gray-500">Answer</p>
                <Input onChange={(e) => setQuestionAnswer(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-500">Answer Explanation</p>
              <Textarea
                onChange={(e) => setAnswerExplanation(e.target.value)}
              />
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-xs text-gray-500">Option 1</p>
                <Input onChange={(e) => setOptionOne(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p className="text-xs text-gray-500">Option 2</p>
                <Input onChange={(e) => setOptionTwo(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-xs text-gray-500">Option 3</p>
                <Input onChange={(e) => setOptionThree(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p className="text-xs text-gray-500">Option 4</p>
                <Input onChange={(e) => setOptionFour(e.target.value)} />
              </div>
            </div>
          </div>
          <Button onClick={() => onSubmit()}>
            {loading ? <Spinner /> : "Create"}
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
          <QuestionList onEdit={onEdit} items={initialData || []} />
        </div>
      )}
    </div>
  );
};

export default QuestionsForm;
