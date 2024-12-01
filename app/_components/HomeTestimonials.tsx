import React from "react";
import TestimonialCard from "./TestimonialCard";

const HomeTestimonials = () => {
  return (
    <section className="bg-dark body-font" id="testimonial">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-medium title-font text-white mb-12 text-center">
          Testimonials
        </h1>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 md:w-1/2 w-full">
            <TestimonialCard
              message="Synth chartreuse iPhone lomo cray raw denim brunch everyday
                carry neutra before they sold out fixie 90's microdosing.
                Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard
                pabst authentic iceland."
              name="Holden Caulfield"
              company="UI DEVELOPER"
            />
          </div>
          <div className="p-4 md:w-1/2 w-full">
            <TestimonialCard
              message="Synth chartreuse iPhone lomo cray raw denim brunch everyday
                carry neutra before they sold out fixie 90's microdosing.
                Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard
                pabst authentic iceland."
              name="John Carlo"
              company="WEB DEVELOPER"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
