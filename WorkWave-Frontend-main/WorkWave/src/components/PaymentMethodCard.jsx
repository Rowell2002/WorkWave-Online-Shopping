// PaymentMethodCardPage.js
import React, { useEffect, useState } from 'react';

// Function to fetch credit card info from the API
const getCreditCardInfo = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8085/api/Payment/credit-card/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch credit card info:', error);
    throw error;
  }
};

// PaymentMethodCard Component
const PaymentMethodCard = ({ selected, cardType, lastDigits, expiryDate, onRemove, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center justify-between p-4 border rounded-md cursor-pointer transition-all duration-300 ${
        selected ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center">
        <input
          type="radio"
          checked={selected}
          onChange={onSelect}
          className="mr-4 cursor-pointer"
        />
        <img
          src={cardType}
          alt="Card type"
          className="w-8 h-8 mr-2"
        />
        <p className="font-semibold">•••• {lastDigits}</p>
        <span className="ml-4 text-gray-500">Expires {expiryDate}</span>
      </div>
      <button onClick={onRemove} className="text-red-500 font-medium">
        Remove
      </button>
    </div>
  );
};

// Main Component to fetch and display the credit card info
const PaymentMethodCardPage = () => {
  const [creditCardInfo, setCreditCardInfo] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    // Get user ID from session storage
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user?.id;

    if (userId) {
      getCreditCardInfo(userId)
        .then(data => setCreditCardInfo(data))
        .catch(error => console.error('Error fetching credit card info:', error));
    }
  }, []);

  const handleSelect = () => {
    // Handle card selection
    setSelectedCardId(creditCardInfo?.id);
  };

  const handleRemove = () => {
    // Handle card removal (this is just a placeholder function)
    console.log('Remove card:', creditCardInfo?.id);
  };

  // If no credit card info is loaded, display a loading message
  if (!creditCardInfo) return <p>Loading...</p>;

  return (
    <div className="payment-method-page">
      <h2 className="text-xl font-bold mb-4">Your Payment Method</h2>
      <PaymentMethodCard
        selected={selectedCardId === creditCardInfo.id}
        cardType="path_to_card_type_image" // Replace with actual path or image URL for the card type
        lastDigits={creditCardInfo.cardNumber.slice(-4)} // Display last 4 digits of card number
        expiryDate={creditCardInfo.expiryDate}
        onSelect={handleSelect}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default PaymentMethodCardPage;
