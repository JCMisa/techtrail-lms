import { ChapterQuestionType } from "@/app/(routes)/dashboard/courses/layout/[courseId]/chapters/[chapterId]/questions/[questionId]/page";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const QuestionCard = ({ question }: { question: ChapterQuestionType }) => {
  const options = [
    question?.optionOne,
    question?.optionTwo,
    question?.optionThree,
    question?.optionFour,
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState<boolean>(false);
  const [showWrong, setShowWrong] = useState<boolean>(false);

  const handleClick = (index: number, option: string) => {
    setActiveIndex(index); // sets the active index to the index of the clicked button to highlight the seleted one
    if (option === question?.answer) {
      setShowCorrect(true);
      setShowWrong(false);
    } else {
      setShowWrong(true);
      setShowCorrect(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-dark-100 p-5 rounded-lg">
      <h1 className="text-lg font-bold">{question?.question}</h1>
      <div className="my-4 flex flex-col gap-2">
        {options?.map((option, index: number) => (
          <Button
            key={option || index}
            onClick={() => handleClick(index, option)}
            className={`bg-dark hover:bg-dark-200 ${
              activeIndex === index && "bg-primary hover:bg-primary-100"
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
      <p className={`${showCorrect ? "block" : "hidden"} text-emerald-500`}>
        Congratulations! your answer is correct 🎉
      </p>
      <div className={`${showWrong ? "block" : "hidden"}`}>
        <p className="text-red-500">Incorrect Answer</p>
        <span className="text-xs indent-1 text-gray-400">
          {question?.explanation}
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
