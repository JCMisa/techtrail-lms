import React from "react";

interface PROPS {
  params: {
    chapterId: string;
  };
}

const ChapterEdit = ({ params }: PROPS) => {
  return <div>{params?.chapterId}</div>;
};

export default ChapterEdit;
