import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const [usersCount, setUsersCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const usersRes = await axiosSecure.get("/users");
        const bookingsRes = await axiosSecure.get("/bookings");
        const servicesRes = await axiosSecure.get("/services");

        setUsersCount(usersRes.data.length);
        setBookingsCount(bookingsRes.data.length);
        setServicesCount(servicesRes.data.length);

        setLoading(false);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      }
    };

    fetchAnalytics();
  }, [axiosSecure]);

  if (loading) return <p>Loading analytics...</p>;

  // 📊 Chart Data
  const chartData = [
    { name: "Users", count: usersCount },
    { name: "Bookings", count: bookingsCount },
    { name: "Services", count: servicesCount },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="p-6 bg-blue-100 rounded shadow text-center">
          <h2 className="font-bold text-lg">Total Users</h2>
          <p className="text-2xl">{usersCount}</p>
        </div>

        <div className="p-6 bg-green-100 rounded shadow text-center">
          <h2 className="font-bold text-lg">Total Bookings</h2>
          <p className="text-2xl">{bookingsCount}</p>
        </div>

        <div className="p-6 bg-yellow-100 rounded shadow text-center">
          <h2 className="font-bold text-lg">Total Services</h2>
          <p className="text-2xl">{servicesCount}</p>
        </div>
      </div>

      {/* 📊 CHART SECTION */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          System Overview Chart
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
