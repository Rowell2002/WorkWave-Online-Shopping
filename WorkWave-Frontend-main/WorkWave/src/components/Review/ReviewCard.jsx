import React from 'react';

const ReviewCard = ({ imageSrc, reviewText, reviewerName }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-3xl shadow-md w-full md:w-1/3 flex flex-col items-center">
      <img
        src={imageSrc}
        alt={reviewerName}
        className="w-40 h-40 rounded-full -mt-16 mb-4 border-4 border-white shadow-lg"
      />
      <p className="text-gray-700 text-center mb-4">{reviewText}</p>
      <p className="text-sm font-semibold text-center text-gray-600">{reviewerName}</p>
    </div>
  );
};

export default ReviewCard;
