/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import React from "react";
import {
  FcCommandLine,
  FcReddit,
  FcOrgUnit,
  FcTemplate,
  FcLock,
  FcPieChart,
} from "react-icons/fc";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const CategoryItem = ({ label, value }: { label: string; value: any }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId == value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-primary-100 transition",
        isSelected && "shadow-lg border-none bg-primary-100 text-light-100"
      )}
    >
      {label === "Programming" && <FcCommandLine />}{" "}
      {label === "Artificial Intelligence" && <FcReddit />}
      {label === "Networking" && <FcOrgUnit />}
      {label === "Web Development" && <FcTemplate />}
      {label === "Cybersecurity" && <FcLock />}
      {label === "Data Analytics" && <FcPieChart />}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;
