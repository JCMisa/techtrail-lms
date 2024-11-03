import { db } from "@/utils/db";
import { category } from "@/utils/schema";
import { asc } from "drizzle-orm";
import React from "react";
import Categories from "./_components/Categories";
import SearchInput from "../_components/SearchInput";

const BrowseCourses = async () => {
  const categories = await db
    .select()
    .from(category)
    .orderBy(asc(category.name));

  return (
    <>
      <div className="px-6 pt-6 md:mb-0 block w-full md:w-[300px]">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </>
  );
};

export default BrowseCourses;
