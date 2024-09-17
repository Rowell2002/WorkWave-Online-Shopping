import React from 'react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow p-6 bg-gray-50">
                <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                        <p className="mb-4">
                            Welcome to our website. By accessing or using our services, you agree to comply with and be bound by these Terms of Service. If you do not agree with these terms, please do not use our site.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="mb-4">
                                By using our website, you acknowledge that you have read, understood, and agreed to these Terms of Service. 
                                Your continued use of the site constitutes your acceptance of any changes to these terms.
                            </p>
                        </div>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li className="mb-2">You are responsible for maintaining the confidentiality of your account and password.</li>
                            <li className="mb-2">You agree to notify us immediately of any unauthorized use of your account.</li>
                            <li className="mb-2">You agree to comply with all applicable laws and regulations while using our site.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Prohibited Activities</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <ul className="list-disc list-inside mb-4">
                                <li className="mb-2">You may not use our site for illegal activities or purposes.</li>
                                <li className="mb-2">You may not disrupt or interfere with the functionality of the site.</li>
                                <li className="mb-2">You may not attempt to gain unauthorized access to our systems.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="mb-4">
                                We are not liable for any direct, indirect, incidental, or consequential damages that result from the use or inability to use our site. This includes damages for loss of profits, data, or other intangible losses.
                            </p>
                        </div>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
                        <p className="mb-4">
                            We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page, and your continued use of the site will constitute your acceptance of the modified terms.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="mb-4">
                                If you have any questions about these Terms of Service, please contact us at:
                            </p>
                            <table className="w-full bg-gray-200 rounded-lg shadow-sm">
                                <tbody>
                                    <tr>
                                        <td className="p-2 font-semibold">Email:</td>
                                        <td className="p-2">support@workwave.com</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-semibold">Phone:</td>
                                        <td className="p-2">+1 (800) 555-1234</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-semibold">Address:</td>
                                        <td className="p-2">123 WorkWave St, Suite 100, City, Country</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default TermsOfService;
