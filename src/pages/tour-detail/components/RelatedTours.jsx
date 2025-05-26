import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { krabiTours } from "../data/krabi";
import { phuketTours } from "../data/phuket";
import { phangNgaTours } from "../data/phang_nga";

const RelatedTours = ({ currentTour }) => {
  // Guard clause - return null if currentTour is not available
  if (!currentTour) {
    return null;
  }

  // รวมข้อมูลทัวร์จากทุกจังหวัด
  const allRelatedTours = Object.values({
    ...krabiTours,
    ...phuketTours,
    ...phangNgaTours,
  }).map((tour) => ({
    id: tour.id,
    title: tour.title,
    slug: tour.slug,
    destination: tour.destination,
    location: tour.location,
    price: tour.price,
    oldPrice: tour.oldPrice,
    duration: tour.duration,
    rating: tour.rating,
    image: tour.heroImage,
    link: `/tours/${tour.destination}/${tour.slug}`,
  }));

  // Filter out current tour and get related tours
  const relatedTours = allRelatedTours
    .filter((tour) => tour.id !== currentTour.id)
    .slice(0, 4); // Show maximum 4 related tours

  if (relatedTours.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ทัวร์ที่น่าสนใจอื่นๆ
        </h2>
        <p className="text-gray-600">ทัวร์ยอดนิยมอื่นๆ ที่คุณอาจสนใจ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedTours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Tour Image */}
            <Link
              to={tour.link}
              className="block relative overflow-hidden h-48"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
              {tour.oldPrice && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                  ส่วนลด{" "}
                  {Math.round(
                    ((tour.oldPrice - tour.price) / tour.oldPrice) * 100
                  )}
                  %
                </div>
              )}
            </Link>

            {/* Tour Content */}
            <div className="p-4">
              {/* Location and Rating */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-red-500" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-1 text-yellow-400" />
                  <span>{tour.rating}</span>
                </div>
              </div>

              {/* Tour Title */}
              <Link to={tour.link}>
                <h3 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                  {tour.title}
                </h3>
              </Link>

              {/* Duration */}
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <FaClock className="mr-1" />
                <span>{tour.duration}</span>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between">
                <div>
                  {tour.oldPrice && (
                    <span className="text-gray-500 line-through text-xs mr-1">
                      ฿{tour.oldPrice.toLocaleString()}
                    </span>
                  )}
                  <div>
                    <span className="text-blue-600 font-bold text-lg">
                      ฿{tour.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600 text-xs ml-1">/ท่าน</span>
                  </div>
                </div>

                <Link
                  to={tour.link}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                >
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Tours */}
      <div className="text-center mt-8">
        <Link
          to={`/${currentTour.destination}`}
          className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          ดูทัวร์{currentTour.location}ทั้งหมด
        </Link>
      </div>
    </section>
  );
};

export default RelatedTours;
