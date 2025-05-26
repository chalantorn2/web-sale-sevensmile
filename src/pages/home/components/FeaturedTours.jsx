import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaShip,
  FaMapMarkerAlt,
} from "react-icons/fa";

const FeaturedTours = () => {
  const mockTours = [
    {
      id: 1,
      title: "ทัวร์ 4 เกาะ - เรือสปีดโบ๊ท",
      image: "/images/tours/four-islands-krabi.jpg",
      imageName: "four-islands-krabi.jpg",
      location: "กระบี่",
      destination: "krabi",
      slug: "four-islands-speedboat",
      price: 1000,
      oldPrice: 1399,
      duration: "1 วัน",
      rating: 4.8,
      description:
        "สัมผัสความงดงามของ 4 เกาะกระบี่ ทะเลใส หาดทรายขาว ด้วยเรือสปีดโบ๊ทสุดเร็ว",
      link: "/tours/krabi/four-islands-speedboat",
      featured: true,
    },
    {
      id: 2,
      title: "ทัวร์เกาะพีพี - เรือสปีดโบ๊ท",
      image: "/images/tours/phi-phi-speed-boat.jpg",
      imageName: "phi-phi-speed-boat.jpg",
      location: "กระบี่",
      destination: "krabi",
      slug: "phi-phi-speedboat",
      price: 1500,
      oldPrice: 1899,
      duration: "1 วัน",
      rating: 4.9,
      description:
        "เที่ยวเกาะพีพี อ่าวมาหยา เกาะไผ่ ด้วยเรือสปีดโบ๊ทที่ทันสมัยและปลอดภัย",
      link: "/tours/krabi/phi-phi-speedboat",
      featured: true,
    },
    {
      id: 3,
      title: "ทัวร์ 7 เกาะ ชมพระอาทิตย์ตก + BBQ",
      image: "/images/tours/sunset-bbq-tour.jpg",
      imageName: "sunset-bbq-tour.jpg",
      location: "กระบี่",
      destination: "krabi",
      slug: "sunset-bbq-tour",
      price: 1600,
      oldPrice: 1999,
      duration: "1 วัน",
      rating: 4.9,
      description:
        "ชมพระอาทิตย์ตกสุดโรแมนติกพร้อมบาร์บีคิวบนเรือ สัมผัสความงามของ 7 เกาะกระบี่",
      link: "/tours/krabi/sunset-bbq-tour",
      featured: true,
    },
    {
      id: 4,
      title: "ทัวร์ล่องแก่ง",
      image: "/images/tours/white-water-rafting.jpg",
      imageName: "white-water-rafting.jpg",
      location: "พังงา",
      destination: "phang-nga",
      slug: "rafting-adventure",
      price: 1500,
      oldPrice: 1899,
      duration: "1 วัน",
      rating: 4.7,
      description:
        "ผจญภัยกับการล่องแก่งสุดมันส์ในจังหวัดพังงา พร้อมกิจกรรมสนุกๆ มากมาย",
      link: "/tours/phang-nga/rafting-adventure",
      featured: true,
    },
    {
      id: 5,
      title: "ทัวร์เกาะเจมส์บอนด์ - เรือสปีดโบ๊ท",
      image: "/images/tours/james-bond-island.jpg",
      imageName: "james-bond-island.jpg",
      location: "พังงา",
      destination: "phang-nga",
      slug: "james-bond-island",
      price: 1600,
      oldPrice: 2099,
      duration: "1 วัน",
      rating: 4.8,
      description:
        "สัมผัสความงดงามของเกาะเจมส์บอนด์ เขาตะปู ถ้ำลอด และเกาะปันหยี",
      link: "/tours/phang-nga/james-bond-island",
      featured: true,
    },
  ];

  const [featuredTours, setFeaturedTours] = useState(mockTours);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();

  // Auto slide interval
  const autoSlideInterval = 5000; // 5 seconds

  // Measure carousel width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [featuredTours]);

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (featuredTours.length > 0) {
        setCurrentIndex((prevIndex) =>
          prevIndex === featuredTours.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [featuredTours.length]);

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredTours.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredTours.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Calculate visible items with current in center
  const getVisibleTours = () => {
    if (featuredTours.length === 0) return [];

    const totalTours = featuredTours.length;
    const visibleItems = [];

    // Current item
    visibleItems.push({
      tour: featuredTours[currentIndex],
      position: "center",
      index: currentIndex,
    });

    // Left items (2 items)
    for (let i = 1; i <= 2; i++) {
      const index = (currentIndex - i + totalTours) % totalTours;
      visibleItems.unshift({
        tour: featuredTours[index],
        position: i === 1 ? "left-1" : "left-2",
        index,
      });
    }

    // Right items (2 items)
    for (let i = 1; i <= 2; i++) {
      const index = (currentIndex + i) % totalTours;
      visibleItems.push({
        tour: featuredTours[index],
        position: i === 1 ? "right-1" : "right-2",
        index,
      });
    }

    return visibleItems;
  };

  const visibleTours = getVisibleTours();

  return (
    <section className="section-padding bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">ทัวร์ยอดนิยม</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ร่วมสัมผัสประสบการณ์ท่องเที่ยวกับแพ็คเกจทัวร์ยอดนิยมของเรา
            ที่คัดสรรมาเพื่อคุณโดยเฉพาะ
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative my-12 px-4 md:px-20">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            aria-label="Previous tour"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          {/* Carousel */}
          <div ref={carouselRef} className="overflow-hidden relative h-[600px]">
            <div className="flex justify-center items-center h-full relative">
              {visibleTours.map(({ tour, position, index }) => (
                <div
                  key={tour.id}
                  className={`absolute transition-all duration-500 ease-in-out ${
                    position === "center"
                      ? "z-10 scale-100 opacity-100"
                      : position === "left-1" || position === "right-1"
                      ? "z-5 scale-85 opacity-90"
                      : "z-0 scale-70 opacity-50"
                  } ${
                    position === "center"
                      ? "translate-x-0"
                      : position === "left-1"
                      ? "-translate-x-[280px]"
                      : position === "left-2"
                      ? "-translate-x-[450px]"
                      : position === "right-1"
                      ? "translate-x-[280px]"
                      : "translate-x-[450px]"
                  }`}
                >
                  <TourSlideCard tour={tour} isActive={position === "center"} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            aria-label="Next tour"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {featuredTours.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            to="/krabi"
            className="inline-block px-8 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-lg"
          >
            ดูทัวร์ทั้งหมด
          </Link>
        </div>
      </div>
    </section>
  );
};

// Tour slide card component
const TourSlideCard = ({ tour, isActive }) => {
  const {
    id,
    title,
    image,
    location,
    price,
    oldPrice,
    duration,
    rating,
    description,
    link,
  } = tour;

  return (
    <div
      className={`w-[400px] rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
        isActive ? "shadow-xl" : "shadow-md"
      }`}
    >
      <Link to={link} className="block relative overflow-hidden h-[260px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {oldPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
            ส่วนลด {Math.round(((oldPrice - price) / oldPrice) * 100)}%
          </div>
        )}
      </Link>

      <div className="p-5 bg-white">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1 text-primary" />
            <span>{location}</span>
          </div>
          <div className="ml-auto flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>

        <Link to={link}>
          <h3 className="font-semibold text-xl mb-2 hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {isActive && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <FaShip className="mr-1" />
          <span>{duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {oldPrice && (
              <span className="text-gray-500 line-through text-sm mr-2">
                ฿{oldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-primary font-bold text-2xl">
              ฿{price.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm">/ท่าน</span>
          </div>

          {isActive && (
            <Link
              to={link}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors text-sm font-medium"
            >
              ดูรายละเอียด
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedTours;
