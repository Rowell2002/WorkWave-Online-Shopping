import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow p-6 bg-gray-50">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                        <p className="mb-4">
                            We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website. Please read this policy carefully.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                            <ul className="list-disc list-inside mb-4">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                            </ul>
                            <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
                            <p>
                                We also collect information on how you use our website, including your IP address, browser type, and pages visited.
                            </p>
                        </div>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                        <p className="mb-4">
                            Your information is used to provide, operate, and maintain our website, improve user experience, and communicate with you.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                        <p>
                            We implement various security measures to maintain the safety of your personal information. This includes encryption, secure servers, and regular updates.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default PrivacyPolicy;
