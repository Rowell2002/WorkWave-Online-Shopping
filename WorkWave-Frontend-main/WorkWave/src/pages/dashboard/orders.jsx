import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [buyerInfo, setBuyerInfo] = useState({});
    const [serviceDetails, setServiceDetails] = useState({});

    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));
    const freelancerId = userProfile ? userProfile.id : null;

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:8084/api/Order/freelancer/${freelancerId}`);
            const data = await response.json();
            setOrders(data);

            const buyerPromises = data.map(async (order) => {
                const buyerResponse = await fetch(`http://localhost:8081/api/users/user/${order.buyerId}`);
                const buyerData = await buyerResponse.json();
                setBuyerInfo(prevInfo => ({
                    ...prevInfo,
                    [order.buyerId]: buyerData.name
                }));
            });

            await Promise.all(buyerPromises);

            const servicePromises = data.map(async (order) => {
                const serviceResponse = await fetch(`http://localhost:8083/api/ListService/service/${order.serviceId}`);
                const serviceData = await serviceResponse.json();
                return {
                    id: order.serviceId,
                    title: serviceData.title,
                    miniDescription: serviceData.miniDescription,
                    coverImage: serviceData.coverImage
                };
            });

            const services = await Promise.all(servicePromises);
            const serviceDetailsMap = services.reduce((acc, service) => {
                acc[service.id] = service;
                return acc;
            }, {});

            setServiceDetails(serviceDetailsMap);

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await fetch(`http://localhost:8084/api/Order/${orderId}/status?status=${status}`, {
                method: 'PUT',
            });
            const updatedOrder = await response.json();
            setOrders(orders.map(order => (order.id === orderId ? updatedOrder : order)));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    useEffect(() => {
        if (freelancerId) {
            fetchOrders();
        }
    }, [freelancerId]);

    return (
        <>
            <h1 className="text-3xl font-thin bg-white p-10" style={{ marginTop: "3.5rem" }}>Orders</h1>
            <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
                <div className="w-full max-w-5xl rounded-lg bg-white shadow-lg">
                    <section className="container px-6 py-4 mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-x-3">
                                    <h2 className="text-lg font-medium text-gray-800">Orders</h2>
                                    <span className="px-3 py-1 text-xs text-orange-600 bg-orange-100 rounded-full">{orders.length} orders</span>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Manage your service orders.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {orders.map(order => {
                                const service = serviceDetails[order.serviceId] || {};
                                return (
                                    <div key={order.id} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                        <div className="flex-shrink-0 w-32 h-32 bg-gray-100 overflow-hidden rounded-lg">
                                            {service.coverImage ? (
                                                <img src={`data:image/png;base64,${service.coverImage}`} alt={service.title} className="w-full h-full object-cover" />
                                            ) : 'Loading...'}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{service.title || 'Loading...'}</h3>
                                            <p className="mt-1 text-sm text-gray-500">{service.miniDescription || 'Loading...'}</p>
                                            <p className="mt-2 text-sm text-gray-600">Order ID: {order.id}</p>
                                            <p className="text-sm text-gray-600">Buyer: {buyerInfo[order.buyerId] || 'Loading...'}</p>
                                            <p className="text-sm text-gray-600">Price: ${order.price}</p>
                                            <p className="text-sm text-gray-600">Status: {order.status}</p>
                                            <div className="mt-3 flex gap-x-2">
                                                {order.status === 'PENDING' && (
                                                    <button
                                                        onClick={() => updateOrderStatus(order.id, 'ACCEPTED')}
                                                        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded"
                                                    >
                                                        Accept
                                                    </button>
                                                )}
                                                {order.status === 'ACCEPTED' && (
                                                    <button
                                                        onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                                                        className="px-4 py-2 text-white bg-green-500 hover:bg-green-700 rounded"
                                                    >
                                                        Complete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Orders;
