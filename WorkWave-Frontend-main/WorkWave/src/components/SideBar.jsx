import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getUserSession } from '../utils/session'; 

const Sidebar = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userSession = getUserSession(); 
        if (!userSession || !userSession.id) {
          setError('User session not found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8081/api/users/user/${userSession.id}`);
        const userData = response.data;
        

        console.log(userData.role)
        const role = JSON.parse(userData.role);
        setUserRole(role);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  },);

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <i className="fi fi-rr-home"></i>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/purchases"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <i className="fi fi-rr-shopping-cart"></i>
              <span className="flex-1 ms-3 whitespace-nowrap">Purchases</span>
            </Link>
          </li>
          {/* Conditionally render Services and Orders based on userRole */}
          {userRole === 'Freelancer' && (
            <>
              <li>
                <Link
                  to="/dashboard/services"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <i className="fi fi-rr-briefcase"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">Services</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/orders"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <i className="fi fi-rr-chart-histogram"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                </Link>
              </li>
            </>
          )}
          
          <li>
            <Link
              to="/dashboard/usersettings"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <i className="fi fi-rr-settings-sliders"></i>
              <span className="flex-1 ms-3 whitespace-nowrap">UserSettings</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;


<li>
  <Link
    to="/home"
    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
  >
    Home
  </Link>
</li>