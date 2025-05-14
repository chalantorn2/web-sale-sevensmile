import useTours from "../../../hooks/useTours";
import TourCard from "../../../components/TourCard";
import { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

const PhuketPackages = () => {
  const { tours, loading, error } = useTours("phuket");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOption, setSortOption] = useState("recommended");

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-10">
            กำลังโหลดแพ็คเกจทัวร์ภูเก็ต
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

  // Filter tours based on search term and price filter
  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (priceFilter === "all") return matchesSearch;
    if (priceFilter === "low" && tour.price < 1000) return matchesSearch;
    if (priceFilter === "medium" && tour.price >= 1000 && tour.price <= 2000)
      return matchesSearch;
    if (priceFilter === "high" && tour.price > 2000) return matchesSearch;

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

  return (
    <section className="section-padding bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">แพ็คเกจทัวร์ภูเก็ต</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            แพ็คเกจทัวร์ภูเก็ตหลากหลายเส้นทาง ทั้งทัวร์เกาะพีพี ทัวร์เจมส์บอนด์
            ทัวร์เมืองเก่า และอีกมากมาย ที่จะทำให้การท่องเที่ยวของคุณสมบูรณ์แบบ
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
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="all">ราคาทั้งหมด</option>
                  <option value="low">ต่ำกว่า 1,000 บาท</option>
                  <option value="medium">1,000 - 2,000 บาท</option>
                  <option value="high">มากกว่า 2,000 บาท</option>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PhuketPackages;
