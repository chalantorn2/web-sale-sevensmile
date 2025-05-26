import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { krabiTours } from "./data/krabi";
import { phuketTours } from "./data/phuket";
import { phangNgaTours } from "./data/phang_nga";
import "./TourDetail.css";

const TourDetail = () => {
  const { destination, tourSlug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  const allTours = {
    ...krabiTours,
    ...phuketTours,
    ...phangNgaTours,
  };

  useEffect(() => {
    const foundTour = allTours[tourSlug];

    if (!foundTour || foundTour.destination !== destination) {
      navigate("/");
      return;
    }

    setTour(foundTour);
    // ถ้ามี programs ให้เลือกโปรแกรมแรกเป็นค่าเริ่มต้น
    if (foundTour.programs && foundTour.programs.length > 0) {
      setSelectedProgram(foundTour.programs[0]);
    } else {
      setSelectedProgram(null);
    }
    setLoading(false);

    // SEO Meta Tags
    const price = foundTour.programs
      ? foundTour.programs[0].price
      : foundTour.price;
    generateMetaTags(
      `${
        foundTour.title
      } | ราคา ${price.toLocaleString()} บาท | Seven Smile Tour`,
      foundTour.description,
      `ทัวร์${foundTour.location}, ${foundTour.title}, ราคา ${price} บาท, จองทัวร์${foundTour.location}, one day trip`
    );

    // Structured Data
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: foundTour.title,
      description: foundTour.description,
      image: foundTour.heroImage,
      offers: {
        "@type": "Offer",
        price: price,
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
      itinerary: (foundTour.programs
        ? foundTour.programs[0].itinerary
        : foundTour.itinerary
      ).map((item) => ({
        "@type": "Action",
        name: item.activity,
        description: item.description,
        startTime: item.time,
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: foundTour.rating,
        reviewCount: foundTour.reviewCount,
      },
    });

    // FAQ Schema
    if (foundTour.faqs && foundTour.faqs.length > 0) {
      generateStructuredData({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: foundTour.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }
  }, [tourSlug, destination, navigate]);

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
          price: selectedProgram ? selectedProgram.price : tour.price,
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Program Selector */}
        {tour?.programs && tour.programs.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              เลือกโปรแกรม
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tour.programs.map((program) => (
                <div
                  key={program.name}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedProgram?.name === program.name
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
                      ฿{program.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                    {program.itinerary.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="mr-2 text-green-600">•</span>
                        <span>{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {tour && <TourInfo tour={tour} />}
            {(selectedProgram ? selectedProgram.itinerary : tour.itinerary) && (
              <TourItinerary
                itinerary={
                  selectedProgram ? selectedProgram.itinerary : tour.itinerary
                }
              />
            )}
            {(tour.included ||
              tour.excluded ||
              tour.importantNotes ||
              tour.faqs) && (
              <TourIncludes
                included={
                  selectedProgram
                    ? selectedProgram.included
                    : tour.included || []
                }
                excluded={tour.excluded || []}
                importantNotes={tour.importantNotes || []}
                faqs={tour.faqs || []}
              />
            )}
            {(tour.whatToBring || tour.menuSamples) && (
              <TourAdditionalInfo
                whatToBring={tour.whatToBring}
                menuSamples={tour.menuSamples}
              />
            )}
            {tour.gallery && <TourGallery gallery={tour.gallery} />}
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
                price: selectedProgram ? selectedProgram.price : tour.price,
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
