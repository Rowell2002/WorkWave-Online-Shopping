import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentMethodCard from '../components/PaymentMethodCard'; // Adjust the import path as necessary
import Breadcrumbs from '../components/Breadcrumbs';
import axios from 'axios'; // Make sure to have axios installed

const PaymentPage = () => {
  const location = useLocation();
  const { title, price } = location.state || { title: 'Default Product', price: 0 }; // Receive title and price

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, cardType: '/path/to/visa-icon.png', lastDigits: '6754', expiryDate: '06/2021', selected: true },
    { id: 2, cardType: '/path/to/mastercard-icon.png', lastDigits: '5643', expiryDate: '11/2025', selected: false },
  ]);

  const [hiddenInfo, setHiddenInfo] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null); // To handle the order status response

  const handleSelect = (id) => {
    setPaymentMethods((methods) =>
      methods.map((method) =>
        method.id === id ? { ...method, selected: true } : { ...method, selected: false }
      )
    );
  };

  const handleRemove = (id) => {
    setPaymentMethods((methods) => methods.filter((method) => method.id !== id));
  };

  const handlePlaceOrder = async () => {
    // Retrieve hidden information from session storage
    const user = JSON.parse(sessionStorage.getItem('user')); // Get user data from session storage
    const buyerId = user?.id; // Extract buyerId from the session data

    // Retrieve hidden information from location state
    const serviceId = location.state?.id;
    const freelancerId = location.state?.freelancerId;

    // Set the hidden information to state for display
    setHiddenInfo({ serviceId, freelancerId, buyerId });

    // Create order payload
    const orderPayload = {
      buyerId,
      freelancerId,
      serviceId,
      price,
      status: 'PENDING', // Default status for a new order
    };

    try {
      // Send request to place the order
      const response = await axios.post('http://localhost:8084/api/Order/', orderPayload);
      setOrderStatus('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderStatus('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="flex p-6 space-x-6">
      <Breadcrumbs />

      {/* Payment Method Section */}
      <div className="w-2/3 p-4 border rounded-lg">
        <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              selected={method.selected}
              cardType={method.cardType}
              lastDigits={method.lastDigits}
              expiryDate={method.expiryDate}
              onRemove={() => handleRemove(method.id)}
              onSelect={() => handleSelect(method.id)}
            />
          ))}
        </div>
        <button className="text-orange-500 mt-4 flex items-center">
          <span className="mr-2">+</span> Add Payment method
        </button>
      </div>

      {/* Order Summary Section */}
      <div className="p-11 border rounded-3xl bg-white flex flex-col justify-between" style={{ height: '600px' }}>
        <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
        <div className="space-y-2 flex-grow">
          <div className="flex justify-between">
            <p>Product</p>
            <p>{title}</p> {/* Display the product title */}
          </div>
          <div className="flex justify-between">
            <p>Price</p>
            <p>${price}</p> {/* Display the product price */}
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p className="text-orange-500">Free</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <p>TOTAL</p>
            <p>${price}</p> {/* Set the total to the price */}
          </div>
          <div className="flex justify-between mt-4">
            <p>Estimated Delivery by</p>
            <p>01 Feb, 2023</p>
          </div>
          <input
            type="text"
            placeholder="Coupon Code"
            className="w-full p-2 border rounded-md mt-2"
          />
        </div>
        <button
          className="bg-orange-500 text-white w-full py-3 rounded-md"
          onClick={handlePlaceOrder}
        >
          Place Your Order and Pay
        </button>

        {/* Display Hidden Information */}
        {hiddenInfo && (
          <div className="mt-4 p-4 border rounded-md bg-gray-100">
            <h3 className="font-semibold">Hidden Information:</h3>
            <p>Gig ID: {hiddenInfo.serviceId || 'N/A'}</p>
            <p>Freelancer ID: {hiddenInfo.freelancerId || 'N/A'}</p>
            <p>User ID (Buyer): {hiddenInfo.buyerId || 'N/A'}</p>
          </div>
        )}

        {/* Display Order Status */}
        {orderStatus && (
          <div className="mt-4 p-4 border rounded-md bg-gray-100">
            <h3 className="font-semibold">{orderStatus}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
