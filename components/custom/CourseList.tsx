/* eslint-disable @typescript-eslint/no-explicit-any */
import Empty from "@/app/_components/Empty";
import React from "react";
import CourseCard from "./CourseCard";

const CourseList = ({ items }: { items: any }) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items &&
          items?.map((item: any) => (
            <CourseCard
              key={item?.id}
              courseId={item?.courseId}
              title={item?.title}
              imageUrl={
                item?.imageUrl ? item?.imageUrl : "/empty-img-placeholder.jpg"
              }
              price={item?.price}
              categoryId={item?.categoryId}
            />
          ))}
      </div>
      {items && items?.length === 0 && (
        <Empty
          header="No Courses Found"
          subheader="Please wait while we retrieve related information from the database"
        />
      )}
    </div>
  );
};

export default CourseList;
