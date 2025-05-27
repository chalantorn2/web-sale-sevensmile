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

    // Enhanced SEO Meta Tags สำหรับ keyword "ทัวร์กระบี่"
    const price = foundTour.programs
      ? foundTour.programs[0].price
      : foundTour.price;

    // สร้าง title ที่เน้น keyword ทัวร์กระบี่
    const seoTitle =
      destination === "krabi"
        ? `${
            foundTour.title
          } | ทัวร์กระบี่ ราคา ${price.toLocaleString()} บาท | Seven Smile Tour`
        : `${
            foundTour.title
          } | ราคา ${price.toLocaleString()} บาท | Seven Smile Tour`;

    // สร้าง description ที่เน้น keyword
    const seoDescription =
      destination === "krabi"
        ? `จองทัวร์กระบี่ ${
            foundTour.title
          } ราคาเริ่มต้น ${price.toLocaleString()} บาท ${
            foundTour.programs ? "เลือกเรือได้ 2 แบบ หางยาวและสปีดโบ๊ท" : ""
          } บริการดี ไกด์มืออาชีพ ประกันครบ`
        : foundTour.description;

    // สร้าง keywords ที่เน้น ทัวร์กระบี่
    const seoKeywords =
      destination === "krabi"
        ? `ทัวร์กระบี่, ${
            foundTour.title
          }, ราคา ${price} บาท, จองทัวร์กระบี่, ${
            foundTour.programs ? "เรือหางยาว, เรือสปีดโบ๊ท," : ""
          } one day trip กระบี่, ทัวร์วันเดียวกระบี่, Seven Smile Tour`
        : `ทัวร์${foundTour.location}, ${foundTour.title}, ราคา ${price} บาท, จองทัวร์${foundTour.location}, one day trip`;

    generateMetaTags(seoTitle, seoDescription, seoKeywords);

    // Enhanced Structured Data for SEO
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: foundTour.title,
      description: foundTour.description,
      image: [foundTour.heroImage],
      url: `https://www.sevensmiletour.com/tours/${destination}/${tourSlug}`,
      provider: {
        "@type": "TravelAgency",
        name: "Seven Smile Tour And Ticket",
        url: "https://www.sevensmiletour.com",
        telephone: "+66-95-265-5516",
        address: {
          "@type": "PostalAddress",
          streetAddress: "83 ถ.พังงา",
          addressLocality: "ภูเก็ต",
          addressRegion: "ภูเก็ต",
          postalCode: "83000",
          addressCountry: "TH",
        },
      },
      offers: foundTour.programs
        ? foundTour.programs.map((program) => ({
            "@type": "Offer",
            name: `${foundTour.title} - ${program.name}`,
            description: program.description,
            price: program.price,
            priceCurrency: "THB",
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
            itemOffered: {
              "@type": "Service",
              name: `${foundTour.title} - ${program.name}`,
              description: program.description,
            },
          }))
        : [
            {
              "@type": "Offer",
              name: foundTour.title,
              price: foundTour.price,
              priceCurrency: "THB",
              availability: "https://schema.org/InStock",
              validFrom: new Date().toISOString(),
            },
          ],
      duration: foundTour.duration,
      touristType: ["Family", "Couple", "Friends", "Solo"],
      itinerary: (foundTour.programs
        ? foundTour.programs[0].itinerary
        : foundTour.itinerary || []
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
        bestRating: 5,
        worstRating: 1,
      },
      review: foundTour.reviews
        ? foundTour.reviews.map((review) => ({
            "@type": "Review",
            author: {
              "@type": "Person",
              name: review.name,
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: 5,
            },
            reviewBody: review.comment,
            datePublished: review.date,
          }))
        : [],
      locationCreated: {
        "@type": "Place",
        name: foundTour.location,
        geo: {
          "@type": "GeoCoordinates",
          latitude:
            destination === "krabi"
              ? "8.0863"
              : destination === "phuket"
              ? "7.8804"
              : "8.4304",
          longitude:
            destination === "krabi"
              ? "98.9063"
              : destination === "phuket"
              ? "98.3923"
              : "98.5214",
        },
      },
    });

    // FAQ Schema สำหรับ SEO
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

    // Breadcrumb Schema
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "หน้าแรก",
          item: "https://www.sevensmiletour.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `ทัวร์${foundTour.location}`,
          item: `https://www.sevensmiletour.com/${destination}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: foundTour.title,
          item: `https://www.sevensmiletour.com/tours/${destination}/${tourSlug}`,
        },
      ],
    });
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
        {/* Enhanced Program Selector for Boat Types */}
        {tour?.programs && tour.programs.length > 0 && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="text-blue-600 mr-2">🚤</span>
              เลือกประเภทเรือ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tour.programs.map((program) => (
                <div
                  key={program.name}
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedProgram?.name === program.name
                      ? "border-blue-500 bg-blue-50 shadow-lg transform scale-105"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedProgram(program)}
                >
                  {/* ป้าย Recommended หรือ Popular */}
                  {program.boatType === "speedboat" && (
                    <div className="absolute -top-3 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      ยอดนิยม
                    </div>
                  )}
                  {program.boatType === "longtail" && (
                    <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      ประหยัด
                    </div>
                  )}

                  {/* ชื่อและราคา */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-1">
                        {program.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {program.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        ฿{program.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">/ท่าน</div>
                    </div>
                  </div>

                  {/* ข้อดี */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-700 mb-2">ข้อดี:</h5>
                    <div className="grid grid-cols-1 gap-1">
                      {program.advantages?.map((advantage, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Radio button indicator */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedProgram?.name === program.name
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedProgram?.name === program.name && (
                        <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                      )}
                    </div>

                    <div className="text-sm text-gray-500">
                      {program.boatType === "speedboat"
                        ? "⚡ เร็ว สะดวก"
                        : "🌊 สัมผัสท้องถิ่น"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ตารางเปรียบเทียบ */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">
                ตารางเปรียบเทียบ
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">รายการ</th>
                      <th className="text-center py-2">เรือหางยาว</th>
                      <th className="text-center py-2">เรือสปีดโบ๊ท</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">ราคา</td>
                      <td className="text-center py-2 text-green-600 font-semibold">
                        ประหยัดกว่า
                      </td>
                      <td className="text-center py-2">มาตรฐาน</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">ความเร็ว</td>
                      <td className="text-center py-2">ปานกลาง</td>
                      <td className="text-center py-2 text-blue-600 font-semibold">
                        เร็วกว่า
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">ประสบการณ์</td>
                      <td className="text-center py-2 text-orange-600 font-semibold">
                        แบบดั้งเดิม
                      </td>
                      <td className="text-center py-2">ทันสมัย</td>
                    </tr>
                    <tr>
                      <td className="py-2">ความสะดวกสบาย</td>
                      <td className="text-center py-2">ดี</td>
                      <td className="text-center py-2 text-purple-600 font-semibold">
                        ดีมาก
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
