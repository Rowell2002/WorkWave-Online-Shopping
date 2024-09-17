import React from 'react';
import briefcaseImg from '../assets/briefcase.png';
import DesignImg from '../assets/Design.jpg';
import DevelopmentImg from '../assets/Development.jpg';
import MarketingImg from '../assets/Marketing.jpg';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300 text-gray-900">
      {/* Hero Section with Promo Section */}
      <section className="flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-center py-40 relative">
        <div className="flex items-center space-x-4 animate-bounce relative z-10">
          {/* Suitcase Image */}
          <img src={briefcaseImg} alt="Briefcase" className="w-40 h-40 transform rotate-6" />
          <h1 className="text-7xl md:text-9xl font-extrabold text-white">WorkWave</h1>
        </div>
        <p className="text-xl text-white max-w-xl mt-6 relative z-10">
          Step into the world of opportunity and experience freelancing like never before.
        </p>
        <button className="mt-8 px-8 py-4 bg-white text-yellow-500 font-bold rounded-full hover:bg-yellow-100 transition duration-300 shadow-lg relative z-10">
          Get Started
        </button>

        {/* Promo Section */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-gray-800 text-center py-3 w-full">
          <h2 className="text-xl font-semibold">
            Hurry up! Become our first Client and get <span className="text-yellow-600">30% OFF</span> from your first deal!
          </h2>
        </div>
      </section>

      {/* Feature Section */}
      <section className="flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-yellow-200 to-yellow-100">
        <h2 className="text-4xl font-bold mb-8 text-yellow-500">A whole world of freelance talent at your fingertips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <img src={DesignImg} alt="Design" className="w-full h-40 object-cover rounded-md" />
            <p className="text-lg mt-4">Design</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <img src={DevelopmentImg} alt="Development" className="w-full h-40 object-cover rounded-md" />
            <p className="text-lg mt-4">Development</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <img src={MarketingImg} alt="Marketing" className="w-full h-40 object-cover rounded-md" />
            <p className="text-lg mt-4">Marketing</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-b from-yellow-100 to-white py-16 px-4 text-center">
        <h2 className="text-4xl font-bold text-yellow-500 mb-6">Why Choose WorkWave?</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          At WorkWave, we connect clients with top talent to bring projects to life. Efficiency, trust, and quality are at the heart of everything we do.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-yellow-100 rounded-lg shadow-lg hover:bg-yellow-200 transition duration-300">
            <p className="text-xl font-bold">Efficient Hiring</p>
            <p className="text-sm mt-2">Quick and easy hiring process.</p>
          </div>
          <div className="p-6 bg-yellow-100 rounded-lg shadow-lg hover:bg-yellow-200 transition duration-300">
            <p className="text-xl font-bold">Trusted Freelancers</p>
            <p className="text-sm mt-2">Verified and skilled professionals.</p>
          </div>
          <div className="p-6 bg-yellow-100 rounded-lg shadow-lg hover:bg-yellow-200 transition duration-300">
            <p className="text-xl font-bold">Quality Delivery</p>
            <p className="text-sm mt-2">Exceptional results guaranteed.</p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-yellow-50 to-white">
        <h2 className="text-4xl font-bold text-center text-yellow-500 mb-8">What We Offer?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-lg border border-yellow-300 hover:scale-105 transform transition duration-300">
            <p className="text-xl font-bold text-yellow-500">Easy Project Management</p>
            <p className="text-sm mt-2">Manage your freelance projects effortlessly.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg border border-yellow-300 hover:scale-105 transform transition duration-300">
            <p className="text-xl font-bold text-yellow-500">Seamless Collaboration</p>
            <p className="text-sm mt-2">Work closely with freelancers to meet your needs.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg border border-yellow-300 hover:scale-105 transform transition duration-300">
            <p className="text-xl font-bold text-yellow-500">Diverse Skillsets</p>
            <p className="text-sm mt-2">Find talent for every type of project.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-yellow-50 py-16 text-center">
        <h2 className="text-4xl font-bold text-yellow-500 mb-8">Hear What Our Community Has to Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <p className="text-lg font-semibold">Raeed Ronald</p>
            <p className="text-sm mt-2">"WorkWave helped me find the right freelancer for my project with ease!"</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <p className="text-lg font-semibold">Amoda Micheal</p>
            <p className="text-sm mt-2">"Great platform for finding quality talent quickly."</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <p className="text-lg font-semibold">Wenuja Jordan</p>
            <p className="text-sm mt-2">"The freelancers I hired were professional and delivered on time."</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <p className="text-lg font-semibold">Matheesha Toji</p>
            <p className="text-sm mt-2">"WorkWave is my go-to for hiring freelancers!"</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
