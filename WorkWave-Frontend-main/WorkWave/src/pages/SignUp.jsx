import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaGlobe } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { saveUserSession, saveUserProfileSession } from '../utils/session'; // Import session utility

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: 'United States',
    });

    const navigate = useNavigate();

    const countries = [
        "Sri Lanka", "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "India", "Brazil",
        "Japan", "South Africa", "Singapore", "Netherlands", "Sweden", "Switzerland", "Italy", "Spain", "Mexico", 
        "Russia", "China", "South Korea", "New Zealand", "Norway", "Finland", "Denmark", "Ireland", "Belgium", 
        "Austria", "Argentina", "Colombia", "Chile", "Malaysia", "Thailand", "Philippines", "Vietnam", "Indonesia", 
        "Israel", "Saudi Arabia", "United Arab Emirates", "Turkey", "Egypt", "Nigeria", "Kenya", "Ghana", 
        "Bangladesh", "Pakistan", "Ukraine", "Poland", "Portugal", "Greece", "Czech Republic", "Romania", "Hungary", 
        "Iceland", "Luxembourg", "Malta", "Estonia", "Latvia", "Lithuania"
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8081/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                saveUserSession(data);

                // If user is a freelancer, fetch their profile
                if (data.role.replace(/"/g, '') === 'Freelancer') {
                    const profileResponse = await fetch(`http://localhost:8082/api/Profile/${data.id}`);
                    
                    if (profileResponse.ok) {
                        const profileData = await profileResponse.json();
                        saveUserProfileSession(profileData);
                    } else {
                        console.error('Failed to fetch profile');
                    }
                }

                navigate('/login');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            alert('Login error: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
            role: "Customer",
            country: formData.country,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    
        try {
            const response = await fetch('http://localhost:8081/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                // Automatically log in the user after successful sign-up
                await handleLogin(formData.email, formData.password);
            } else {
                // Extract the error message from the response
                const errorData = await response.json();
    
                // Display specific error message
                if (errorData.message) {
                    alert(`Registration failed: ${errorData.message}`);
                } else {
                    alert('Registration failed: An unexpected error occurred.');
                }
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };
    

    return (
        <div className="flex justify-center items-center py-12 bg-gradient-to-b from-white to-gray-100">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8" style={{ paddingTop: '40px' }}>
                <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <FaUser className="absolute left-3 top-10 text-gray-400 hover:text-gray-600" />
                            <input
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Jane"
                                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <FaUser className="absolute left-3 top-10 text-gray-400 hover:text-gray-600" />
                            <input
                                type="text"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Doe"
                                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Work Email Address
                        </label>
                        <FaEnvelope className="absolute left-3 top-10 text-gray-400 hover:text-gray-600" />
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <FaLock className="absolute left-3 top-10 text-gray-400 hover:text-gray-600" />
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="********"
                                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <FaLock className="absolute left-3 top-10 text-gray-400 hover:text-gray-600" />
                            <input
                                type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="********"
                                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                            Country
                        </label>
                        <FaGlobe className="absolute left-3 top-10 text-gray-400 hover:text-gray-600" />
                        <select
                            id="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
