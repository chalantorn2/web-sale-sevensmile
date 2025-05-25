import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const TourReviews = ({ reviews, rating, reviewCount }) => {
  // Guard clause
  if (!reviews || !Array.isArray(reviews) || !rating || !reviewCount) {
    return null;
  }
  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  // Calculate rating distribution (mock data for demo)
  const ratingDistribution = [
    { stars: 5, count: Math.round(reviewCount * 0.7), percentage: 70 },
    { stars: 4, count: Math.round(reviewCount * 0.2), percentage: 20 },
    { stars: 3, count: Math.round(reviewCount * 0.05), percentage: 5 },
    { stars: 2, count: Math.round(reviewCount * 0.03), percentage: 3 },
    { stars: 1, count: Math.round(reviewCount * 0.02), percentage: 2 },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="mb-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          รีวิวจากลูกค้า
        </h2>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800 mb-2">
              {rating}
            </div>
            <div className="flex items-center justify-center mb-2">
              {renderStars(rating)}
            </div>
            <p className="text-gray-600">จาก {reviewCount} รีวิว</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center text-sm">
                <span className="w-8">{item.stars}</span>
                <FaStar className="text-yellow-400 mr-2" />
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="w-12 text-gray-600">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            รีวิวล่าสุด
          </h3>

          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-100 pb-6 last:border-b-0"
            >
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={review.avatar || "/images/default-avatar.jpg"}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/default-avatar.jpg";
                    }}
                  />
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{review.name}</h4>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.date)}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            มีประสบการณ์ดีๆ กับเราแล้วใช่ไหม?
          </h3>
          <p className="text-gray-600 mb-4">
            แบ่งปันประสบการณ์ของคุณให้นักท่องเที่ยวคนอื่นได้อ่านกัน
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            เขียนรีวิว
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourReviews;
