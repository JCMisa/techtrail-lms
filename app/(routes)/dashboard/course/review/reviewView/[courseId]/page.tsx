import React from "react";

interface PROPS {
  params: {
    courseId: string;
  };
}

const ViewReviewer = ({ params }: PROPS) => {
  return <div>{params?.courseId}</div>;
};

export default ViewReviewer;
