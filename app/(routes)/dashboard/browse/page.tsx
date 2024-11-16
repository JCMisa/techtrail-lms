/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { db } from "@/utils/db";
import { category, course } from "@/utils/schema";
import { and, asc, desc, eq, ilike, or } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Categories from "./_components/Categories";
import SearchInput from "../_components/SearchInput";
import CourseList from "@/components/custom/CourseList";
import { toast } from "sonner";

const BrowseCourses = () => {
  const [categories, setCategories] = useState<any>();
  const [selectedCategory, setSelectedCategory] = useState<any>(4);
  const [typedCourseTitle, setTypedCourseTitle] = useState<string>("");
  const [courses, setCourses] = useState<any>();

  const getCategories = async () => {
    try {
      const result = await db
        .select()
        .from(category)
        .orderBy(asc(category.name));

      if (result) {
        setCategories(result);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the categories
        </p>
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCourses = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(
          and(
            eq(course.isPublished, true),
            or(
              eq(course.categoryId, selectedCategory),
              ilike(course.title, typedCourseTitle as string)
            )
          )
        )
        .orderBy(desc(course.id));

      if (result) {
        setCourses(result);
      }
    } catch (error) {
      console.log("browse fetch courses error: ", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [selectedCategory, typedCourseTitle]);

  return (
    <>
      <div className="px-6 pt-6 md:mb-0 block w-full md:w-[300px]">
        <SearchInput
          setValue={(courseTitle) => setTypedCourseTitle(courseTitle)}
        />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
          selectCategory={(categoryId) => setSelectedCategory(categoryId)}
        />
        <CourseList items={courses?.length > 0 ? courses : []} />
      </div>
    </>
  );
};

export default BrowseCourses;
