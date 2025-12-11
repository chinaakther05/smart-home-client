import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookingCancellation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchCancelled = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/bookings/${encodeURIComponent(user.email)}`);
        // Filter cancelled bookings
        const cancelled = res.data.filter(b => b.status === "cancelled");
        setCancelledBookings(cancelled);
      } catch (err) {
        console.error(err);
        setCancelledBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCancelled();
  }, [user?.email, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Booking Cancellation</h2>

      {cancelledBookings.length === 0 ? (
        <p className="text-gray-500 text-center">No cancelled bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className="text-center">
                <th>Service Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cancelledBookings.map((booking) => (
                <tr key={booking._id} className="text-center">
                  <td>{booking.serviceName}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString("en-BD")}</td>
                  <td>{booking.location}</td>
                  <td>{booking.cost?.toLocaleString("en-BD") ?? 0} BDT</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingCancellation;
