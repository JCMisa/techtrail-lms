/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  items: any[];
}

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 card-scroll">
      {items &&
        items.map((item) => (
          <CategoryItem key={item?.id} label={item?.name} value={item?.id} />
        ))}
    </div>
  );
};

export default Categories;
