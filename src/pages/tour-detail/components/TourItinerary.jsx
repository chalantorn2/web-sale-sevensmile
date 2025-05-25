import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

const TourItinerary = ({ itinerary }) => {
  // Guard clause
  if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          กำหนดการเดินทาง
        </h2>

        <div className="space-y-6">
          {itinerary.map((item, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index !== itinerary.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}

              <div className="flex items-start">
                {/* Time badge */}
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm z-10">
                  <FaClock />
                </div>

                {/* Content */}
                <div className="ml-6 flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-blue-600 font-semibold text-lg mr-3">
                      {item.time}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-red-500" />
                      {item.activity}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>หมายเหตุ:</strong>{" "}
                กำหนดการอาจมีการเปลี่ยนแปลงขึ้นอยู่กับสภาพอากาศ และสภาพทะเล
                เพื่อความปลอดภัยของนักท่องเที่ยว
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourItinerary;
