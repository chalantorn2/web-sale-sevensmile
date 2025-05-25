import { FaCheckCircle } from "react-icons/fa";

const TourInfo = ({ tour }) => {
  // Guard clause
  if (!tour) {
    return (
      <section className="mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tour-info" className="mb-12 mt-5">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          รายละเอียดทัวร์
        </h2>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            เกี่ยวกับทัวร์นี้
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {tour.description}
          </p>
        </div>

        {/* Highlights */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            ไฮไลท์ของทัวร์
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tour.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-600">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {tour.duration.split(" ")[0]}
            </div>
            <div className="text-gray-600">วัน</div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {tour.rating}
            </div>
            <div className="text-gray-600">คะแนนรีวิว</div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {tour.reviewCount}+
            </div>
            <div className="text-gray-600">รีวิว</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourInfo;
