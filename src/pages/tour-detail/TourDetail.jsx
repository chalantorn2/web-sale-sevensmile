import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";
import TourHero from "./components/TourHero";
import TourInfo from "./components/TourInfo";
import TourItinerary from "./components/TourItinerary";
import TourIncludes from "./components/TourIncludes";
import TourGallery from "./components/TourGallery";
import TourReviews from "./components/TourReviews";
import TourBooking from "./components/TourBooking";
import RelatedTours from "./components/RelatedTours";
import TourAdditionalInfo from "./components/TourAdditionalInfo";
import TourOptionSelector from "./components/TourOptionSelector";
import useTourDetail from "../../hooks/useTourDetail";
import "./TourDetail.css";

const TourDetail = () => {
  const { destination, tourSlug } = useParams();
  const navigate = useNavigate();
  const { tourData: tour, loading, error } = useTourDetail(tourSlug);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // useEffect แรก - โหลดข้อมูลทัวร์และตั้งค่าเริ่มต้น
  useEffect(() => {
    if (!tour) return;

    // เช็คว่า destination ตรงกันหรือไม่
    if (tour.destination !== destination) {
      navigate("/");
      return;
    }

    // ถ้ามี programs/options ให้เลือกตัวแรกเป็นค่าเริ่มต้น
    if (tour.options && tour.options.length > 0) {
      // ถ้าเป็นทัวร์ที่มี programs (เช่น ล่องแก่ง)
      if (tour.options[0].name && tour.options[0].name.includes("Program")) {
        setSelectedProgram(tour.options[0]);
        setSelectedOption(null);
      } else {
        // ถ้าเป็นทัวร์ที่มี options (เช่น เลือกเรือ)
        // สร้าง formatted option object
        const formattedOption = {
          id: tour.options[0].id,
          name: tour.options[0].name,
          price_modifier: Number(tour.options[0].price_modifier) || 0,
          description: tour.options[0].description,
          itinerary: tour.options[0].itinerary || [],
        };
        setSelectedOption(formattedOption);
        setSelectedProgram(null);
      }
    } else {
      setSelectedProgram(null);
      setSelectedOption(null);
    }
  }, [tour, destination, navigate]);

  // useEffect แยก - สำหรับอัพเดต SEO เมื่อราคาเปลี่ยน
  useEffect(() => {
    if (!tour) return;

    const currentPrice = getCurrentPrice();

    generateMetaTags(
      `${
        tour.title
      } | ราคา ${currentPrice.toLocaleString()} บาท | Seven Smile Tour`,
      tour.description,
      `ทัวร์${tour.location}, ${tour.title}, ราคา ${currentPrice} บาท, จองทัวร์${tour.location}, one day trip`
    );

    // Structured Data
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: tour.title,
      description: tour.description,
      image: tour.heroImage,
      offers: {
        "@type": "Offer",
        price: currentPrice,
        priceCurrency: "THB",
        availability: "https://schema.org/InStock",
        validFrom: new Date().toISOString(),
      },
      provider: {
        "@type": "TravelAgency",
        name: "Seven Smile Tour And Ticket",
        url: "https://www.sevensmiletour.com",
      },
      touristType: ["Family", "Couple", "Friends", "Solo"],
      itinerary: (tour.itinerary || []).map((item) => ({
        "@type": "Action",
        name: item.activity,
        description: item.description,
        startTime: item.time,
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: tour.rating,
        reviewCount: tour.reviewCount,
      },
    });

    // FAQ Schema
    if (tour.faqs && tour.faqs.length > 0) {
      generateStructuredData({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tour.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }
  }, [tour, selectedProgram, selectedOption]);

  // คำนวณราคาปัจจุบัน
  const getCurrentPrice = () => {
    if (!tour) return 0;

    let price = Number(tour.price) || 0;

    if (selectedProgram) {
      // สำหรับ programs (ล่องแก่ง) - ใช้ราคาจาก base + modifier
      const modifier = Number(selectedProgram.price_modifier) || 0;
      price = price + modifier;
    } else if (selectedOption) {
      // สำหรับ options (เรือ) - ใช้ราคาจาก base + modifier
      const modifier = Number(selectedOption.price_modifier) || 0;
      price = price + modifier;
    }

    return price;
  };

  const currentPrice = getCurrentPrice();

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูลทัวร์...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            กลับสู่หน้าแรก
          </Link>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ไม่พบทัวร์ที่คุณต้องการ
          </h1>
          <p className="text-gray-600 mb-8">
            ขออภัย ไม่พบข้อมูลทัวร์ที่คุณกำลังมองหา
          </p>
          <Link
            to="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            กลับสู่หน้าแรก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tour-detail">
      <TourHero
        tour={{
          ...tour,
          price: currentPrice,
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Program Selector - สำหรับทัวร์ที่มี programs (เช่น ล่องแก่ง) */}
        {tour?.options &&
          tour.options.length > 0 &&
          tour.options[0].name?.includes("Program") && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                เลือกโปรแกรม
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tour.options.map((program) => (
                  <div
                    key={program.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedProgram?.id === program.id
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedProgram(program)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-800">
                        {program.name}
                      </h4>
                      <span className="text-blue-600 font-bold">
                        ฿
                        {(
                          Number(tour.price) + Number(program.price_modifier)
                        ).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {program.description}
                    </p>
                    {program.itinerary && program.itinerary.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                        {program.itinerary.slice(0, 6).map((item, index) => (
                          <div key={index} className="flex items-start">
                            <span className="mr-2 text-green-600">•</span>
                            <span>{item.activity}</span>
                          </div>
                        ))}
                        {program.itinerary.length > 6 && (
                          <div className="text-sm text-gray-500 col-span-2">
                            และอีก {program.itinerary.length - 6} กิจกรรม...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Option Selector - สำหรับทัวร์ที่มี options (เช่น เลือกเรือ) */}
        {tour?.options &&
          tour.options.length > 0 &&
          !tour.options[0].name?.includes("Program") && (
            <TourOptionSelector
              tourSlug={tourSlug}
              options={tour.options}
              selectedOption={selectedOption}
              onOptionChange={setSelectedOption}
              basePrice={tour.price}
            />
          )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {tour && <TourInfo tour={tour} />}

            {/* Itinerary - แสดงตาม option/program ที่เลือก */}
            {(() => {
              let itinerary = [];

              if (
                selectedProgram &&
                selectedProgram.itinerary &&
                selectedProgram.itinerary.length > 0
              ) {
                // ใช้ itinerary จาก program ที่เลือก
                itinerary = selectedProgram.itinerary.map((item) => ({
                  time: item.time_slot,
                  activity: item.activity,
                  description: item.description,
                }));
              } else if (
                selectedOption &&
                selectedOption.itinerary &&
                selectedOption.itinerary.length > 0
              ) {
                // ใช้ itinerary จาก option ที่เลือก
                itinerary = selectedOption.itinerary.map((item) => ({
                  time: item.time_slot,
                  activity: item.activity,
                  description: item.description,
                }));
              } else if (tour.itinerary && tour.itinerary.length > 0) {
                // ใช้ itinerary หลัก
                itinerary = tour.itinerary;
              }

              console.log("Itinerary Debug:", {
                selectedProgram: selectedProgram?.name,
                selectedOption: selectedOption?.name,
                programItinerary: selectedProgram?.itinerary?.length || 0,
                optionItinerary: selectedOption?.itinerary?.length || 0,
                mainItinerary: tour.itinerary?.length || 0,
                finalItinerary: itinerary.length,
              });

              return itinerary.length > 0 ? (
                <TourItinerary itinerary={itinerary} />
              ) : (
                <div className="mb-12">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                      กำหนดการเดินทาง
                    </h2>
                    <p className="text-gray-600">
                      กำหนดการเดินทางจะแจ้งให้ทราบอีกครั้งก่อนเดินทาง
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Includes/Excludes */}
            {(tour.included ||
              tour.excluded ||
              tour.importantNotes ||
              tour.faqs) && (
              <TourIncludes
                included={tour.included || []}
                excluded={tour.excluded || []}
                importantNotes={tour.importantNotes || []}
                faqs={tour.faqs || []}
              />
            )}

            {/* Additional Info */}
            {(tour.whatToBring || tour.menuSamples) && (
              <TourAdditionalInfo
                whatToBring={tour.whatToBring}
                menuSamples={tour.menuSamples}
              />
            )}

            {/* Gallery */}
            {tour.gallery && <TourGallery gallery={tour.gallery} />}

            {/* Reviews */}
            {tour.reviews && tour.rating && tour.reviewCount && (
              <TourReviews
                reviews={tour.reviews || []}
                rating={tour.rating}
                reviewCount={tour.reviewCount}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TourBooking
              tour={{
                ...tour,
                price: currentPrice,
              }}
            />
          </div>
        </div>

        <RelatedTours currentTour={tour} />
      </div>
    </div>
  );
};

export default TourDetail;
