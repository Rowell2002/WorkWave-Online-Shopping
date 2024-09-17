// FreelancerProfile.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const FreelancerProfile = () => {
  const location = useLocation();
  const { freelancerId } = location.state || {};
  const [profile, setProfile] = useState(null);
  const [gigs, setGigs] = useState([]);

  // Fetch freelancer profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/Profile/${freelancerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile information');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    // Fetch freelancer gigs
    const fetchGigs = async () => {
      try {
        const response = await fetch(`http://localhost:8083/api/ListService/services/freelancer/${freelancerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch freelancer gigs');
        }
        const data = await response.json();
        setGigs(data);
      } catch (error) {
        console.error('Error fetching gigs:', error);
      }
    };

    if (freelancerId) {
      fetchProfile();
      fetchGigs();
    }
  }, [freelancerId]);

  if (!profile) {
    return <p>Loading freelancer profile...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{`${profile.firstName} ${profile.lastName}`}</h1>
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://via.placeholder.com/150"
          alt={`${profile.firstName} ${profile.lastName}`}
          className="w-32 h-32 rounded-full mb-4"
        />
        <div className="text-center">
          <p className="text-lg mb-2">{profile.bio}</p>
          <p className="text-gray-700">Skills: {profile.skills || 'Not specified'}</p>
          <p className="text-gray-700">Experience: {profile.experience || 'Not specified'}</p>
        </div>
      </div>

      {/* Display Freelancer's Gigs */}
      <h2 className="text-2xl font-semibold mb-4">Gigs by {profile.firstName}</h2>
      {gigs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div key={gig.id} className="bg-white border rounded-lg shadow-md overflow-hidden">
              {/* Render the cover image */}
              <img
                src={`data:image/jpeg;base64,${gig.coverImage}`}
                alt={gig.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{gig.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{gig.miniDescription}</p>
                <p className="text-orange-500 font-semibold mt-2">${gig.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No gigs found for this freelancer.</p>
      )}
    </div>
  );
};

export default FreelancerProfile;
