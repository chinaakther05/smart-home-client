// src/pages/Dashboard/UpdateProjectStatus.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext/AuthContext";


const UpdateProjectStatus = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProjects = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `http://localhost:3000/projects/assigned/${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(res.data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "Failed to fetch projects",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      const token = await user.getIdToken();
      await axios.patch(
        `http://localhost:3000/projects/${projectId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects((prev) =>
        prev.map((p) =>
          p._id === projectId ? { ...p, status: newStatus } : p
        )
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Project marked as "${newStatus}"`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Status update failed",
      });
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (projects.length === 0) return <p>No assigned projects found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Update Project Status</h2>
      <ul className="space-y-2">
        {projects.map((project) => (
          <li
            key={project._id}
            className="border p-2 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <p><strong>Service:</strong> {project.serviceName}</p>
              <p><strong>Status:</strong> {project.status}</p>
            </div>
            <div className="flex space-x-2">
              {project.status !== "completed" && (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleStatusChange(project._id, "completed")}
                >
                  Completed
                </button>
              )}
              {project.status !== "in-progress" && (
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleStatusChange(project._id, "in-progress")}
                >
                  In Progress
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateProjectStatus;
