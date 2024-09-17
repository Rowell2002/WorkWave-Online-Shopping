import React, { useState, useEffect } from 'react';

const FormUpdate = ({ service }) => {
  const [formData, setFormData] = useState({
    coverImage: '',
    category: '',
    price: '',
    title: '',
    miniDescription: '',
    description: ''
  });
  const [error, setError] = useState('');

  const { id } = service || {};

  useEffect(() => {
    if (service) {
      setFormData({
        coverImage: service.coverImage || '',
        category: service.category || '',
        price: service.price || '',
        title: service.title || '',
        miniDescription: service.miniDescription || '',
        description: service.description || ''
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      coverImage: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.miniDescription || !formData.description || !formData.category || !formData.price) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      const { coverImage, ...dataToUpdate } = formData;

      const formDataToSend = new FormData();
      for (const key in dataToUpdate) {
        formDataToSend.append(key, dataToUpdate[key]);
      }
      if (coverImage) {
        formDataToSend.append('coverImage', coverImage);
      }

      const response = await fetch(`http://localhost:8083/api/ListService/${id}`, {
        method: 'PUT',
        body: formDataToSend,
        headers: {
          // 'Content-Type': 'multipart/form-data' // Not needed here; fetch handles it
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Service updated successfully:', result);
      } else {
        const errorMessage = await response.text();
        console.error('Error updating service:', errorMessage);
        setError('Failed to update the service. Please try again.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="py-5 bg-white w-full grid md:grid-cols-2 md:gap-6" style={{ marginTop: '4rem' }}>
      <div className="flex items-center justify-center p-5 w-full">
        <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
          <p className="text-5xl font-semibold text-orange-500">“</p>
          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl lg:w-96">
            Help us improve our productivity
          </h1>
          <p className="max-w-lg mt-6 text-gray-500">
            “ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
            tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
            aperiam dolorum, obcaecati corrupti aspernatur a. ”
          </p>
          <h3 className="mt-6 text-lg font-medium text-orange-500">Mia Brown</h3>
          <p className="text-gray-600">Marketing Manager at Stech</p>
        </div>
      </div>
      <div className="flex items-start justify-start p-10 w-full">
        <div className="rounded-lg w-full">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="coverImage">Cover Image</label>
                <input
                  className="block w-full text-sm text-gray-900 border p-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  aria-describedby="coverImage_help"
                  id="coverImage"
                  type="file"
                  onChange={handleFileChange}
                />
                <div className="mt-1 text-sm text-gray-500" id="coverImage_help">Please try to upload a regular size png or jpg image</div>
              </div>
              <div className="mb-5">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Select your Category</label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm cursor-pointer rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 hover:border-orange-500"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Choose a Category</option>
                  <option value="Programming & Tech">Programming & Tech</option>
                  <option value="Graphics & Design">Graphics & Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Writing & Translation">Writing & Translation</option>
                  <option value="Video & Animation">Video & Animation</option>
                  <option value="AI Services">AI Services</option>
                  <option value="Music & Audio">Music & Audio</option>
                  <option value="Business">Business</option>
                  <option value="Consulting">Consulting</option>
                </select>
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Gig Title</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="miniDescription" className="block mb-2 text-sm font-medium text-gray-900">Mini Description</label>
              <input
                type="text"
                id="miniDescription"
                value={formData.miniDescription}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">About the Gig</label>
              <textarea
                id="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Describe the gig here..."
              />
            </div>
            <div className="mb-5">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
              <input
                type="text"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUpdate;
