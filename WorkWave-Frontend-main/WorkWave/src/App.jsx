// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import Selection from './pages/Selection';
import Dashboard from './pages/dashboard/dashboard'; 
import Home from './pages/dashboard/Home'; 
import Purchases from './pages/dashboard/purchases'; 
import Orders from './pages/dashboard/orders'; 
import Services from './pages/dashboard/services'; 
import UserSettings from './pages/dashboard/UserSettings'; 
import AddPortfolio from './pages/dashboard/addportfolio';
import MarketPlace from './pages/MarketPlace';
import CardDetail from './pages/CardDetail';
import PaymentPage from './pages/Payment';
import HomePage from './pages/Home';
import TermsOfServices from './pages/TermsOfService';
import CookiesPolicy from './pages/CookiesPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FreelancerProfile from './pages/FreelancerProfile';


const App = () => {
    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Check session storage on component mount
    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem('isLoggedIn');
        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('isLoggedIn'); // Remove login status from session storage
    };

    return (
        <Router>
            <Routes>
                <Route path="*" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onLogout={handleLogout} />} />
            </Routes>
        </Router>
    );
}

const Layout = ({ isLoggedIn, setIsLoggedIn, onLogout }) => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <div className="min-h-screen flex flex-col">
            {!isDashboard && <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/terms" element={<TermsOfServices />} />
                    <Route path="/cookies" element={<CookiesPolicy />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/selection" element={<Selection />} />
                    <Route path='/freelancer-profile'element={<FreelancerProfile/>}/>
                    <Route path="/marketplace" element={<MarketPlace />} />
                    <Route path="/marketplace/:cardName" element={<CardDetail />} />
                    <Route path="/marketplace/:authorName/payment" element={<PaymentPage />} />
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="" element={<Home />} />
                        <Route path="purchases" element={<Purchases />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="services" element={<Services />} />
                        <Route path="usersettings" element={<UserSettings />} />
                        <Route path="addprofile" element={<AddPortfolio />} />
                    </Route>
                </Routes>
            </main>
            {!isDashboard && <Footer />}
        </div>
    );
}

export default App;
