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
          `https://smart-home-server-five.vercel.app/projects/assigned/${user.email}`,
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
        `https://smart-home-server-five.vercel.app/projects/${projectId}/status`,
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

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );

  if (projects.length === 0)
    return <p className="text-center py-6">No assigned projects found.</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        Update Project Status
        <span className="bg-purple-600 text-white text-sm px-2 py-1 rounded-full">
          {projects.length}
        </span>
      </h1>

      <ul className="space-y-3">
        {projects.map((project) => (
          <li
            key={project._id}
            className="border p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{project.serviceName}</p>
              <p className="mt-1">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded text-white capitalize ${
                    project.status === "completed"
                      ? "bg-green-500"
                      : project.status === "in-progress"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                >
                  {project.status}
                </span>
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleStatusChange(project._id, "completed")}
                disabled={project.status === "completed"}
              >
                Completed
              </button>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => handleStatusChange(project._id, "in-progress")}
                disabled={project.status === "in-progress"}
              >
                In Progress
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateProjectStatus;
