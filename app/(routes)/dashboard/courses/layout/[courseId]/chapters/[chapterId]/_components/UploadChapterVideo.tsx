/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { db } from "@/utils/db";
import { storage } from "@/utils/FirebaseConfig";
import { chapter, course } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UploadChapterVideo = ({
  courseId,
  chapterId,
  refreshData,
  setIsEditing,
}: {
  courseId?: string;
  chapterId?: string;
  refreshData: () => void;
  setIsEditing: (value: boolean) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [courseRecord, setCourseRecord] = useState<any>();

  const getCourseByCourseId = async () => {
    const result = await db
      .select()
      .from(course)
      .where(eq(course.courseId, courseId as string));
    if (result) {
      setCourseRecord(result[0]);
    }
  };

  useEffect(() => {
    courseId && getCourseByCourseId();
  }, [courseId]);

  // select image from files and upload to to firebase storage
  const onFileSelected = async (e: any) => {
    const file = e.target.files[0]; // get the selected image file
    setSelectedFile(URL.createObjectURL(file)); // create a blob of the image file

    const fileName = Date.now() + ".mp4"; // generate the name of the file
    const storageRef = ref(storage, "tech-trail/" + fileName); // pass the filename to the specific path in the storage
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("upload file complete"); // this will store the image bytes to the firebase storage specified location
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          // this will get the viewable url of the img
          try {
            const result = await db
              .update(chapter)
              .set({
                videoUrl: downloadUrl,
              })
              .where(
                and(
                  eq(chapter.courseId, courseId as string),
                  eq(chapter.chapterId, chapterId as string)
                )
              );
            if (result) {
              toast(
                <p className="text-sm font-bold text-green-500">
                  Chapter video updated successfully
                </p>
              );
              refreshData();
              setIsEditing(false);
            }
          } catch (error) {
            toast(
              <p className="text-sm font-bold text-red-500">
                Internal error occured while updating the chapter video
              </p>
            );
          }
        });
      });
  };

  return (
    <input
      className="w-full"
      name="file"
      type="file"
      id="upload-image"
      accept=".mp4,.mov,.avi,.wmv,.flv,.mkv,.webm,.m4v,.ogv"
      onChange={onFileSelected}
    />
  );
};

export default UploadChapterVideo;
