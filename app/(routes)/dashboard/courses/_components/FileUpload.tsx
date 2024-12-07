/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res[0]?.url);
      }}
      onUploadError={(error: Error) => {
        toast(
          <p className="font-bold text-xs text-red-500">Something went wrong</p>
        );
        console.log("upload error: ", error.message);
      }}
    />
  );
};

export default FileUpload;
