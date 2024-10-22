/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CourseContent from "./CourseContent";

const CourseComponent = ({ chapter }: { chapter: any }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* content */}
      <div className="flex flex-col gap-3 w- -mt-16">
        <CourseContent content={chapter} />
      </div>
    </div>
  );
};

export default CourseComponent;
