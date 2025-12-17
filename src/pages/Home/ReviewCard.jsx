import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const {
    userName = "Anonymous",
    user_photoURL,
    review: testimonial = "No review text provided"
  } = review || {};

  return (
    <div className="max-w-sm bg-white rounded-xl shadow p-6 border">
      
      <div className="text-teal-500 text-3xl mb-4">
        <FaQuoteLeft />
      </div>

      <p className="mb-4 text-gray-600">
        {testimonial}
      </p>

      <div className="border-t border-dashed mt-6 mb-4"></div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img 
            src={user_photoURL || "https://i.ibb.co/2FsfXqM/user.png"} 
            alt={userName} 
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h4 className="font-bold text-gray-900">{userName}</h4>
          <p className="text-sm text-gray-500">Customer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
