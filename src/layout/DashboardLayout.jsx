import React, { useState } from "react";
import { MdDashboard, MdOutlinePayment } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";

const DashboardLayout = () => {
  // USER menu
  const [menuOpen, setMenuOpen] = useState(false);

  // ADMIN menu
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAdminMenu = () => setAdminMenuOpen(!adminMenuOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-100 p-4 border-r">

        {/* Home */}
        <NavLink to="/">
          <h2 className="text-xl font-bold mb-4">Home Page</h2>
        </NavLink>

        {/* USER DASHBOARD */}
        <button
          onClick={toggleMenu}
          className="w-full text-left flex items-center gap-2 font-semibold text-lg mb-3"
        >
          <MdDashboard />
          User Dashboard
        </button>

        {menuOpen && (
          <ul className="space-y-2 ml-4 mt-2">
            <li className="flex gap-2 items-center">
              <ImProfile />
              <NavLink className='font-bold' to="profile ">My Profile</NavLink>
            </li>
            <li  className="flex gap-2 items-center">
              <TbBrandBooking />
              <NavLink className='font-bold' to="myBookings">My Bookings</NavLink>
            </li>
            <li>
              <NavLink to="bookingCancellation">Booking Cancellation</NavLink>
            </li>
            <li  className="flex gap-2 items-center">
              <MdOutlinePayment />
              <NavLink className='font-bold' to="paymentHistory">Payment History</NavLink>
            </li>
          </ul>
        )}

        {/* ADMIN DASHBOARD */}
        <hr className="my-4" />

        <button
          onClick={toggleAdminMenu}
          className="w-full text-left flex items-center gap-2 font-semibold text-lg mb-3"
        >
          <MdDashboard />
          Admin Dashboard
        </button>

     

          <ul className="space-y-2 ml-4 mt-2">
            <li>
              <NavLink to="admin">Admin Home</NavLink>
            </li>
            <li>
              <NavLink to="admin/manageServices">Manage Services</NavLink>
            </li>
            <li>
              <NavLink to="admin/manageDecorators">Manage Decorators</NavLink>
            </li>
            <li>
              <NavLink to="admin/manageBookings">Manage Bookings</NavLink>
            </li>
            <li>
              <NavLink to="admin/analytics">Analytics</NavLink>
            </li>
          </ul>
      
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
