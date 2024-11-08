/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./CourseSidebar";

const CourseMobileSidebar = ({
  course,
  progressCount,
}: {
  course: any;
  progressCount: number;
}) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-dark w-72">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
