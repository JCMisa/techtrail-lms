import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-full bg-dark-100 border border-dark-100 rounded-lg shadow-md animate-pulse">
      <div>
        <div className="rounded-t-lg w-full min-h-[200px] max-h-[200px] bg-dark animate-pulse"></div>
      </div>
      <div className="p-5 flex flex-col gap-5">
        <div>
          <div className="w-full min-h-10 max-h-10 bg-dark animate-pulse"></div>
        </div>
        <div className="min-w-32 max-w-3min-w-32 min-h-32 max-h-52 bg-dark animate-pulse"></div>
        <div className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-dark rounded-lg min-w-32 max-w-32 min-h-10 max-h-10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
