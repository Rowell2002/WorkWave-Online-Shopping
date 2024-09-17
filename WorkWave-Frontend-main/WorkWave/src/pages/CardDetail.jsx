import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import RecentReviews from '../components/Review/RecentReviews';

const CardDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, imageSrc, text, price, authorName, description, id, freelancerId } = location.state || {};
  const [profile, setProfile] = useState(null);

  // Log the freelancerId to see if it changes
  console.log('freelancerId: ', freelancerId);

  // Fetch profile information using freelancerId
  useEffect(() => {
    const fetchProfile = async () => {
      if (freelancerId) {
        console.log(`Fetching profile for freelancerId: ${freelancerId}`);
        try {
          const response = await fetch(`http://localhost:8082/api/Profile/${freelancerId}`);
          console.log("Profile fetch response: ", response);
          if (!response.ok) {
            throw new Error('Failed to fetch profile information');
          }
          const data = await response.json();
          console.log('Profile data:', data); // Log fetched profile data
          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, [freelancerId]); // Ensure this hook runs when freelancerId changes

  const handleOrderClick = () => {
    if (authorName) {
      navigate(`/marketplace/${encodeURIComponent(authorName)}/payment`, {
        state: {
          title,
          price,
          id, // Passing id to PaymentPage
          freelancerId, // Passing freelancerId to PaymentPage
        },
      });
    } else {
      console.error('Author name is not available.');
    }
  };

  const handleProfileClick = () => {
    if (freelancerId) {
      navigate(`/freelancer-profile`, { state: { freelancerId } });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Breadcrumbs />
      <h1 className="text-2xl font-bold text-center mb-6">{title || 'Default Title'}</h1>
      <div className="flex flex-col items-center mb-8">
        <img
          src={imageSrc || 'https://via.placeholder.com/600x300'}
          alt={title}
          className="rounded-2xl shadow-md w-full mb-4"
          style={{ height: '400px', objectFit: 'cover' }} // Adjust height and fit
        />

        <h2 className="text-lg font-semibold mb-2 self-start">Service Cost</h2>

        <div className="w-full bg-gray-100 p-6 rounded-lg shadow-md flex justify-between items-center">
          <div className="text-left">
            <p className="text-3xl font-bold">{price}</p>
            <p className="text-sm text-gray-500">Basic Package</p>
          </div>
          <div className="text-right">
            <button
              className="bg-orange-300 text-white py-2 px-9 rounded-lg hover:bg-orange-600"
              onClick={handleOrderClick}
            >
              Order
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About this gig</h2>
        <p className="text-gray-700 mb-4">
          {description || 'Modern. Elegant. Effective. Video Editing Made Simple!'}
        </p>
      </div>

      <RecentReviews />

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">About the Gig Creator</h2>
        {profile ? (
          <div
            className="flex items-center space-x-6 mb-6 cursor-pointer hover:bg-gray-100 p-4 rounded"
            onClick={handleProfileClick}
          >
            <img
              src="https://via.placeholder.com/100"
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">{`${profile.firstName} ${profile.lastName}`}</h3>
              <p className="text-sm text-gray-600 mb-2">{profile.bio || 'Freelancer'}</p>
              <p className="text-gray-700">Skills: {profile.skills || 'Not specified'}</p>
              <p className="text-gray-700">Experience: {profile.experience || 'Not specified'}</p>
            </div>
          </div>
        ) : (
          <p>Loading creator information...</p>
        )}
      </div>

      <div className="bg-black text-white p-8 rounded-3xl mb-12 flex flex-col space-y-4">
        <h2 className="text-2xl font-bold mb-2">Wanna Become a Freelancer?</h2>
        <div className="flex justify-between items-center w-full">
          <p className="text-sm flex-1">
            Join WorkWave and take the first step towards a fulfilling freelance career...
          </p>
          <button className="bg-white text-black py-2 px-9 rounded-full hover:bg-gray-300 ml-4">
            Try now.
          </button>
        </div>
      </div>

      {/* Hidden fields */}
      <input type="hidden" value={id} />
      <input type="hidden" value={freelancerId} />
    </div>
  );
};

export default CardDetail;
