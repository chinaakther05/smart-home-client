// src/pages/Dashboard/EarningsSummary.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const EarningsSummary = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `http://localhost:3000/payment?email=${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPayments(res.data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "Failed to fetch payments",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  if (loading) return <p>Loading earnings...</p>;
  if (payments.length === 0) return <p>No earnings yet.</p>;

  // Total earnings
  const totalEarnings = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Earnings Summary</h2>
      <p className="mb-4"><strong>Total Earnings:</strong> ${totalEarnings.toFixed(2)}</p>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Service</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Tracking ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td className="border px-2 py-1">{p.serviceName}</td>
              <td className="border px-2 py-1">${p.amount}</td>
              <td className="border px-2 py-1">{p.paymentStatus}</td>
              <td className="border px-2 py-1">{new Date(p.paidAt).toLocaleDateString()}</td>
              <td className="border px-2 py-1">{p.trackingId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EarningsSummary;
