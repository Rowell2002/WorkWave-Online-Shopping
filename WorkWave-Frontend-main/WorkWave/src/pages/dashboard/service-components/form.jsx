import React, { useState } from 'react';
import { getUserSession } from '../../../utils/session'; 

const Form = ({ onSuccess }) => {  
  const [title, setTitle] = useState('');
  const [miniDescription, setMiniDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');

  const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));
  //console.log(userProfile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !miniDescription || !description || !category || !price || !coverImage) {
      setError('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('miniDescription', miniDescription);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('coverImage', coverImage);

    // Instead of checking userProfile.userId, check userProfile.id
    if (userProfile && userProfile.userId) {
      formData.append('freelancerId', userProfile.userId);  // Using the correct 'id'
      console.log(userProfile.userId);
    } else {
      setError('User profile is missing.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8083/api/ListService/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Service created successfully:', result);
        if (onSuccess) onSuccess();  
      } else {
        const errorMessage = await response.text();
        console.error('Error creating service:', errorMessage);
        setError('Failed to create the service. Please try again.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setError('An unexpected error occurred. Please try again.');
    }
};

  

  return (
    <>
      <div className="py-5 bg-white w-full grid md:grid-cols-2 md:gap-6" style={{ marginTop: '3.5rem' }}>
        <div className="flex items-center justify-center p-5 w-full">
          <section className="bg-white">
            <div className="max-w-3xl px-6 py-16 mx-auto text-center">
              <h1 className="text-3xl font-semibold text-gray-800">Create a New Service</h1>
              <p className="max-w-md mx-auto mt-5 text-gray-500">
                Offer your expertise to a global audience by creating a new service. Describe the skills and experience you bring to the table, set your pricing, and outline the details of your service to attract potential clients. This is your opportunity to showcase your talents, set clear expectations, and start earning. Fill in the required details below to get started!
              </p>
            </div>
          </section>
        </div>
        <div className="flex items-start justify-start p-10 w-full">
          <div className="rounded-lg w-full">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="coverImage">
                    Cover Image
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border p-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    aria-describedby="coverImage_help"
                    id="coverImage"
                    type="file"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                  />
                  <div className="mt-1 text-sm text-gray-500" id="coverImage_help">
                    Please try to upload a regular size png or jpg image
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                    Select your Category
                  </label>
                  <select
  id="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm cursor-pointer rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 hover:border-orange-500"
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
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                  Gig Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="miniDescription" className="block mb-2 text-sm font-medium text-gray-900">
                  Mini Description
                </label>
                <input
                  type="text"
                  id="miniDescription"
                  value={miniDescription}
                  onChange={(e) => setMiniDescription(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                  About the Gig
                </label>
                <textarea
                  id="description"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Leave a comment..."
                />
              </div>
              <div className="mb-5">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;



// <>
//         <div className=" py-5 bg-white w-full " style={{"margin-top": "4rem"}}>
//             <div className="flex items-start justify-start p-5">
//                 <div className="max-w-xs overflow-hidden rounded-lg w-full ">

//                     <form class="max-w-sm mx-auto w-full">

//                         <div class="mb-5">
//                             <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Base input</label>
//                             <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
//                         </div>

//                         <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Your message</label>
//                         <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>

//                         <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
//                         <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
//                         <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>


//                         <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
//                         <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">

//                             <option>United States</option>
//                             <option>Canada</option>
//                             <option>France</option>
//                             <option>Germany</option>
//                         </select>
//                         <button type="submit" class="text-white bg-orange-700 hover:bg-orange-800 mt-5 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Register new account</button>
// {/* 
//                         <div class="grid md:grid-cols-2 md:gap-6">
//                             <div class="relative z-0 w-full mb-5 group">
//                                 <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
//                                 <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
//                             </div>
//                             <div class="relative z-0 w-full mb-5 group">
//                                 <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
//                                 <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
//                             </div>
//                         </div> */}


//                     </form>

//                 </div>
//             </div>


          
//         </div>
//         </>