/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUser } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import CourseMobileSidebar from "./CourseMobileSidebar";

const CourseNavbar = ({
  course,
  progressCount,
}: {
  course: any;
  progressCount: number;
}) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="p-4 border-b h-full flex items-center justify-between bg-dark shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <div className="flex items-center gap-x-4">
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <LogOut className="w-4 h-4" />
          <p className="text-xs">Back</p>
        </div>
        <Image
          src={user?.imageUrl as string}
          alt="profile"
          width={1000}
          height={1000}
          className="w-7 h-7 rounded-full"
        />
      </div>
    </div>
  );
};

export default CourseNavbar;
