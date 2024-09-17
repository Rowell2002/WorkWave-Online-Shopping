import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

const Card = ({ imageSrc, title, text, footerText, profileSrc, authorName, rating, price, linkTo }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <img className="w-full h-60 object-cover" src={imageSrc} alt="Card" />
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img className="w-10 h-10 rounded-full" src={profileSrc} alt="Profile" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">
             
                Ad by <span className="text-black font-semibold">{authorName}</span>
            </p>
            <p className="text-lg font-bold">
              {title}
            </p>
          </div>
        </div>
        <p className="text-gray-700 mt-2">{text}</p>
        <div className="flex items-center mt-4">
          <span className="text-black mr-2">⭐</span>
          <span className="text-black font-bold mr-1">{rating}</span>
          <span className="text-gray-500">({rating})</span>
        </div>
        <div className="mt-2 text-lg font-bold text-black">
          {price}
        </div>
      </div>
    </div>
  );
};

export default Card;
