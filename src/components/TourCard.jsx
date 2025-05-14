import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const TourCard = ({ tour }) => {
  const {
    id,
    title,
    image,
    location,
    price,
    oldPrice,
    duration,
    rating,
    link,
  } = tour;

  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-custom hover-scale">
      <Link to={link}>
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          {oldPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
              ส่วนลด {Math.round(((oldPrice - price) / oldPrice) * 100)}%
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-1 text-primary" />
          <span>{location}</span>
          <div className="ml-auto flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span>{rating}</span>
          </div>
        </div>

        <Link to={link}>
          <h3 className="font-medium text-lg mb-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <FaClock className="mr-1" />
          <span>{duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {oldPrice && (
              <span className="text-gray-500 line-through text-sm mr-2">
                ฿{oldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-primary font-bold text-xl">
              ฿{price.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm">/ท่าน</span>
          </div>

          <Link
            to={link}
            className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition-colors text-sm"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
