/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateBasicInfo } from "@/services/AiOutputService";
import Spinner from "@/components/custom/Spinner";

const EditCourseInfo = ({
  course,
  refreshData,
}: {
  course: any;
  refreshData: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    course && setName(course?.courseName);
    course && setDescription(course?.description);
  }, [course]);

  const onUpdateHandler = async () => {
    setLoading(true);
    try {
      course.courseName = name;
      course.description = description;

      const result = await updateBasicInfo(
        course?.id,
        name as string,
        description as string
      );
      if (result) {
        toast(
          <p className="text-sm font-bold text-green-500">
            Reviewer basic information updated successfully
          </p>
        );
        refreshData();
      }

      //todo: update the courseName and description
    } catch (error) {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while updating course info
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <SquarePen />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Reviewer Title and Description</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label>Reviewer Title</label>
              <Input
                defaultValue={course?.courseName}
                onChange={(e) =>
                  setName(e.target.value ? e.target?.value : course?.courseName)
                }
              />
            </div>
            <div className="mt-2">
              <label>Description</label>
              <Textarea
                defaultValue={course?.description}
                onChange={(e) =>
                  setDescription(
                    e.target.value ? e.target?.value : course?.description
                  )
                }
                className="card-scroll h-32"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={() => onUpdateHandler()}>
              {loading ? <Spinner /> : "Update"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseInfo;
