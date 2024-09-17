import React, { useState, useEffect } from 'react';

const Purchases = () => {
    const [orders, setOrders] = useState([]);
    const [serviceDetails, setServiceDetails] = useState({});
    const [error, setError] = useState(null);

    // Retrieve user session from sessionStorage
    const userSession = JSON.parse(sessionStorage.getItem('user'));
    const buyerId = userSession ? userSession.id : null; // Use the ID from the session user

    console.log('User Session:', userSession); // Debugging: Check if user session is retrieved

    useEffect(() => {
        if (buyerId) {
            console.log('Fetching orders for Buyer ID:', buyerId); // Debugging: Log the buyer ID before fetching

            // Fetch orders for the buyer
            const fetchOrders = async () => {
                try {
                    const response = await fetch(`http://localhost:8084/api/Order/buyer/${buyerId}`);
                    console.log('Fetch Response Status:', response.status); // Debugging: Log response status

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    console.log('Fetched Data:', data); // Debugging: Log the fetched data

                    setOrders(data); // Set orders to the response data

                    // Fetch details for each service in the orders
                    const serviceDetailsPromises = data.map(order => 
                        fetch(`http://localhost:8083/api/ListService/service/${order.serviceId}`)
                            .then(res => res.json())
                            .then(serviceData => ({
                                ...serviceData,
                                id: order.serviceId
                            }))
                    );
                    const services = await Promise.all(serviceDetailsPromises);

                    // Create a map for quick lookup of service details by service ID
                    const serviceDetailsMap = services.reduce((acc, service) => {
                        acc[service.id] = service;
                        return acc;
                    }, {});
                    
                    setServiceDetails(serviceDetailsMap); // Set service details to state

                } catch (error) {
                    console.error("Error fetching orders:", error);
                    setError(error.message); // Set error message to state
                }
            };

            fetchOrders();
        } else {
            console.warn('No Buyer ID found in session'); // Debugging: Warn if buyerId is not found
        }
    }, [buyerId]);

    if (error) {
        console.error('Component Error:', error); // Debugging: Log the error
        return <div>Error: {error}</div>;
    }

    console.log('Orders:', orders); // Debugging: Log the orders before rendering
    console.log('Service Details:', serviceDetails); // Debugging: Log service details before rendering

    return (
        <div className="flex items-center justify-center mt-10 py-10 bg-white" style={{ marginTop: "3.5rem" }}>
            <div className="w-full rounded-lg text-center flex flex-col items-center justify-center p-5">
                <div className="p-4 bg-white rounded-lg md:p-8 mb-5" id="about" role="tabpanel" aria-labelledby="about-tab">
                    <h2 className="mb-3 text-3xl font-medium tracking-tight text-gray-900">
                        Powering innovation & trust at 200,000+ companies worldwide
                    </h2>
                    <p className="mb-3 text-gray-500">
                        Empower Developers, IT Ops, and business teams to collaborate at high velocity. Respond to changes and deliver great customer and employee service experiences fast.
                    </p>
                    <a href="#" className="inline-flex items-center font-medium text-orange-600 hover:text-orange-800">
                        Learn more
                        <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9L5 5 1 1" />
                        </svg>
                    </a>
                </div>
                <div className="relative overflow-x-auto sm:rounded-lg w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">Purchase</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Amount</th>
                                <th scope="col" className="px-6 py-3">Purchase Date</th>
                                <th scope="col" className="px-6 py-3">Completion Date</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map(order => {
                                    const service = serviceDetails[order.serviceId] || {}; // Get service details
                                    return (
                                        <tr key={order.id} className="bg-white border-b">
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input id={`checkbox-table-search-${order.id}`} type="checkbox" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                                    <label htmlFor={`checkbox-table-search-${order.id}`} className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                                <img className="w-10 h-10 rounded-full" src={`data:image/png;base64,${service.coverImage}`} alt="Service Cover" />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{service.title}</div>
                                                    <div className="font-normal text-gray-500">{service.miniDescription}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">{service.category}</td>
                                            <td className="px-6 py-4">${order.price}</td>
                                            <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">{order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : 'N/A'}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className={`h-2.5 w-2.5 rounded-full ${order.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'} me-2`}></div> {order.status}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center">No Orders Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Purchases;
