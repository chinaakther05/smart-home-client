import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2>Payment in cancelled. please try again</h2>
            <Link to='/dashboard/myBookings'><button className='btn btn-primary text-white'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancelled;