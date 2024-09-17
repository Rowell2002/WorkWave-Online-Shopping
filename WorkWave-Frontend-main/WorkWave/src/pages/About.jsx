import React from 'react';
import { FaCheckCircle, FaShieldAlt, FaStar, FaDollarSign } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 min-h-screen flex flex-col p-6">
            {/* Header with gradient background */}
            <header className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 shadow-md py-4 mb-6 rounded-lg transform hover:scale-105 transition-transform duration-300">
                <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
                    About WorkWave
                </h1>
            </header>

            <main className="flex-grow">
                {/* Mission Section with gradient background and hover effects */}
                <section className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 p-6 rounded-lg shadow-md mb-6 transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 transition-transform transform hover:scale-105 duration-300">
                        Our Mission
                    </h2>
                    <p className="text-gray-600 mb-4 transition-transform transform hover:scale-105 duration-300">
                        At WorkWave, we are dedicated to connecting clients with top-tier freelancers to bring their projects to life. Our platform is built on the principles of efficiency, trust, and quality, ensuring that every interaction on WorkWave is a step towards success.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gold mb-4 transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 transition-transform transform hover:scale-105 duration-300">
                            Key Principles
                        </h3>
                        <ul className="list-disc list-inside text-gray-600">
                            <li className="flex items-center mb-2 transition-transform transform hover:scale-105 duration-300">
                                <FaCheckCircle className="text-gold hover:text-red-500 transition-colors duration-300 mr-2" />
                                <span><strong>Efficiency:</strong> Streamlined processes for quick and easy interactions.</span>
                            </li>
                            <li className="flex items-center mb-2 transition-transform transform hover:scale-105 duration-300">
                                <FaShieldAlt className="text-gold hover:text-red-500 transition-colors duration-300 mr-2" />
                                <span><strong>Trust:</strong> Transparent practices to ensure a secure experience.</span>
                            </li>
                            <li className="flex items-center mb-2 transition-transform transform hover:scale-105 duration-300">
                                <FaStar className="text-gold hover:text-red-500 transition-colors duration-300 mr-2" />
                                <span><strong>Quality:</strong> A commitment to excellence in every project.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Vision Section with gradient background */}
                <section className="bg-gradient-to-r from-orange-200 via-yellow-200 to-red-200 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
                    <p className="text-gray-600 mb-4">
                        Whether you’re looking to hire skilled professionals for your projects or you're a freelancer seeking new opportunities, WorkWave is here to facilitate seamless collaboration. Our mission is to empower both clients and freelancers by providing a platform that meets their needs and exceeds their expectations.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gold">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Choose Us?</h3>
                        <table className="min-w-full text-left text-gray-600">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 border-b">Feature</th>
                                    <th className="py-2 px-4 border-b">Benefit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="transform hover:scale-105 transition-transform duration-300">
                                    <td className="py-2 px-4 border-b flex items-center">
                                        <FaDollarSign className="text-gold hover:text-red-500 transition-colors duration-300 mr-2" />
                                        Efficient Matching
                                    </td>
                                    <td className="py-2 px-4 border-b">Quickly find the right freelancer for your needs.</td>
                                </tr>
                                <tr className="transform hover:scale-105 transition-transform duration-300">
                                    <td className="py-2 px-4 border-b flex items-center">
                                        <FaShieldAlt className="text-gold hover:text-red-500 transition-colors duration-300 mr-2" />
                                        Secure Transactions
                                    </td>
                                    <td className="py-2 px-4 border-b">Safe and transparent payment processes.</td>
                                </tr>
                                <tr className="transform hover:scale-105 transition-transform duration-300">
                                    <td className="py-2 px-4 border-b flex items-center">
                                        <FaStar className="text-gold hover:text-red-500 transition-colors duration-300 mr-2" />
                                        Quality Assurance
                                    </td>
                                    <td className="py-2 px-4 border-b">High standards for all freelancers and projects.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {/* Footer with blended background */}
            <footer className="bg-gradient-to-r from-red-300 via-orange-300 to-yellow-300 text-white py-4 mt-6 rounded-lg">
                <div className="container mx-auto text-center">
                    <p>Thank you for being part of our journey. At WorkWave, we believe in the power of connections and are committed to fostering a community where both clients and freelancers can thrive.</p>
                </div>
            </footer>
        </div>
    );
}

export default About;


