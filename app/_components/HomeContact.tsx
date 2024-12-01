import React from "react";

const HomeContact = () => {
  return (
    <section className="bg-dark body-font relative" id="contact">
      <h1 className="text-3xl flex items-center justify-center">
        Get in Touch with TechTrail
      </h1>
      <div className="container px-5 pb-24 pt-10 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-dark-100 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            title="map"
            className="absolute inset-0"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d61920.01202484455!2d121.32024320000001!3d14.0771328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1731565204033!5m2!1sen!2sphhttps://maps.app.goo.gl/rMTmsKcAFokNHKFY9"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.16)" }}
          ></iframe>
          <div className="bg-dark-100 relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">San Pablo City, Laguna, Philippines</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-primary leading-relaxed">
                johncarlomisa399@gmail.com
              </a>
              <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">09071816666</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-white text-lg mb-1 font-medium title-font">
            Contact Us
          </h2>
          <p className="leading-relaxed mb-5">
            Have questions or need assistance? Our team is here to help! Whether
            you&apos;re looking for course details, support, or just want to
            learn more about our offerings, don&apos;t hesitate to reach out.
            We&apos;re excited to connect and help you take the next step in
            your tech journey!
          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-dark-100 rounded border border-dark-200 focus:border-primary focus:ring-2 focus:ring-primary-100 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-dark-100 rounded border border-dark-200 focus:border-primary focus:ring-2 focus:ring-primary-100 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-400"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-dark-100 rounded border border-dark-200 focus:border-primary focus:ring-2 focus:ring-primary-100 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-100 rounded text-lg">
            Button
          </button>
          <p className="text-xs text-gray-400 text-opacity-90 mt-3">
            Any information you provided will remain private
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
