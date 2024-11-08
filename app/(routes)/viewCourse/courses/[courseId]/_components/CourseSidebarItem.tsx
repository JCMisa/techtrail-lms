import { cn } from "@/lib/utils";
import { Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface PROPS {
  chapterId: string;
  label: string;
  courseId: string;
  isLocked: boolean;
  progressCount: number;
}

const CourseSidebarItem = ({
  chapterId,
  label,
  courseId,
  isLocked,
  progressCount,
}: PROPS) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : PlayCircle;
  const isActive = pathname?.includes(chapterId);

  const onClick = () => {
    router.push(`/viewCourse/courses/${courseId}/chapters/${chapterId}`);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-gray-400 text-sm font-[500] pl-6 transition-all hover:text-light-100 hover:bg-dark-100",
        isActive &&
          "text-light bg-primary-100 hover:bg-primary hover:text-light-100"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          className={cn("w-4 h-4 text-gray-400", isActive && "text-light")}
        />
        {label ? label : ""}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      ></div>
    </button>
  );
};

export default CourseSidebarItem;
