/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactMarkdown from "react-markdown";

const CourseContent = ({ content }: { content: any }) => {
  return (
    <div className="bg-dark-100 p-5 py-10 rounded-md w-full h-full overflow-auto card-scroll">
      <h2 className="font-medium text-2xl">{content?.chapterName}</h2>
      <ReactMarkdown className="text-sm text-gray-400">
        {content?.explanation}
      </ReactMarkdown>
      {content?.codeExample && (
        <div className="p-4 bg-dark text-white rounded-md mt-3 overflow-auto card-scroll">
          <pre>
            <code>{content?.codeExample}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
