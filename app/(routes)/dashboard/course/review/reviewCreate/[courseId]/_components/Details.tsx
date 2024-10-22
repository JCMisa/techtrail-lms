/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { BookOpen, ChartBar, Timer } from "lucide-react";

const Details = ({
  reviewer,
  showTitle = true,
}: {
  reviewer: any;
  showTitle?: boolean;
}) => {
  return (
    <div className="mt-3 no-print">
      {showTitle && <h2 className="font-bold text-xl">Details</h2>}
      <div className="md:flex md:flex-col grid grid-cols-3 gap-3 mt-2">
        <div className="flex justify-center items-center gap-2 bg-dark rounded-lg p-3 overflow-x-hidden card-scroll">
          <ChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Difficulty Level</h2>
            <h2 className="font-medium text-lg">{reviewer?.level}</h2>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 bg-dark rounded-lg p-3 overflow-x-hidden card-scroll">
          <Timer className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Duration</h2>
            <h2 className="font-medium text-lg">{reviewer?.duration}</h2>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 bg-dark rounded-lg p-3 overflow-x-hidden card-scroll">
          <BookOpen className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">No. of Chapters</h2>
            <h2 className="font-medium text-lg">{reviewer?.chapters}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
