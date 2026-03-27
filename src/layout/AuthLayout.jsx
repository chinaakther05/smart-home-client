import React from 'react';
import Logo from '../components/logo/Logo';
import { Outlet } from 'react-router';
import smartImg from '../assets/smart.jpg'

const AuthLayout = () => {
    return (
        <div className='min-h-screen  flex flex-col  px-2 py-4 sm:py-6'>
            <Logo></Logo>
             <div className='flex flex-col md:flex-row items-center justify-center mt-1 w-full max-w-7xl gap-8'>
                <div className='flex-1 w-full max-w-md order-1 md:order-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1 flex justify-center order-2 md:order-2'>
                    <img className='w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full object-cover shadow-lg' src={smartImg} alt="" />
                </div>
             </div>

        </div>
    );
};

export default AuthLayout;