import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Brain,
  Calendar,
  Coins,
  Lock,
  Notebook,
  Telescope,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const HomeFeatures = () => {
  return (
    <section className="body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-3xl">Discover What Sets Us Apart</h1>
          <p className="mb-20 text-sm text-gray-400 text-center">
            TechTrail is designed to bring you the best in technology learning
            with an AI-powered experience. <br /> From easy access to courses to
            interactive reviews and seamless transactions, here&apos;s how
            we&apos;re shaping the future of tech education.
          </p>
        </div>
        {/* first feature */}
        <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
          <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-primary bg-dark-100 flex-shrink-0">
            <Brain className="sm:w-16 sm:h-16 w-10 h-10" />
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-white text-lg title-font mb-2 font-bold">
              AI-Enhanced Learning Experience
            </h2>
            <p className="leading-relaxed text-base text-gray-400">
              TechTrail uses AI-assisted tools to deliver a personalized and
              interactive learning experience. Powered by the latest in AI,
              including Gemini API, we help you review topics with curated
              content, code snippets, and simplified YouTube videos tailored to
              your learning style.
            </p>
            <a className="mt-3 text-primary-100 inline-flex items-center">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* second feature */}
        <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-white text-lg title-font font-bold mb-2">
              Clerk Authentication for Secure Access
            </h2>
            <p className="leading-relaxed text-base text-gray-400">
              Our platform integrates Clerk Auth to offer a seamless and secure
              login experience. You can access your personalized dashboard, save
              progress, and explore courses with peace of mind, knowing your
              data is in safe hands.
            </p>
            <a className="mt-3 text-primary-100 inline-flex items-center">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full text-primary bg-dark-100 flex-shrink-0">
            <Lock className="sm:w-16 sm:h-16 w-10 h-10" />
          </div>
        </div>

        {/* third feature */}
        <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
          <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-primary bg-dark-100 flex-shrink-0">
            <BookOpen className="sm:w-16 sm:h-16 w-10 h-10" />
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-white text-lg title-font mb-2 font-bold">
              Manage Courses in Your Personal Dashboard
            </h2>
            <p className="leading-relaxed text-base text-gray-400">
              With your own Course Management Dashboard, you can track your
              learning progress, manage your enrolled courses, and keep all your
              learning materials organized. Stay on top of your tech journey
              with ease and efficiency.
            </p>
            <a className="mt-3 text-primary-100 inline-flex items-center">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* fourth feature */}
        <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-white text-lg title-font font-bold mb-2">
              Explore More Courses, Anytime
            </h2>
            <p className="leading-relaxed text-base text-gray-400">
              TechTrail offers a wide variety of technology courses. Explore
              courses in programming, AI, cybersecurity, web development, and
              much more. Whether you&apos;re a beginner or an expert,
              there&apos;s something for everyone to dive into and level up
              their skills.
            </p>
            <a className="mt-3 text-primary-100 inline-flex items-center">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full text-primary bg-dark-100 flex-shrink-0">
            <Telescope className="sm:w-16 sm:h-16 w-10 h-10" />
          </div>
        </div>

        {/* fifth feature */}
        <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
          <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-primary bg-dark-100 flex-shrink-0">
            <Coins className="sm:w-16 sm:h-16 w-10 h-10" />
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-white text-lg title-font mb-2 font-bold">
              Buy Courses Powered by Stripe
            </h2>
            <p className="leading-relaxed text-base text-gray-400">
              When you find the perfect course, purchasing it is simple and
              secure. TechTrail integrates Stripe for smooth, trusted
              transactions, so you can easily buy courses generated by our
              talented teachers and start learning without any hassle.
            </p>
            <a className="mt-3 text-primary-100 inline-flex items-center">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* sixth feature */}
        <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-white text-lg title-font font-bold mb-2">
              AI-Powered Review Creation
            </h2>
            <p className="leading-relaxed text-base text-gray-400">
              TechTrail helps you dive deeper into your topics through
              AI-powered reviews. Using Gemini API, we provide you with
              insightful YouTube videos and relevant code snippets to further
              clarify and enhance your understanding. You&apos;ll be able to get
              more context around what you&apos;re learning, straight from the
              best resources.
            </p>
            <a className="mt-3 text-primary-100 inline-flex items-center">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full text-primary bg-dark-100 flex-shrink-0">
            <Notebook className="sm:w-16 sm:h-16 w-10 h-10" />
          </div>
        </div>

        {/* seventh feature */}
        <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
          <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-primary bg-dark-100 flex-shrink-0">
            <Calendar className="sm:w-16 sm:h-16 w-10 h-10" />
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-white text-lg title-font mb-2 font-bold">
              Stay Updated with Events and Announcements
            </h2>
            <p className="leading-relaxed text-base text-gray-400">
              Never miss an update! Our platform provides you with the latest
              events and announcements from the admin. Whether it&apos;s a new
              course launch, upcoming webinar, or important community news,
              you&apos;ll always be in the loop.
            </p>
            <a className="mt-3 text-primary-100 inline-flex items-center">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <Button className="flex mx-auto mt-20 min-w-32 max-w-32">
          <Link href={"#top"}>Let&apos;s Go!</Link>
        </Button>
      </div>
    </section>
  );
};

export default HomeFeatures;
