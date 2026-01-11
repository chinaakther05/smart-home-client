import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/footer/Footer';
import Navbar from '../pages/shared/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='bg-gray-200 min-h-screen'>
            {/* Navbar full width */}
            <div className='w-full'>
                <Navbar />
            </div>

            {/* Main content centered */}
            <div className='max-w-7xl mx-auto px-4 py-6'>
                <Outlet />
            </div>

            {/* Footer centered */}
            <div className='w-full'>
                <Footer />
            </div>
        </div>
    );
};

export default RootLayout;
