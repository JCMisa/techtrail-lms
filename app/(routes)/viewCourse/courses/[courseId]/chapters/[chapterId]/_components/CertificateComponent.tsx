/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

const CertificateComponent = ({
  userCertificate,
}: {
  userCertificate: any;
}) => {
  return (
    <>
      <div className="bg-white p-8 max-w-4xl mx-auto" id="certificate-section">
        <div className="border-8 border-double border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">TechTrail</h1>
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              Logo
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">
            Certificate of Completion
          </h2>

          <p className="text-center text-lg text-gray-600 mb-8">
            This is to certify that
          </p>

          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {userCertificate?.userEmail}
          </h3>

          <p className="text-center text-lg text-gray-600 mb-8">
            has successfully completed the course
          </p>

          <h4 className="text-2xl font-bold text-center text-gray-800 mb-12">
            {userCertificate?.courseTitle}
          </h4>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">
                {userCertificate?.creatorEmail}
              </p>
              <p className="text-gray-600">Course Instructor</p>
              <div className="mt-4 w-40 h-16 mx-auto bg-gray-100 flex items-end justify-center p-2">
                <div className="text-gray-400 italic">Signature</div>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-gray-600 mb-2">
                <CalendarIcon className="w-5 h-5 mr-2" />
                <span>Issue Date</span>
              </div>
              <p className="text-lg font-semibold text-gray-700">
                {userCertificate?.createdAt}
              </p>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>Verify this certificate at techtrail.com/verify</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-5 items-center my-10">
        <Button onClick={() => window.print()} className="w-full">
          Print
        </Button>

        <RWebShare
          data={{
            text: "Hello everyone, this is my course completion certificate, open URL to view",
            url: `${process.env.NEXT_PUBLIC_APP_URL}/viewCertificate/${userCertificate?.id}`,
            title: `${userCertificate?.courseTitle}'s Certificate`,
          }}
          onClick={() =>
            toast(
              <p className="text-xs text-green-500 font-bold">
                Sharing you certificate
              </p>
            )
          }
        >
          <Button className="w-full bg-white hover:bg-light-100 transition-all text-dark-100">
            Share
          </Button>
        </RWebShare>
      </div>
    </>
  );
};

export default CertificateComponent;
