/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableOfContents } from "lucide-react";
import React from "react";

const CourseChapterList = ({ course }: { course: any }) => {
  return (
    <div className="mt-3">
      <h2 className="font-bold text-xl">Chapters</h2>
      <div className="mt-2 flex flex-col gap-2">
        {course &&
          JSON.parse(course?.chaptersArray)?.map(
            (chapter: any, index: number) => (
              <div
                key={index}
                className="border p-5 rounded-lg shadow-md bg-dark flex items-center justify-between gap-5"
              >
                <div className="flex gap-5 items-center">
                  <h2 className="bg-primary flex-none h-10 w-10 text-white rounded-full text-center items-center justify-center p-2">
                    {index + 1}
                  </h2>
                  <div>
                    <h2 className="font-medium text-lg">
                      {chapter?.chapterName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {chapter?.explanation}
                    </p>
                  </div>
                </div>
                <TableOfContents className="text-4xl text-gray-500 flex-none" />
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default CourseChapterList;
