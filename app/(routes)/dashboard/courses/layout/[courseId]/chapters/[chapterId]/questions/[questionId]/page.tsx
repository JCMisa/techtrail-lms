/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { chapterQuestion } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export type ChapterQuestionType = {
  id: number;
  courseId: string;
  chapterId: string;
  questionId: string;
  question: string;
  answer: string;
  explanation: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
};

const ChapterQuestionEdit = ({
  params,
}: {
  params: { courseId: string; chapterId: string; questionId: string };
}) => {
  const router = useRouter();

  const [question, setQuestion] = useState<ChapterQuestionType>();
  const [questionTitle, setQuestionTitle] = useState<string>(
    question?.question as string
  );
  const [questionAnswer, setQuestionAnswer] = useState<string>(
    question?.answer as string
  );
  const [answerExplanation, setAnswerExplanation] = useState<string>(
    question?.explanation as string
  );
  const [optionOne, setOptionOne] = useState<string>(
    question?.optionOne as string
  );
  const [optionTwo, setOptionTwo] = useState<string>(
    question?.optionTwo as string
  );
  const [optionThree, setOptionThree] = useState<string>(
    question?.optionThree as string
  );
  const [optionFour, setOptionFour] = useState<string>(
    question?.optionFour as string
  );

  const getQuestion = async () => {
    try {
      const result = await db
        .select()
        .from(chapterQuestion)
        .where(
          and(
            eq(chapterQuestion.courseId, params?.courseId),
            eq(chapterQuestion.chapterId, params?.chapterId),
            eq(chapterQuestion.questionId, params?.questionId)
          )
        );

      if (result?.length > 0) {
        setQuestion(result[0] as ChapterQuestionType);
      }
    } catch {
      toast(
        <p className="font-bold text-red-500 text-sm">
          Internal error occured while fetching the question
        </p>
      );
    }
  };

  useEffect(() => {
    getQuestion();
  }, [params]);

  const handleEdit = async () => {
    try {
      const result = await db
        .update(chapterQuestion)
        .set({
          question: questionTitle,
          answer: questionAnswer,
          explanation: answerExplanation,
          optionOne: optionOne,
          optionTwo: optionTwo,
          optionThree: optionThree,
          optionFour: optionFour,
        })
        .where(
          and(
            eq(chapterQuestion.courseId, params?.courseId),
            eq(chapterQuestion.chapterId, params?.chapterId),
            eq(chapterQuestion.questionId, params?.questionId)
          )
        );
      if (result) {
        toast(
          <p className="font-bold text-green-500 text-sm">
            Question updated successfully
          </p>
        );
        // Redirect to the course details page
        router.replace(
          `/dashboard/courses/layout/${params?.courseId}/chapters/${params?.chapterId}`
        );
      }
    } catch {
      toast(
        <p className="font-bold text-red-500 text-sm">
          Internal error occured while updating the question
        </p>
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-dark-100 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-lg font-bold">Questionnaire</h1>
        <div className="mb-4 mt-4">
          <div className="flex flex-col gap-4">
            <div>
              <Label>Question</Label>
              <Input
                defaultValue={question && (question?.question as string)}
                onChange={(e) =>
                  setQuestionTitle(
                    e.target.value
                      ? e.target.value
                      : (question?.question as string)
                  )
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-full">
                <Label>Option 1</Label>
                <Input
                  defaultValue={question && (question?.optionOne as string)}
                  onChange={(e) =>
                    setOptionOne(
                      e.target.value
                        ? e.target.value
                        : (question?.optionOne as string)
                    )
                  }
                />
              </div>
              <div className="w-full">
                <Label>Option 2</Label>
                <Input
                  defaultValue={question && (question?.optionTwo as string)}
                  onChange={(e) =>
                    setOptionTwo(
                      e.target.value
                        ? e.target.value
                        : (question?.optionTwo as string)
                    )
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-full">
                <Label>Option 3</Label>
                <Input
                  defaultValue={question && (question?.optionThree as string)}
                  onChange={(e) =>
                    setOptionThree(
                      e.target.value
                        ? e.target.value
                        : (question?.optionThree as string)
                    )
                  }
                />
              </div>
              <div className="w-full">
                <Label>Option 4</Label>
                <Input
                  defaultValue={question && (question?.optionFour as string)}
                  onChange={(e) =>
                    setOptionFour(
                      e.target.value
                        ? e.target.value
                        : (question?.optionFour as string)
                    )
                  }
                />
              </div>
            </div>

            <div>
              <Label>Correct Answer</Label>
              <Input
                defaultValue={question && (question?.answer as string)}
                onChange={(e) =>
                  setQuestionAnswer(
                    e.target.value
                      ? e.target.value
                      : (question?.answer as string)
                  )
                }
              />
            </div>

            <div>
              <Label>Answer Explanation</Label>
              <Textarea
                defaultValue={question && (question?.explanation as string)}
                onChange={(e) =>
                  setAnswerExplanation(
                    e.target.value
                      ? e.target.value
                      : (question?.explanation as string)
                  )
                }
              />
            </div>
          </div>
        </div>
        <Button className="mt-4" onClick={() => handleEdit()}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ChapterQuestionEdit;
