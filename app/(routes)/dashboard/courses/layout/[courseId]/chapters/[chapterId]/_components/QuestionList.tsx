/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Dot, Pencil } from "lucide-react";

interface QuestionListProps {
  items: [] | any;
  onEdit: (questionId: string) => void;
}

const QuestionList = ({ items, onEdit }: QuestionListProps) => {
  const [questions, setQuestions] = useState(items);

  useEffect(() => {
    setQuestions(items);
  }, [items]);

  return (
    <div>
      {questions &&
        questions.map((question: any) => (
          <div
            key={question?.id}
            className="flex items-center gap-x-2 bg-dark-100 border-dark border text-light-100 rounded-md mb-4 text-sm"
          >
            <div className="py-1 border-r border-r-dark hover:bg-dark-100 rounded-l-md transition">
              <Dot className="h-10 w-10 text-primary" />
            </div>
            {question?.question}
            <div className="ml-auto pr-2 flex items-center gap-x-2">
              <Pencil
                onClick={() => onEdit(question?.questionId)}
                className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuestionList;
