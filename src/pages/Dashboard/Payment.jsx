import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: booking } = useQuery({
    queryKey: ['booking', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking/${parcelId}`);
      return res.data;
    }
  });

  {/** new */}
 const handlePayment = async () => {
  const paymentInfo = {
    cost: booking.cost,
    serviceId: booking._id,
    createdByEmail: booking.createdByEmail,
    serviceName: booking.serviceName,
  };

  const res = await fetch(
    'https://smart-home-server-five.vercel.app/create-checkout-session',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentInfo),
    }
  );

  const data = await res.json();

  console.log("FINAL URL:", data.url); // 🔥 important

  window.location.href = data.url;
};

  {/*const handlePayment = async() =>{
    const paymentInfo = {
      cost: booking.cost,
      serviceId:booking._id,
      createdByEmail:booking.createdByEmail,
      serviceName:booking.serviceName
    }

   const res = await axiosSecure.post('https://smart-home-server-five.vercel.app/create-checkout-session', paymentInfo);

    console.log(res.data);
    window.location.href = res.data.url;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }*/}

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">
        Please Pay ${booking.cost} for : {booking?.serviceName || "N/A"}</h2>
        <button
         onClick={handlePayment} className='btn btn-primary text-white'>Pay

        </button>

      
    </div>
  );
};

export default Payment;
