import React from "react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

const colorByVariant = {
  default: "text-gray-400",
  success: "text-emerald-600",
};

const CourseProgress = ({
  variant,
  value,
}: {
  variant: "default" | "success";
  value: number;
}) => {
  return (
    <div>
      <Progress className="h-2 bg-dark-100" value={value} variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-light text-xs",
          colorByVariant[variant || "default"]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};

export default CourseProgress;
