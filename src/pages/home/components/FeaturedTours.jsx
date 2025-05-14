import { Link } from "react-router-dom";
import useTours from "../../../hooks/useTours";
import TourCard from "../../../components/TourCard";

const FeaturedTours = () => {
  // Get featured tours from all destinations
  const { tours, loading, error } = useTours(null, 20);

  const featuredTours = tours.filter((tour) => tour.featured).slice(0, 6);
  const krabiTours = tours
    .filter((tour) => tour.destination === "krabi")
    .slice(0, 3);
  const phuketTours = tours
    .filter((tour) => tour.destination === "phuket")
    .slice(0, 3);
  const phangNgaTours = tours
    .filter((tour) => tour.destination === "phang-nga")
    .slice(0, 3);

  if (loading) {
    return (
      <section className="section-padding bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-10">
            กำลังโหลดทัวร์ยอดนิยม
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            ทัวร์จังหวัดยอดฮิต
          </h2>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium">ทัวร์กระบี่</h3>
              <Link
                to="/krabi"
                className="text-primary font-medium hover:text-primary-dark transition-colors"
              >
                ดูทั้งหมด
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {krabiTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium">ทัวร์ภูเก็ต</h3>
              <Link
                to="/phuket"
                className="text-primary font-medium hover:text-primary-dark transition-colors"
              >
                ดูทั้งหมด
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phuketTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium">ทัวร์พังงา</h3>
              <Link
                to="/phang-nga"
                className="text-primary font-medium hover:text-primary-dark transition-colors"
              >
                ดูทั้งหมด
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phangNgaTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
