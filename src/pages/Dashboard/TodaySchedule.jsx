// src/pages/Dashboard/TodaySchedule.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { format, parseISO } from "date-fns";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const TodaySchedule = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchProjects = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `http://localhost:3000/projects/assigned/${user.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // আজকের date অনুযায়ী filter
        const todayStr = format(new Date(), "yyyy-MM-dd");
        const filtered = res.data.filter((project) => {
          const projectDate = format(parseISO(project.date), "yyyy-MM-dd");
          return projectDate === todayStr;
        });

        setProjects(filtered);
      } catch (err) {
        console.error("Error fetching today’s projects:", err.response?.data || err);
        setError(err.response?.data?.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  if (loading) return <p>Loading today's projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (projects.length === 0) return <p>No projects assigned for today.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Today's Assigned Projects</h2>
      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project._id} className="border p-2 rounded shadow-sm">
            <p><strong>Service:</strong> {project.serviceName}</p>
            <p><strong>Customer:</strong> {project.customerEmail}</p>
            <p><strong>Status:</strong> {project.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodaySchedule;
