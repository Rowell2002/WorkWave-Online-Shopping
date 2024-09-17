// RecentReviews.js
import React from 'react';
import ReviewCard from './ReviewCard'; // Adjust the path as needed

const RecentReviews = () => {
  // Sample reviews data
  const reviews = [
    {
      imageSrc: 'https://via.placeholder.com/80', // Replace with actual image URL
      reviewText:
        'WorkWave has been a game-changer for my freelance career. The range of projects available is impressive, and the platform makes it so easy to connect with clients who value my work.',
      reviewerName: 'Maria P., Customer',
    },
    {
      imageSrc: 'https://via.placeholder.com/80', // Replace with actual image URL
      reviewText:
        'Great experience! The platform’s interface is user-friendly, and I have been able to grow my client base steadily.',
      reviewerName: 'John D., Customer',
    },
    {
      imageSrc: 'https://via.placeholder.com/80', // Replace with actual image URL
      reviewText:
        'I’ve found the best projects through WorkWave. The community here is supportive, and it’s easy to manage my work.',
      reviewerName: 'Sarah L., Customer',
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-6">Recent Reviews</h2>
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            imageSrc={review.imageSrc}
            reviewText={review.reviewText}
            reviewerName={review.reviewerName}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentReviews;
