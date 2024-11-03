/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChapterListProps {
  items: [] | any;
  onReorder: (updateData: { id: number; position: number }[]) => void;
  onEdit: (chapterId: string) => void;
}

const ChapterList = ({ items, onReorder, onEdit }: ChapterListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter: any) => ({
      id: chapter?.id,
      position: items.findIndex((item: any) => item?.id === chapter?.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters &&
              chapters.map((chapter: any, index: number) => (
                <Draggable
                  key={chapter?.id}
                  draggableId={chapter?.id?.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-x-2 bg-dark-100 border-dark border text-light-100 rounded-md mb-4 text-sm",
                        chapter?.isPublished &&
                          "bg-dark border-dark-100 text-light"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          "px-2 py-3 border-r border-r-dark hover:bg-dark-100 rounded-l-md transition cursor-grab",
                          chapter?.isPublished &&
                            "border-r-primary-100 hover:bg-dark"
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className="h-5 w-5" />
                      </div>
                      {chapter?.title}
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {chapter?.isFree && <Badge>Free</Badge>}
                        <Badge
                          className={cn(
                            "bg-dark",
                            chapter?.isPublished &&
                              "bg-emerald-600 hover:bg-emerald-700"
                          )}
                        >
                          {chapter?.isPublished ? "Published" : "Draft"}
                        </Badge>

                        <Pencil
                          onClick={() => onEdit(chapter?.chapterId)}
                          className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChapterList;
