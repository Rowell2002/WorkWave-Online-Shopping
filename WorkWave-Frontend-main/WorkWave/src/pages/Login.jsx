import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { saveUserSession, saveUserProfileSession } from '../utils/session'; 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        setError(''); 
    
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
                console.log('Login successful:', data);
                saveUserSession(data); 
    
                if (data.role.replace(/"/g, '') === 'Freelancer') {
                    const profileResponse = await fetch(`http://localhost:8082/api/Profile/user/${data.id}`);
                    
                    if (profileResponse.ok) {
                        const profileData = await profileResponse.json();
                        console.log('Profile data:', profileData);
                        saveUserProfileSession(profileData); 
                    } else {
                        console.error('Failed to fetch profile');
                    }
                }
    
                navigate('/dashboard'); 
            } else if (response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };
    

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

            <div
                className={`relative p-8 bg-white rounded-lg shadow-lg transition-transform duration-300 transform ${
                    hovered ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <h2 className="text-3xl font-bold text-center text-yellow-600 mb-6">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 px-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                />
                <button
                    onClick={handleLogin}
                    className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-600 focus:outline-none"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
