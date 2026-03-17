import React from "react";
import { Link } from "react-router-dom"; // routing er jonno use kora bhalo

const CallToActionSection = () => {
  return (
    <div className="relative overflow-hidden my-20 mx-4 md:mx-20 rounded-3xl bg-gradient-to-r from-green-900 to-green-700 py-16 px-6 shadow-2xl">
      
      {/* Background Decorative Circles - Design sundor korar jonno */}
      <div className="absolute top-0 left-0 -ml-20 -mt-20 h-64 w-64 rounded-full bg-green-500 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Badge - Professional look er jonno */}
        <span className="mb-4 inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-medium tracking-wider text-green-100 uppercase">
          Transform Your Living Space
        </span>

        {/* Headline */}
        <h2 className="max-w-3xl text-center text-3xl md:text-5xl font-extrabold leading-tight text-white mb-6">
          Experience the Future of <span className="text-green-300">Smart Living</span> Today
        </h2>

        {/* Description */}
        <p className="max-w-xl text-center text-lg text-green-50/80 mb-10 leading-relaxed">
          Manage all your devices seamlessly from one intuitive app. 
          SmartHomeDecor brings elegance and intelligence to your doorstep.
        </p>

        {/* Button & Links */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            to="/dashboard"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-green-800 font-bold transition-all hover:bg-green-50 active:scale-95 shadow-lg"
          >
            Get Started Now
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transition-transform group-hover:translate-x-1" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <button className="text-white font-medium hover:underline decoration-green-300 underline-offset-4">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;