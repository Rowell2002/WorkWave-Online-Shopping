import React, { useEffect, useState } from 'react';
import { getUserSession } from '../../utils/session'; // Assuming this function retrieves the user session

const CreateProfile = () => {
  const [profile, setProfile] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    bio: '',
    skills: '',
    experience: '',
  });

  useEffect(() => {
    const userSession = getUserSession();
    if (userSession) {
      setProfile({
        userId: userSession.id,
        firstName: userSession.firstName || '',
        lastName: userSession.lastName || '',
        bio: '',
        skills: '',
        experience: '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Sending request with profile data:", profile); // Debugging line
      const response = await fetch('http://localhost:8082/api/Profile/createProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
  
      console.log("Response status:", response.status); // Debugging line
      const responseData = await response.json();
      console.log("Response data:", responseData); // Debugging line
  
      if (response.ok) {
        const updateRoleResponse = await fetch(`http://localhost:8081/api/users/${profile.userId}/role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify("Freelancer"),
        });
  
        if (updateRoleResponse.ok) {
          alert('Profile created and role updated to Freelancer successfully!');
          
          // Save profile data in session storage with the exact field names
          const profileDataToSave = {
            id: responseData.id,
            userId: responseData.userId,
            firstName: responseData.firstName,
            lastName: responseData.lastName,
            bio: responseData.bio,
            skills: responseData.skills,
            experience: responseData.experience,
          };
          sessionStorage.setItem('userProfile', JSON.stringify(profileDataToSave));
        } else {
          alert('Profile created, but failed to update role.');
        }
      } else {
        alert('Failed to create profile.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };
  
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for profile creation */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className="w-full py-2 px-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Remaining fields (last name, bio, skills, experience) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className="w-full py-2 px-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full py-2 px-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Skills</label>
            <textarea
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              className="w-full py-2 px-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Experience</label>
            <textarea
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              className="w-full py-2 px-4 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
