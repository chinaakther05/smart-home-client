import React from 'react';
import logo from '../../assets/home.png';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center  space-x-1">
        {/* Logo Image */}
        <img
          className="w-[60px] h-[60px] rounded-full object-cover border-2 border-green-500 dark:border-green-500"
          src={logo}
          alt="Smart Home Logo"
        />

        {/* Logo Text */}
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white  sm:inline">
          Style
          <span className="text-green-600 dark:text-green-400">Decor</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
