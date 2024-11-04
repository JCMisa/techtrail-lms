/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchInput = ({
  setValue,
}: {
  setValue: (courseTitle: string) => void;
}) => {
  const [courseTitle, setCourseTitle] = useState<string>("");

  return (
    <div className="flex items-center px-4 bg-dark rounded-lg ring-[1.5px] ring-primary-100">
      <Search
        className="w-5 h-5 cursor-pointer"
        onClick={() => {
          setValue(courseTitle);
        }}
      />
      <Input
        onChange={(e) => setCourseTitle(e.target.value)}
        placeholder="Search..."
        type="text"
        className="border-none bg-transparent w-[300px] p-2 outline-none"
      />
    </div>
  );
};

export default SearchInput;
