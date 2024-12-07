/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
// import { db } from "@/utils/db";
// import { course } from "@/utils/schema";
// import { eq } from "drizzle-orm";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
// import { toast } from "sonner";
// import FileUpload from "../../../_components/FileUpload";
import UploadCourseImage from "./UploadCourseImage";

interface ImageFormProps {
  initialData: any;
  courseId: string;
  refreshData: () => void;
}

const ImageForm = ({ initialData, courseId, refreshData }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  // const onSubmit = async (image: any) => {
  //   try {
  //     const result = await db
  //       .update(course)
  //       .set({
  //         imageUrl: image?.imageUrl,
  //       })
  //       .where(eq(course?.courseId, courseId));

  //     if (result) {
  //       toast(
  //         <p className="font-bold text-sm text-green-500">
  //           Course image updated successfully
  //         </p>
  //       );
  //       refreshData();
  //       setIsEditing(false);
  //     }
  //   } catch {
  //     toast(
  //       <p className="font-bold text-sm text-red-500">
  //         Internal error occured while updating image
  //       </p>
  //     );
  //   }
  // };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>
          Course Image{" "}
          <span className="text-sm text-gray-500 italic">(optional)</span>
        </p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && "Cancel"}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className="h-4 w-5 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData?.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-dark-100 rounded-md">
            <ImageIcon className="h-10 w-10 text-light-100" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="upload"
              fill
              className="object-cover rounded-md"
              src={initialData?.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          {/* <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          /> */}
          <UploadCourseImage
            courseId={courseId}
            refreshData={() => refreshData()}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
