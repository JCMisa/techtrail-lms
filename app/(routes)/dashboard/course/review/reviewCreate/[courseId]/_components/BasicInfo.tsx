/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutGrid } from "lucide-react";
import React from "react";
import EditCourseInfo from "./EditCourseInfo";
import UploadImage from "./UploadImage";

const BasicInfo = ({
  reviewer,
  refreshData,
  edit = true,
}: {
  reviewer: any;
  refreshData: () => void;
  edit?: boolean;
}) => {
  return (
    <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">
          {reviewer?.courseName}
          {edit && (
            <EditCourseInfo course={reviewer} refreshData={refreshData} />
          )}
        </h2>
        <div className="flex items-center gap-2 text-primary-100">
          <LayoutGrid className="w-5 h-5" />
          <p className="text-sm">{reviewer?.category}</p>
        </div>
        <p className="text-gray-400 text-xs mt-2">{reviewer?.description}</p>
      </div>
      <div>
        <UploadImage course={reviewer} edit={edit} />
      </div>
    </div>
  );
};

export default BasicInfo;
