// MarketPlace.js
import React, { useState } from 'react';
import Categories from '../components/Category/Categories';
import CardDeck from '../components/Card/CardDeck';
import Breadcrumbs from '../components/Breadcrumbs';

const MarketPlace = ({ searchQuery }) => {
    const [category, setCategory] = useState('');
    const [serviceOptions, setServiceOptions] = useState('');
    const [sellerDetails, setSellerDetails] = useState('');
    const [budget, setBudget] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');

    // Handler for updating category
    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    return (
        <div className="container mx-auto px-4">
            <Breadcrumbs />
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Find Any Service You Want in a Sec</h2>
                <p className="text-gray-600">
                    Need a freelancer? Search our vast network of talented professionals and find the perfect match for your project in just seconds.
                </p>
            </div>

            <div className="flex">
                <div className="w-1/4 pr-2">
                    <Categories onCategoryChange={handleCategoryChange} /> {/* Pass the handler */}
                </div>

                <div className="w-px bg-gray-700 mb-4"></div>

                <div className="w-3/4 pl-8">
                    {searchQuery && (
                        <div className="text-4xl font-semibold text-gray-800 mb-4">
                            Search Results for "{searchQuery}"...
                        </div>
                    )}

                    <div className="flex flex-wrap justify-end items-center mb-4 space-x-4">
                        <select
                            value={serviceOptions}
                            onChange={(e) => setServiceOptions(e.target.value)}
                            className="py-2 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm font-bold text-gray-700"
                        >
                            <option value="">Service options</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        <select
                            value={sellerDetails}
                            onChange={(e) => setSellerDetails(e.target.value)}
                            className="py-2 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm font-bold text-gray-700"
                        >
                            <option value="">Seller details</option>
                            <option value="seller1">Seller 1</option>
                            <option value="seller2">Seller 2</option>
                            <option value="seller3">Seller 3</option>
                        </select>
                        <select
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="py-2 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm font-bold text-gray-700"
                        >
                            <option value="">Budget</option>
                            <option value="budget1">$5 - $50</option>
                            <option value="budget2">$51 - $100</option>
                            <option value="budget3">$101 - $200</option>
                        </select>
                        <select
                            value={deliveryTime}
                            onChange={(e) => setDeliveryTime(e.target.value)}
                            className="py-2 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm font-bold text-gray-700"
                        >
                            <option value="">Delivery time</option>
                            <option value="1_day">1 Day</option>
                            <option value="3_days">3 Days</option>
                            <option value="7_days">7 Days</option>
                        </select>
                    </div>

                    {/* Pass filters to CardDeck */}
                    <CardDeck
                        searchQuery={searchQuery}
                        category={category}
                        serviceOptions={serviceOptions}
                        sellerDetails={sellerDetails}
                        budget={budget}
                        deliveryTime={deliveryTime}
                    />
                </div>
            </div>
        </div>
    );
};

export default MarketPlace;
