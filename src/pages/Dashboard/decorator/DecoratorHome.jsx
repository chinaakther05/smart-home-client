import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DecoratorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [todayProjects, setTodayProjects] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch assigned projects and earnings
  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        const resProjects = await axiosSecure.get(`/projects/assigned/${user.email}`);
        const todayStr = new Date().toDateString();

        // Today only
        const todayOnly = resProjects.data.filter(p => 
          new Date(p.date).toDateString() === todayStr
        );
        setTodayProjects(todayOnly);

        // Earnings fetch (here static, can be dynamic)
        const resEarnings = [
          { service: "Office Space Decoration", amount: 15000, date: "12/15/2025" },
          { service: "Birthday Decoration", amount: 12000, date: "12/15/2025" },
        ];
        setEarnings(resEarnings);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, axiosSecure]);

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);

  if (loading) return <p className="text-center py-10">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold">Welcome, {user?.displayName}</h2>
        <p className="opacity-90 mt-1">Here is your daily overview</p>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">📅 Today’s Schedule</h3>
        {todayProjects.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No projects assigned for today.
          </p>
        ) : (
          todayProjects.map(project => (
            <div key={project._id} className="border rounded-lg p-4 mb-3">
              <p className="font-medium">{project.serviceName}</p>
              <p className="text-sm text-gray-500">Client: {project.customerEmail}</p>
              <p className="text-sm">
                Status:{" "}
                <span className={`px-2 py-1 rounded text-white ${
                  project.status === "completed" ? "bg-green-500" :
                  project.status === "inProgress" ? "bg-yellow-500" : "bg-gray-400"
                }`}>
                  {project.status}
                </span>
              </p>
            </div>
          ))
        )}
      </div>

      {/* Earnings Summary */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">💰 Earnings Summary</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-green-700">Total Earnings</p>
          <h2 className="text-2xl font-bold text-green-800">৳ {totalEarnings}</h2>
        </div>

        {/* Detailed earnings */}
        {earnings.length > 0 && (
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Service</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((e, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{e.service}</td>
                  <td className="p-2">৳ {e.amount}</td>
                  <td className="p-2">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DecoratorHome;
