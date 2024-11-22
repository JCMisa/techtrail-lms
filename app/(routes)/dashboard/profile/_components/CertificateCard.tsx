/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import Link from "next/link";
import React from "react";

const CertificateCard = ({ certificate }: { certificate: any }) => {
  return (
    <div className="flex flex-col gap-5 bg-dark p-5 rounded-lg">
      <div className="flex items-start justify-between gap-5">
        <h2 className="text-sm line-clamp-1 font-bold">
          {certificate?.courseTitle}
        </h2>
        <p className="text-xs text-gray-400">
          {moment(certificate?.createdAt).format("MMM/DD/YYYY")}
        </p>
      </div>
      <div className="flex items-end justify-between gap-5">
        <div className="flex flex-col items-start">
          <h2 className="text-sm font-bold">Created By</h2>
          <p className="text-xs text-gray-400">{certificate?.creatorEmail}</p>
        </div>
        <Link
          href={`/viewCertificate/${certificate?.id}`}
          className="text-xs cursor-pointer underline"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default CertificateCard;
