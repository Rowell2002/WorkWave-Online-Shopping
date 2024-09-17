import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const CardDeck = ({ searchQuery, category, serviceOptions, sellerDetails, budget, deliveryTime }) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust the number of items to show per page

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/ListService/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
        setFilteredServices(data); // Initialize filtered services
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on search and filters
  useEffect(() => {
    let filtered = services;

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter((service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      filtered = filtered.filter((service) => service.category === category);
    }

    // Apply additional filters like service options, seller details, budget, and delivery time
    if (serviceOptions) {
      filtered = filtered.filter((service) => service.serviceOptions === serviceOptions);
    }
    if (sellerDetails) {
      filtered = filtered.filter((service) => service.sellerDetails === sellerDetails);
    }
    if (budget) {
      // Add logic to filter based on budget range
    }
    if (deliveryTime) {
      // Add logic to filter based on delivery time
    }

    setFilteredServices(filtered);
  }, [services, searchQuery, category, serviceOptions, sellerDetails, budget, deliveryTime]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Get the current items to display based on the current page
  const currentItems = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {currentItems.map((service, index) => (
          <Link
            to={`/marketplace/${encodeURIComponent(service.freelancerId)}`}
            state={{
              imageSrc: service.coverImage
                ? `data:image/jpeg;base64,${service.coverImage}`
                : 'https://via.placeholder.com/600x300',
              title: service.title,
              text: service.miniDescription,
              price: service.price,
              authorName: service.freelancerId,
              description: service.description,
              id: service.id,
              freelancerId: service.freelancerId,
            }}
            key={index}
          >
            <Card
              imageSrc={
                service.coverImage
                  ? `data:image/jpeg;base64,${service.coverImage}`
                  : 'https://via.placeholder.com/600x300'
              }
              profileSrc="profile-url.jpg"
              authorName={service.freelancerId}
              title={service.title}
              text={service.miniDescription}
              rating="5.0"
              price={`$${service.price}`}
            />
            {/* Hidden input field to send the id */}
            <input type="hidden" value={service.id} />
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
        >
          Previous
        </button>
        <span className="py-2 px-4">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardDeck;
