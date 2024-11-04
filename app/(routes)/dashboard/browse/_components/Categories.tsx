/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  items: any[];
  selectCategory: (categoryId: any) => void;
}

const Categories = ({ items, selectCategory }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 card-scroll">
      {items &&
        items.map((item) => (
          <CategoryItem
            key={item?.id}
            label={item?.name}
            value={item?.id}
            selectCategory={selectCategory}
          />
        ))}
    </div>
  );
};

export default Categories;
