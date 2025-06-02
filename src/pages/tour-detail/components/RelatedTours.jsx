import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import supabase from "../../../utils/supabase";

const RelatedTours = ({ currentTour }) => {
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Guard clause - return null if currentTour is not available
  if (!currentTour) {
    return null;
  }

  useEffect(() => {
    const fetchRelatedTours = async () => {
      try {
        setLoading(true);

        // ดึงทัวร์ที่เกี่ยวข้อง (ไม่รวมทัวร์ปัจจุบัน)
        const { data, error } = await supabase
          .from("tours")
          .select(
            `
            id,
            title,
            hero_image,
            location,
            destination,
            base_price,
            old_price,
            duration,
            rating,
            slug
          `
          )
          .neq("id", currentTour.id) // ไม่เอาทัวร์ปัจจุบัน
          .order("rating", { ascending: false })
          .limit(8); // เอามาสำรอง 8 ตัว แล้วจะ filter เหลือ 4

        if (error) throw error;

        // แปลงข้อมูลให้ตรงกับ format เดิม
        const formattedTours =
          data?.map((tour) => ({
            id: tour.id,
            title: tour.title,
            slug: tour.slug,
            destination: tour.destination,
            location: tour.location,
            price: tour.base_price,
            oldPrice: tour.old_price,
            duration: tour.duration,
            rating: tour.rating,
            image: tour.hero_image,
            link: `/tours/${tour.destination}/${tour.slug}`,
          })) || [];

        // จัดลำดับความสำคัญ: จังหวัดเดียวกันก่อน แล้วค่อยจังหวัดอื่น
        const samDestination = formattedTours.filter(
          (tour) => tour.destination === currentTour.destination
        );
        const otherDestinations = formattedTours.filter(
          (tour) => tour.destination !== currentTour.destination
        );

        // รวมกันและเอาแค่ 4 ตัว
        const finalTours = [...samDestination, ...otherDestinations].slice(
          0,
          4
        );

        setRelatedTours(finalTours);
      } catch (err) {
        console.error("Error fetching related tours:", err);

        // Fallback ใช้ mock data เมื่อเกิด error
        const fallbackTours = getFallbackTours(currentTour);
        setRelatedTours(fallbackTours);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedTours();
  }, [currentTour.id, currentTour.destination]);

  // Fallback mock data สำหรับกรณี database error
  const getFallbackTours = (currentTour) => {
    const mockTours = [
      {
        id: 1,
        title: "ทัวร์ 4 เกาะ กระบี่ One Day Trip",
        slug: "four-islands-speedboat",
        destination: "krabi",
        location: "กระบี่",
        price: 1290,
        oldPrice: 1590,
        duration: "1 วัน",
        rating: 4.8,
        image: "/images/krabi/four-islands.jpg",
        link: "/tours/krabi/four-islands-speedboat",
      },
      {
        id: 2,
        title: "ทัวร์เกาะพีพี อ่าวมาหยา เกาะไผ่",
        slug: "phi-phi-speedboat",
        destination: "krabi",
        location: "กระบี่",
        price: 1590,
        oldPrice: 1890,
        duration: "1 วัน",
        rating: 4.7,
        image: "/images/krabi/phi-phi.jpg",
        link: "/tours/krabi/phi-phi-speedboat",
      },
      {
        id: 13,
        title: "ทัวร์เกาะห้อง เรือสปีดโบ๊ท/เรือหางยาว",
        slug: "hong-island-tour",
        destination: "krabi",
        location: "กระบี่",
        price: 1390,
        oldPrice: 1590,
        duration: "1 วัน",
        rating: 4.7,
        image: "/images/krabi/hong-island-tour.jpg",
        link: "/tours/krabi/hong-island-tour",
      },
      {
        id: 15,
        title: "กระบี่จังเกิ้ลทัวร์",
        slug: "krabi-jungle-tour",
        destination: "krabi",
        location: "กระบี่",
        price: 1490,
        oldPrice: 1790,
        duration: "1 วัน",
        rating: 4.8,
        image: "/images/krabi/jungle-tour.jpg",
        link: "/tours/krabi/krabi-jungle-tour",
      },
      {
        id: 4,
        title: "ทัวร์เกาะพีพี มาหยา ลันตา",
        slug: "phi-phi-maya",
        destination: "phuket",
        location: "ภูเก็ต",
        price: 1690,
        oldPrice: 1990,
        duration: "1 วัน",
        rating: 4.9,
        image: "/images/phuket/phi-phi.jpg",
        link: "/tours/phuket/phi-phi-maya",
      },
      {
        id: 7,
        title: "ทัวร์อ่าวพังงา เขาตะปู ถ้ำลอด",
        slug: "james-bond-island",
        destination: "phang-nga",
        location: "พังงา",
        price: 1390,
        oldPrice: 1690,
        duration: "1 วัน",
        rating: 4.8,
        image: "/images/phang-nga/james-bond.jpg",
        link: "/tours/phang-nga/james-bond-island",
      },
    ];

    return mockTours.filter((tour) => tour.id !== currentTour.id).slice(0, 4);
  };

  if (loading) {
    return (
      <section className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ทัวร์ที่น่าสนใจอื่นๆ
          </h2>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

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
                onError={(e) => {
                  // Fallback สำหรับรูปที่โหลดไม่ได้
                  e.target.src = "/images/placeholder-tour.jpg";
                }}
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
