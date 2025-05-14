/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import Image from "next/image";
import { format } from "date-fns";

const CertificateComponent = ({
  userCertificate,
}: {
  userCertificate: any;
}) => {
  return (
    <>
      <div className="bg-white p-8 max-w-4xl mx-auto" id="certificate-section">
        <div
          className="border-8 border-double border-yellow-500 p-8"
          id="certificate-section-inside"
        >
          <div className="flex items-center justify-between">
            <Image
              src={"/gold-award.png"}
              alt="cert-icon"
              width={1000}
              height={1000}
              className="w-20 h-20"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/blur.jpg"
            />
            <div className="flex items-center flex-col">
              <Image
                src={"/techtrail-logo.svg"}
                alt="logo"
                width={1000}
                height={1000}
                className="w-10 h-10"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/blur.jpg"
              />
              <h2 className="font-bold text-primary text-xl">TechTrail</h2>
            </div>
          </div>

          <div className="text-center mt-10 flex flex-col gap-10">
            <h1 className="font-bold text-4xl text-dark">
              {userCertificate?.courseTitle}
            </h1>
            <p className="text-sm text-yellow-600">ISSUED TO:</p>
            <h2 className="text-primary font-bold text-2xl overflow-hidden">
              {userCertificate?.userEmail}
            </h2>
            <p className="text-sm text-yellow-600">ISSUED BY:</p>
            <h2 className="text-primary font-bold text-2xl overflow-hidden">
              {userCertificate?.creatorEmail}
            </h2>
            <p className="text-md text-dark font-bold">
              Hopefully this achievement will be the first step towards bigger
              success. <br />
              Keep trying and give your best.
            </p>
            <p className="text-gray-500 text-md">
              Issued on{" "}
              {userCertificate?.createdAt
                ? format(new Date(userCertificate.createdAt), "MMMM dd, yyyy")
                : format(new Date(), "MMMM dd, yyyy")}{" "}
              | Issued by: TechTrail <br />
              Verified by: https://www.techtrail.com/
            </p>
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
