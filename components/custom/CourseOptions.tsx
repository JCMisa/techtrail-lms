/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Play } from "lucide-react";
import Link from "next/link";

const CourseOptions = ({ icon, courseId }: { icon: any; courseId: string }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{icon}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href={`/viewCourse/courses/${courseId}`}
              className="flex items-center gap-1"
            >
              <Play className="w-3 h-3" /> Start
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Link
              href={`/dashboard/details/${courseId}`}
              className="flex items-center gap-1"
            >
              <Eye className="w-3 h-3" /> Details
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CourseOptions;
