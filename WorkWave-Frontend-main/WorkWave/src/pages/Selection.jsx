import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaBriefcase } from 'react-icons/fa';

const Selection = () => {
    const navigate = useNavigate();

    const handleClientSelection = () => {
        navigate('/signUp'); // Redirects to the Sign Up page
    };

    const handleFreelancerSelection = () => {
        navigate('/signUp'); // Redirects to the marketplace
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-white via-white to-gray-100">
            <h1 className="text-3xl font-semibold mb-8 text-gray-800">Join as a client or freelancer</h1>
            <div className="flex space-x-12">
                <div 
                    onClick={handleClientSelection} 
                    className="border border-gray-300 rounded-lg p-10 hover:shadow-lg cursor-pointer flex flex-col items-center"
                >
                    <FaUserTie className="text-4xl text-yellow-600 mb-4" />
                    <p className="text-lg font-medium text-gray-800">I’m a client, hiring for a project</p>
                </div>
                <div 
                    onClick={handleFreelancerSelection} 
                    className="border border-gray-300 rounded-lg p-10 hover:shadow-lg cursor-pointer flex flex-col items-center"
                >
                    <FaBriefcase className="text-4xl text-yellow-600 mb-4" />
                    <p className="text-lg font-medium text-gray-800">I’m a freelancer, looking for work</p>
                </div>
            </div>
            <p className="mt-8 text-gray-600">Already have an account? <a href="/login" className="text-yellow-600 hover:underline">Log In</a></p>
        </div>
    );
};

export default Selection;
