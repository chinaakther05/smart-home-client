import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageDecorators = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Load all users
  useEffect(() => {
    axiosSecure.get("/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // Make user a Decorator
  const handleMakeDecorator = (id) => {
    Swal.fire({
      title: "Make Decorator?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}/role`, { role: "decorator" })
          .then(() => {
            Swal.fire("Success", "User is now a Decorator", "success");
            setUsers(prev => prev.map(user =>
              user._id === id ? { ...user, role: "decorator" } : user
            ));
          })
          .catch(err => console.error(err));
      }
    });
  };

  // Make user an Admin
  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Make Admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}/role`, { role: "admin" })
          .then(() => {
            Swal.fire("Success", "User is now an Admin", "success");
            setUsers(prev => prev.map(user =>
              user._id === id ? { ...user, role: "admin" } : user
            ));
          })
          .catch(err => console.error(err));
      }
    });
  };

  // Remove Decorator/Admin (set back to user)
  const handleRemoveRole = (id) => {
    Swal.fire({
      title: "Remove role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}/role`, { role: "user" })
          .then(() => {
            Swal.fire("Removed", "User role removed", "success");
            setUsers(prev => prev.map(user =>
              user._id === id ? { ...user, role: "user" } : user
            ));
          })
          .catch(err => console.error(err));
      }
    });
  };

  if (loading) {
  return (
    <div className="flex justify-center py-10">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
  Manage Users
  <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
    {users.length}
  </span>
</h1>

      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td><img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" /></td>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td className="capitalize">{user.role}</td>
              <td className="flex gap-2">
                {user.role === "user" && (
                  <>
                    <button
                      onClick={() => handleMakeDecorator(user._id)}
                      className="btn btn-sm btn-success"
                    >
                      Make Decorator
                    </button>
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Make Admin
                    </button>
                  </>
                )}
                {user.role === "decorator" && (
                  <button
                    onClick={() => handleRemoveRole(user._id)}
                    className="btn btn-sm btn-error"
                  >
                    Remove Decorator
                  </button>
                )}
                {user.role === "admin" && (
                  <button
                    onClick={() => handleRemoveRole(user._id)}
                    className="btn btn-sm btn-error"
                  >
                    Remove Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDecorators;
