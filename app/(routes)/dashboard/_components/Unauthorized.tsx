import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Unauthorized = () => {
  const router = useRouter();

  return (
    <section className="flex items-center h-full p-16 bg-dark-100 text-light-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
            <span className="sr-only">Error</span>401
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Access denied</p>
          <p className="mt-4 mb-8 text-gray-400">
            You don&apos;t have permission to view this content. Please ensure
            you&apos;tre logged in with the correct credentials or contact our
            support team for assistance.
          </p>
          <Button
            className="px-8 py-3 font-semibold rounded"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized;
