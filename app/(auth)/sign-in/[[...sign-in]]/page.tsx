import Spinner from "@/components/custom/Spinner";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const SignInPage = () => {
  return (
    <>
      <section className="bg-dark">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-dark lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              alt="image"
              src="/auth-bg.webp"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
              width={1000}
              height={1000}
              loading="lazy"
              placeholder="blur"
              blurDataURL="/blur.jpg"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="text-white" href="#">
                <Image
                  src={"/techtrail-logo.svg"}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="h-8 sm:h-10"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/blur.jpg"
                />
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome Back to TechTrail 👋🏻
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Welcome back to TechTrail! Log in to continue your learning
                journey and access your personalized courses, progress, and
                community.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden mb-5">
                <a
                  className="inline-flex size-16 items-center justify-center rounded-full text-light-100 sm:size-20 bg-dark"
                  href="#"
                >
                  <Image
                    src={"/techtrail-logo.svg"}
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="h-8 sm:h-10"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/blur.jpg"
                  />
                </a>

                <h1 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl text-white">
                  Welcome Back to TechTrail 👋🏻
                </h1>

                <p className="mt-4 leading-relaxed text-gray-400">
                  Welcome back to TechTrail! Log in to continue your learning
                  journey and access your personalized courses, progress, and
                  community.
                </p>
              </div>

              <div className="flex items-center justify-center">
                <ClerkLoaded>
                  <SignIn />
                </ClerkLoaded>
                <ClerkLoading>
                  <Spinner />
                </ClerkLoading>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default SignInPage;
