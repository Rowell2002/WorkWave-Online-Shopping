import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import footerBackground from '../assets/Footer.png';  // Adjust the path as necessary

const Footer = () => {
    return (
        <footer className="footer w-full">
            <div 
                className="relative text-center py-6" // Ensure the container has enough space
                style={{ 
                    backgroundImage: `url(${footerBackground})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat',
                    color: '#FFF',
                    height: '300px' // Adjust height as needed
                }}
            >
                <div 
                    className="absolute bottom-0 left-0 right-0" // Position content near the bottom
                    style={{ 
                        padding: '20px 0' // Add padding to adjust vertical spacing
                    }}
                >
                    <h1 className="text-2xl font-bold text-black mb-2">
                        Stay Connected with WorkWave
                    </h1>
                    <p className="text-lg text-slate-600 mb-4">
                        Join our community of creatives and innovators. Follow us on social media and stay updated with the latest opportunities, tips, and success stories.
                    </p>
                    <div className="flex justify-center gap-4 mb-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                            <FaFacebookF className="text-2xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                            <FaInstagram className="text-2xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                            <FaTwitter className="text-2xl" />
                        </a>
                    </div>
                </div>
            </div>
            <div 
                className="footer-bottom bg-black text-white py-4 text-center"
                style={{ 
                    color: '#FFF'
                }}
            >
                <p className="text-sm mb-2">
                    All rights Reserved | 
                    <a href="/terms" className="underline ml-2">Terms of Service</a> | 
                    <a href="/privacy" className="underline ml-2">Privacy Policies</a> | 
                    <a href="/cookies" className="underline ml-2">Cookies Policies</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
