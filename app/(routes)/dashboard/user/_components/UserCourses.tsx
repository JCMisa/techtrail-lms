import React from "react";
import UserCourseCard from "./UserCourseCard";

const UserCourses = () => {
  return (
    <div>
      {[1, 2, 3].map((course, index) => (
        <UserCourseCard key={index} course={course} />
      ))}
    </div>
  );
};

export default UserCourses;
