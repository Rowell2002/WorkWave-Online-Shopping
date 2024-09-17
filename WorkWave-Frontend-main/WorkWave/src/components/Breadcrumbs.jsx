import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="text-base text-gray-700 mb-4 font-poppins">
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <span key={to}>
            <Link to={to} className="hover:text-orange-500 capitalize">
              {value}
            </Link>
            {index < pathnames.length - 1 && ' / '}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;


