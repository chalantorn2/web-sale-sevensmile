import useTours from "../../../hooks/useTours";
import TourCard from "../../../components/TourCard";
import { useState } from "react";
import { FaFilter, FaSearch, FaGlobe } from "react-icons/fa";

const InternationalPackages = () => {
  const { tours, loading, error } = useTours("international");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortOption, setSortOption] = useState("recommended");

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-10">
            กำลังโหลดแพ็คเกจทัวร์ต่างประเทศ
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

  // Get unique regions from tours
  const regions = [...new Set(tours.map((tour) => tour.location))];

  // Filter tours based on search term, price filter, and region filter
  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRegion =
      regionFilter === "all" || tour.location === regionFilter;

    if (priceFilter === "all") return matchesSearch && matchesRegion;
    if (priceFilter === "low" && tour.price < 20000)
      return matchesSearch && matchesRegion;
    if (priceFilter === "medium" && tour.price >= 20000 && tour.price <= 40000)
      return matchesSearch && matchesRegion;
    if (priceFilter === "high" && tour.price > 40000)
      return matchesSearch && matchesRegion;

    return false;
  });

  // Sort tours based on selected option
  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortOption === "recommended") {
      return b.rating - a.rating;
    } else if (sortOption === "price-low") {
      return a.price - b.price;
    } else if (sortOption === "price-high") {
      return b.price - a.price;
    } else if (sortOption === "duration") {
      return a.duration.localeCompare(b.duration);
    }
    return 0;
  });

  // Group tours by region
  const toursByRegion = {};
  regions.forEach((region) => {
    toursByRegion[region] = sortedTours.filter(
      (tour) => tour.location === region
    );
  });

  return (
    <section className="section-padding bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">
            แพ็คเกจทัวร์ต่างประเทศ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            เลือกแพ็คเกจทัวร์ต่างประเทศที่ตรงใจคุณ หลากหลายเส้นทาง หลายระดับราคา
            ตอบโจทย์ทุกความต้องการ
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาแพ็คเกจทัวร์"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Filter and Sort */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <div className="relative">
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="all">ทุกภูมิภาค</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <FaGlobe className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="all">ราคาทั้งหมด</option>
                  <option value="low">ต่ำกว่า 20,000 บาท</option>
                  <option value="medium">20,000 - 40,000 บาท</option>
                  <option value="high">มากกว่า 40,000 บาท</option>
                </select>
                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="recommended">แนะนำ</option>
                <option value="price-low">ราคาต่ำสุดก่อน</option>
                <option value="price-high">ราคาสูงสุดก่อน</option>
                <option value="duration">ระยะเวลา</option>
              </select>
            </div>
          </div>
        </div>

        {sortedTours.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2">
              ไม่พบทัวร์ที่ตรงกับเงื่อนไขการค้นหา
            </h3>
            <p className="text-gray-600">
              โปรดลองใช้คำค้นหาอื่น หรือเปลี่ยนตัวกรองราคา
            </p>
          </div>
        ) : regionFilter !== "all" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          // Display tours grouped by region
          <div className="space-y-12">
            {Object.keys(toursByRegion).map((region) =>
              toursByRegion[region].length > 0 ? (
                <div key={region}>
                  <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
                    {region}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {toursByRegion[region].map((tour) => (
                      <TourCard key={tour.id} tour={tour} />
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}

        <div className="bg-white mt-12 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">
            บริการเสริมสำหรับทัวร์ต่างประเทศ
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>บริการทำวีซ่าทุกประเภท โดยผู้เชี่ยวชาญ</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>ประกันการเดินทางครอบคลุมทุกกรณี</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>ซิมการ์ดหรือ Pocket WiFi ให้ใช้ระหว่างเดินทาง</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>บริการแลกเงินสกุลต่างๆ ในอัตราพิเศษ</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>บริการจองตั๋วเครื่องบินเดี่ยว ราคาพิเศษ</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>บริการเช่ารถในต่างประเทศ</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InternationalPackages;
