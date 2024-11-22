/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import CertificateComponent from "../../viewCourse/courses/[courseId]/chapters/[chapterId]/_components/CertificateComponent";
import { db } from "@/utils/db";
import { certificate } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const CertificatePage = ({ params }: { params: { id: number } }) => {
  const [userCertificate, setUserCertificate] = useState<any>();

  const getUserCertificate = async () => {
    try {
      const result = await db
        .select()
        .from(certificate)
        .where(eq(certificate.id, params?.id));

      if (result?.length > 0) {
        setUserCertificate(result[0]);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching user certificate
        </p>
      );
    }
  };

  useEffect(() => {
    getUserCertificate();
  }, [params?.id]);

  return (
    <div className="p-7">
      <CertificateComponent userCertificate={userCertificate} />
    </div>
  );
};

export default CertificatePage;
