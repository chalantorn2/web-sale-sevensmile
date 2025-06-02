import useTours from "../../../hooks/useTours";
import TourCard from "../../../components/TourCard";
import { useState } from "react";
import { FaFilter, FaSearch, FaStar, FaFire } from "react-icons/fa";

const KrabiPackages = () => {
  const { tours, loading, error } = useTours("krabi");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOption, setSortOption] = useState("recommended");

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-10">
            กำลังโหลดแพ็คเกจทัวร์กระบี่
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading tours:", error);
  }

  // Enhanced filtering with tour type
  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Type filter
    let matchesType = true;
    if (typeFilter !== "all") {
      const titleLower = tour.title.toLowerCase();
      if (typeFilter === "island") {
        matchesType =
          titleLower.includes("เกาะ") || titleLower.includes("island");
      } else if (typeFilter === "land") {
        matchesType =
          titleLower.includes("ซิตี้") ||
          titleLower.includes("จังเกิ้ล") ||
          titleLower.includes("city") ||
          titleLower.includes("jungle");
      } else if (typeFilter === "sunset") {
        matchesType =
          titleLower.includes("พระอาทิตย์ตก") ||
          titleLower.includes("sunset") ||
          titleLower.includes("บาร์บีคิว");
      }
    }

    // Price filter
    let matchesPrice = true;
    if (priceFilter !== "all") {
      if (priceFilter === "budget" && tour.price >= 1000) matchesPrice = false;
      if (priceFilter === "mid" && (tour.price < 1000 || tour.price > 1500))
        matchesPrice = false;
      if (priceFilter === "premium" && tour.price <= 1500) matchesPrice = false;
    }

    return matchesSearch && matchesType && matchesPrice;
  });

  // Enhanced sorting - Featured first, then by popularity (reviews), then by price
  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortOption === "recommended") {
      // Featured tours first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Then by review count (popularity)
      if (a.reviewCount !== b.reviewCount) {
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      }

      // Then by rating
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortOption === "price-low") {
      return a.price - b.price;
    } else if (sortOption === "price-high") {
      return b.price - a.price;
    } else if (sortOption === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortOption === "reviews") {
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    }
    return 0;
  });

  // Get tour type counts for filter display
  const tourTypeCounts = {
    island: tours.filter(
      (tour) =>
        tour.title.toLowerCase().includes("เกาะ") ||
        tour.title.toLowerCase().includes("island")
    ).length,
    land: tours.filter(
      (tour) =>
        tour.title.toLowerCase().includes("ซิตี้") ||
        tour.title.toLowerCase().includes("จังเกิ้ล") ||
        tour.title.toLowerCase().includes("city") ||
        tour.title.toLowerCase().includes("jungle")
    ).length,
    sunset: tours.filter(
      (tour) =>
        tour.title.toLowerCase().includes("พระอาทิตย์ตก") ||
        tour.title.toLowerCase().includes("sunset") ||
        tour.title.toLowerCase().includes("บาร์บีคิว")
    ).length,
  };

  return (
    <section className="section-padding bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">แพ็คเกจทัวร์กระบี่</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ค้นพบความงดงามของทะเลกระบี่กับแพ็คเกจทัวร์หลากหลายเส้นทาง
            ทั้งทัวร์เกาะสวย ทัวร์ธรรมชาติ และทัวร์ชมพระอาทิตย์ตก
            ที่จะทำให้การท่องเที่ยวของคุณสมบูรณ์แบบ
          </p>
        </div>

        {/* Enhanced Filter Bar */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาทัวร์กระบี่ที่คุณสนใจ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                />
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Tour Type Filter */}
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white min-w-[140px]"
                >
                  <option value="all">ทุกประเภท</option>
                  <option value="island">
                    ทัวร์เกาะ ({tourTypeCounts.island})
                  </option>
                  <option value="land">ทัวร์บก ({tourTypeCounts.land})</option>
                  <option value="sunset">
                    ทัวร์พระอาทิตย์ตก ({tourTypeCounts.sunset})
                  </option>
                </select>
                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white min-w-[140px]"
                >
                  <option value="all">ราคาทั้งหมด</option>
                  <option value="budget">ประหยัด (ต่ำกว่า 1,000฿)</option>
                  <option value="mid">ปานกลาง (1,000-1,500฿)</option>
                  <option value="premium">พรีเมียม (มากกว่า 1,500฿)</option>
                </select>
                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Sort Options */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white min-w-[140px]"
                >
                  <option value="recommended">แนะนำ</option>
                  <option value="reviews">ยอดนิยม (รีวิวมากสุด)</option>
                  <option value="rating">คะแนนสูงสุด</option>
                  <option value="price-low">ราคาต่ำสุดก่อน</option>
                  <option value="price-high">ราคาสูงสุดก่อน</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="ml-auto text-sm text-gray-600">
                พบ {sortedTours.length} ทัวร์
              </div>
            </div>
          </div>
        </div>

        {/* Tour Grid */}
        {sortedTours.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">🔍</div>
            <h3 className="text-xl font-medium mb-2 text-gray-800">
              ไม่พบทัวร์ที่ตรงกับเงื่อนไขการค้นหา
            </h3>
            <p className="text-gray-600 mb-6">
              ลองปรับเปลี่ยนคำค้นหาหรือตัวกรอง หรือ
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
                setTypeFilter("all");
              }}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              ดูทัวร์ทั้งหมด
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTours.map((tour) => (
              <div key={tour.id} className="relative">
                {/* Enhanced Tour Card */}
                <div className="rounded-lg overflow-hidden bg-white shadow-custom hover-scale">
                  {/* Tour Image */}
                  <div className="relative">
                    <img
                      src={tour.image}
                      alt={`ทัวร์กระบี่ ${tour.title}`}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {tour.featured && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                          <FaFire className="mr-1" />
                          แนะนำ
                        </span>
                      )}
                    </div>

                    {/* Discount Badge */}
                    {tour.oldPrice && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                        ส่วนลด{" "}
                        {Math.round(
                          ((tour.oldPrice - tour.price) / tour.oldPrice) * 100
                        )}
                        %
                      </div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-sm flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      {tour.rating}
                    </div>
                  </div>

                  {/* Tour Content */}
                  <div className="p-4">
                    {/* Tour Title */}
                    <h3 className="font-medium text-lg mb-2 text-gray-800 line-clamp-2">
                      {tour.title}
                    </h3>

                    {/* Tour Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>{tour.duration}</span>
                      {tour.reviewCount && (
                        <span className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          {tour.reviewCount} รีวิว
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {tour.oldPrice && (
                          <span className="text-gray-500 line-through text-sm mr-2">
                            ฿{tour.oldPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-primary font-bold text-xl">
                          ฿{tour.price.toLocaleString()}
                        </span>
                        <span className="text-gray-600 text-sm">/ท่าน</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={tour.link}
                      className="block w-full bg-primary text-white text-center py-2 rounded hover:bg-primary-dark transition-colors font-medium"
                    >
                      ดูรายละเอียดและจอง
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Info Section */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            ทำไมต้องเลือกทัวร์กระบี่กับเรา?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h4 className="font-semibold text-lg mb-2">
                คุณภาพระดับพรีเมียม
              </h4>
              <p className="text-gray-600 text-sm">
                เรือสปีดโบ๊ทที่ทันสมัย ไกด์มืออาชีพ และบริการระดับ 5 ดาว
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="font-semibold text-lg mb-2">ราคาคุ้มค่าที่สุด</h4>
              <p className="text-gray-600 text-sm">
                รับประกันราคาดีที่สุด ไม่มีค่าใช้จ่ายแอบแฝง
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="font-semibold text-lg mb-2">ปลอดภัยมั่นใจ</h4>
              <p className="text-gray-600 text-sm">
                ประกันภัยครอบคลุม อุปกรณ์ความปลอดภัยครบครัน
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <strong>ทัวร์กระบี่</strong> ที่ดีที่สุดกับ Seven Smile Tour -
            ผู้เชี่ยวชาญด้านทัวร์กระบี่มากกว่า 10 ปี พาคุณสำรวจ
            <strong>เกาะ 4 เกาะ</strong>, <strong>เกาะพีพี</strong>,{" "}
            <strong>เกาะห้อง</strong>
            และสถานที่ท่องเที่ยวกระบี่ยอดนิยมอื่นๆ
            ด้วยราคาที่คุ้มค่าและบริการที่ประทับใจ
            จองทัวร์กระบี่วันนี้รับส่วนลดพิเศษ!
          </p>
        </div>
      </div>
    </section>
  );
};

export default KrabiPackages;
