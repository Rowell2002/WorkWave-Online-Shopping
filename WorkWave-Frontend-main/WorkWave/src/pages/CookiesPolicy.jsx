import React from 'react';

const CookiesPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow p-6 bg-gray-50">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                        <p className="mb-4">
                            This Cookies Policy explains how we use cookies and similar technologies to provide and improve our services. By using our website, you consent to the use of cookies.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="mb-4">
                                Cookies are small data files placed on your device that help us understand your preferences and improve your experience on our site.
                            </p>
                            <table className="w-full bg-gray-200 rounded-lg shadow-sm">
                                <thead>
                                    <tr className="bg-gray-300">
                                        <th className="p-2 text-left">Type</th>
                                        <th className="p-2 text-left">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2">Session Cookies</td>
                                        <td className="p-2">Used to remember your activity on the site during your visit.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">Persistent Cookies</td>
                                        <td className="p-2">Used to remember your preferences for future visits.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">Third-Party Cookies</td>
                                        <td className="p-2">Used by third parties to track your activity across different websites.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                        <p>
                            You can control the use of cookies through your browser settings. You can choose to block cookies or delete them if you prefer.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default CookiesPolicy;
