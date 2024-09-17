import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSettings = () => {
    // State for storing form data
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        country: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch credit card details when the component is mounted
    useEffect(() => {
        const fetchCreditCardInfo = async () => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const userId = user ? user.id : null;

            if (userId) {
                try {
                    const response = await fetch(`http://localhost:8085/api/Payment/credit-card/${userId}`);
                    if (response.ok) {
                        const creditCardData = await response.json();
                        setCardName(creditCardData.cardHolderName);
                        setCardNumber(creditCardData.cardNumber);
                        setExpiryDate(creditCardData.expiryDate);
                        setCvv(creditCardData.cvv);
                    } else {
                        console.error('Failed to fetch credit card details');
                    }
                } catch (error) {
                    console.error('Error fetching credit card details:', error);
                }
            }
        };

        fetchCreditCardInfo();
    }, []);

    // Fetch user information from the specific API endpoint
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userSession = JSON.parse(sessionStorage.getItem('user'));
            const userId = userSession ? userSession.id : null;

            if (!userId) {
                setError('User session not found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8081/api/users/user/${userId}`);
                if (response.status === 200) {
                    const userData = response.data;
                    setUserInfo({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        role: userData.role,
                        country: userData.country,
                        password: '' // Password should not be pre-filled for security reasons
                    });
                } else {
                    console.error('Failed to fetch user information');
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
                setError('Failed to fetch user information');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handleUserInfoChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleCreditCardSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user ? user.id : null;

        const paymentData = {
            cardHolderName: cardName,
            userId: userId,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv
        };

        try {
            const response = await fetch('http://localhost:8085/api/Payment/save-credit-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Credit card details saved successfully:', result);
            } else {
                console.error('Failed to save credit card details');
            }
        } catch (error) {
            console.error('Error saving credit card details:', error);
        }
    };

    const handleUserInfoSubmit = async (e) => {
        e.preventDefault();
        // Handle user information form submission logic here (e.g., saving user profile details)
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex items-start justify-start min-h-screen bg-gray-100" style={{ marginTop: '3.5rem' }}>
            <div className="w-full flex space-x-8 p-10">
                {/* User Information Section */}
                <div className="w-1/2 rounded-lg text-start bg-white p-10">
                    <h2 className="text-2xl font-bold mb-6">User Information</h2>
                    <form onSubmit={handleUserInfoSubmit}>
                        {/* First Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleUserInfoChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter first name"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleUserInfoChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter last name"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleUserInfoChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter email address"
                            />
                        </div>

                        {/* Role */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                Role
                            </label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={userInfo.role}
                                onChange={handleUserInfoChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter role"
                            />
                        </div>

                        {/* Country */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={userInfo.country}
                                onChange={handleUserInfoChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter country"
                            />
                        </div>

                        {/* Password */}
                        {/* Password should not be pre-filled for security reasons */}

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                            >
                                Save Information
                            </button>
                        </div>
                    </form>
                </div>

                {/* Payment Information Section */}
                <div className="w-1/2 rounded-lg text-start bg-white p-10">
                    <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                    <form onSubmit={handleCreditCardSubmit}>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="cardNumber"
                                id="cardNumber"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="cardNumber"
                                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Card Number
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="cardName"
                                id="cardName"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="cardName"
                                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Card Holder Name
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="expiryDate"
                                id="expiryDate"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="expiryDate"
                                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Expiry Date
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="cvv"
                                id="cvv"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="cvv"
                                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                CVV
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                        >
                            Save Payment Information
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;
