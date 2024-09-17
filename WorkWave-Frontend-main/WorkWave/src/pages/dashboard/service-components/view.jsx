import React, { useEffect, useState } from 'react';

const View = ({ onButtonClick, onsingleClick }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));

        if (userProfile && userProfile.userId) {
          const response = await fetch(`http://localhost:8083/api/ListService/services/freelancer/${userProfile.userId}`);
          
          if (!response.ok) {
            throw new Error('');
          }

          const data = await response.json();
          setServices(data);
        } else {
          setError('User profile is missing.');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchServices();
  }, []);

  // Function to handle deletion of a service
  const handleDelete = async (serviceId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8083/api/ListService/${serviceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServices(services.filter(service => service.id !== serviceId)); // Remove the deleted service from the state
      } else {
        throw new Error('Failed to delete service');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex items-start justify-start bg-gray-100 w-full" style={{ marginTop: "3.5rem" }}>
        <section className="bg-white w-full">
          <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
            <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl">
              Expand Your Reach and <span className="text-orange-500">Grow Your Business.</span>
            </h2>
            <p className="max-w-4xl mt-6 text-center text-gray-500">
              Showcase your skills, connect with clients, and turn your expertise into income...
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Statistics */}
            </dl>
          </div>
        </section>
      </div>

      <div className="flex items-start justify-start min-h-screen bg-gray-100 w-full" style={{ marginTop: "1rem" }}>
        <section className="bg-white w-full">
          <div className="container px-6 py-8 mx-auto">
            <h2 className="text-lg font-medium text-gray-800">Your Services</h2>
            <p className="mt-1 text-sm text-gray-500">These are all the services that you have listed</p>
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
              <div>
                <div className="inline-flex rounded-md shadow-sm">
                  <a href="#" className="px-4 py-2 text-sm font-medium text-orange-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100">Listed</a>
                  <a href="#" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100">Unlisted</a>
                  <a href="#" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100">Draft</a>
                </div>
              </div>
              <button type="button" className="focus:outline-none text-white bg-orange-600 hover:bg-orange-500 font-medium rounded-lg px-4 py-1.5 me-2 mb-2 text-md" onClick={onButtonClick}>
                Create a Service
              </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.length > 0 ? (
                services.map(service => (
                  <div key={service.id} className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg border">
                    <div className="px-4 py-2">
                      <h1 className="text-xl font-bold text-gray-800 uppercase">{service.title}</h1>
                      <p className="mt-1 text-sm text-gray-600">{service.miniDescription}</p>
                    </div>
                    <img
                      className="object-cover w-full h-48 mt-2"
                      src={service.coverImage ? `data:image/jpeg;base64,${service.coverImage}` : 'https://via.placeholder.com/320x180'}
                      alt={service.title || 'Service Image'}
                    />
                    <div className="flex items-center justify-between px-4 py-2 bg-orange-400">
                      <h1 className="text-lg font-bold text-white">${service.price}</h1>
                      <div className="flex space-x-2">
                        <button
                          className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200"
                          onClick={() => onsingleClick(service)}
                        >
                          Select
                        </button>
                        <button
                          className="px-2 py-1 text-xs font-semibold text-red-600 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-red-200"
                          onClick={() => handleDelete(service.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No services found.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default View;
