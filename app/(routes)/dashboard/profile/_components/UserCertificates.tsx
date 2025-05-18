/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Empty from "@/app/_components/Empty";
import { db } from "@/utils/db";
import { certificate } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CertificateCard from "./CertificateCard";

const UserCertificates = ({ user }: { user: any }) => {
  const [userCertificates, setUserCertificates] = useState<any>([]);

  const getUserCertificates = async () => {
    const result = await db
      .select()
      .from(certificate)
      .where(eq(certificate.userId, user?.id as string));

    if (result?.length > 0) {
      setUserCertificates(result);
    }
  };

  useEffect(() => {
    user && getUserCertificates();
  }, [user]);

  return (
    <>
      <h2 className="text-lg font-bold">Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full mt-3">
        {userCertificates?.length > 0 ? (
          userCertificates?.map((certificate: any) => (
            <div key={certificate?.id}>
              <CertificateCard certificate={certificate} />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full">
            <Empty
              header="No Reviewer Found"
              subheader="Please wait while we fetch necessary data to show"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UserCertificates;
