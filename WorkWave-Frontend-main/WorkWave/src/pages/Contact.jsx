import React, { useState } from 'react';

const Contact = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-orange-300 via-yellow-500 to-red-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>

            <div
                className={`relative p-8 bg-white rounded-lg shadow-lg transition-transform duration-300 transform ${
                    hovered ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <h2 
                    className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-black bg-clip-text text-transparent"
                >
                    Contact Us
                </h2>
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <textarea
                    placeholder="Your Message"
                    className="w-full py-2 px-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    rows="4"
                />
                <button className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-orange-600 focus:outline-none">
                    Send Message
                </button>
            </div>
        </div>
    );
};

export default Contact;
