/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const CourseList = ({ items }: { items: any }) => {
  return (
    <div>
      {items &&
        items?.map((item: any) => <div key={item?.id}>{item?.title}</div>)}
    </div>
  );
};

export default CourseList;
