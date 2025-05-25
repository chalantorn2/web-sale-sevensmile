import { FaStar, FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";

const TourHero = ({ tour }) => {
  // Guard clause
  if (!tour) {
    return (
      <div className="h-[60vh] min-h-[400px] bg-gray-200 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">กำลังโหลด...</div>
      </div>
    );
  }

  const discountPercent = tour.oldPrice
    ? Math.round(((tour.oldPrice - tour.price) / tour.oldPrice) * 100)
    : 0;

  return (
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden pb-5">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${tour.heroImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl text-white">
            {/* Breadcrumb */}
            <nav className="text-sm mb-4 opacity-90">
              <span>หน้าแรก</span>
              <span className="mx-2">/</span>
              <span>ทัวร์{tour.location}</span>
              <span className="mx-2">/</span>
              <span className="text-yellow-300">{tour.title}</span>
            </nav>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {tour.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-lg">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-yellow-300" />
                <span>{tour.location}</span>
              </div>

              <div className="flex items-center">
                <FaClock className="mr-2 text-yellow-300" />
                <span>{tour.duration}</span>
              </div>

              <div className="flex items-center">
                <FaStar className="mr-2 text-yellow-300" />
                <span>{tour.rating}</span>
                <span className="ml-1 opacity-75">
                  ({tour.reviewCount} รีวิว)
                </span>
              </div>

              <div className="flex items-center">
                <FaUsers className="mr-2 text-yellow-300" />
                <span>จอยทัวร์</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                {tour.oldPrice && (
                  <span className="text-gray-300 line-through text-xl">
                    ฿{tour.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl md:text-4xl font-bold text-yellow-300">
                  ฿{tour.price.toLocaleString()}
                </span>
                <span className="text-lg opacity-90">/ท่าน</span>
              </div>

              {discountPercent > 0 && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ประหยัด {discountPercent}%
                </div>
              )}
            </div>

            {/* Quick Action */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                onClick={() => {
                  document.getElementById("booking-form")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                จองทันที
              </button>

              <button
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                onClick={() => {
                  document.getElementById("tour-info")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                ดูรายละเอียด
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourHero;
