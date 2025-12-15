import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdDashboard, MdFreeCancellation, MdOutlinePayment } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import useAuth from "../hooks/useAuth";
import { FcHome } from "react-icons/fc";
import { RiAdminFill } from "react-icons/ri";
import { GiPaintRoller } from "react-icons/gi";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [decoratorMenuOpen, setDecoratorMenuOpen] = useState(false);
  const [role, setRole] = useState(""); // role declare

  // Firebase / backend থেকে role fetch
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/${user.email}/role`)
        .then(res => res.json())
        .then(data => setRole(data.role))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-green-50 p-4 border-r">
        {/* HOME */}
        <NavLink className="flex items-center gap-2" to="/">
  <FcHome size={24} /> 
  <span className="text-3xl font-bold">Home Page</span>
</NavLink>


        {/* USER DASHBOARD */}
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full text-left flex items-center gap-2 mt-3 text-blue-500 font-bold text-lg mb-3"
        >
          <MdDashboard />
          User Dashboard
        </button>
        {userMenuOpen && (
          <ul className="space-y-2 ml-4 mt-2">
            <li className="flex gap-2 items-center">
              <ImProfile />
              <NavLink to="profile" className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>My Profile</NavLink>
            </li>
            <li className="flex gap-2 items-center">
              <TbBrandBooking />
              <NavLink
  to="myBookings"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 underline font-bold"
      : "font-bold hover:text-blue-600"
  }
>
  My Bookings
</NavLink>
            </li>
            <li className="flex gap-2 items-center">
              <MdFreeCancellation />
              <NavLink  to="bookingCancellation"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                } >Booking Cancellation</NavLink>
            </li>
            <li className="flex gap-2 items-center">
              <MdOutlinePayment />
              <NavLink to="paymentHistory"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Payment History</NavLink>
            </li>
          </ul>
        )}

        {/* ADMIN DASHBOARD */}
        <hr className="my-4" />
        <button
          onClick={() => setAdminMenuOpen(!adminMenuOpen)}
          className="w-full text-left flex items-center text-blue-500 font-bold gap-2  text-lg mb-3"
        >
          <RiAdminFill />
          Admin Dashboard
        </button>
        {adminMenuOpen && role === "admin" && (
          <ul className="space-y-2 ml-4 mt-2">
            <li><NavLink to="admin"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Admin Home</NavLink></li>
            <li><NavLink to="admin/manageServices"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Manage Services</NavLink></li>
            <li><NavLink to="admin/manageDecorators"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Manage Decorators</NavLink></li>
            <li><NavLink to="admin/manageBookings"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Manage Bookings</NavLink></li>
            <li><NavLink to="admin/analytics" className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Analytics</NavLink></li>
          </ul>
        )}

        {/* DECORATOR DASHBOARD */}
        <hr className="my-4" />
        <button
          onClick={() => setDecoratorMenuOpen(!decoratorMenuOpen)}
          className="w-full text-left flex items-center gap-2 text-blue-500 font-bold text-lg mb-3"
        >
           <GiPaintRoller />
          Decorator Dashboard
        </button>
        {decoratorMenuOpen && (
          <ul className="space-y-2 ml-4 mt-2">
            <li><NavLink to="decorator/home"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Decorator Home</NavLink></li>
            <li><NavLink to="decorator/assignedProjects"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Assigned Projects</NavLink></li>
            <li><NavLink to="decorator/todaysSchedule"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Today Schedule</NavLink></li>
            <li><NavLink to="decorator/updateStatus"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Update Project Status</NavLink></li>
            <li><NavLink to="decorator/earnings"  className={({ isActive }) =>
                  isActive
                 ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }>Earnings Summary</NavLink></li>
          </ul>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-pink-50 p-6">
        <h1 className="text-4xl items-center flex font-bold mb-4">
  Welcome to your Dashboard
</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
