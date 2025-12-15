// src/pages/admin/AssignProject.jsx
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignProject = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.post("/projects/assign", data);
      console.log("Project assigned:", response.data);

      // SweetAlert success
      Swal.fire({
        icon: 'success',
        title: 'Assigned!',
        text: 'Project assigned successfully!',
        timer: 2000,
        showConfirmButton: false
      });

    } catch (err) {
      console.error("Assign error:", err.response?.data || err);

      // SweetAlert error
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: err.response?.data?.message || 'Failed to assign project',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Assign Project</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 font-medium">Service Name</label>
            <input
              type="text"
              {...register("serviceName", { required: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter service name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Customer Email</label>
            <input
              type="email"
              {...register("customerEmail", { required: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter customer email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Decorator Email</label>
            <input
              type="email"
              {...register("decoratorEmail", { required: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter decorator email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              {...register("date", { required: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Assign Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignProject;
