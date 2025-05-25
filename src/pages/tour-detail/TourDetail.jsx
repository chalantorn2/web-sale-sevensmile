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
import "./TourDetail.css";

const TourDetail = () => {
  const { destination, tourSlug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  // ข้อมูลทัวร์ทั้งหมด
  const allTours = {
    "four-islands-speedboat": {
      id: "four-islands-krabi",
      title: "ทัวร์ 4 เกาะกระบี่ เรือสปีดโบ๊ท",
      slug: "four-islands-speedboat",
      destination: "krabi",
      location: "กระบี่",
      price: 1000,
      oldPrice: 1399,
      duration: "1 วัน ",
      rating: 4.8,
      reviewCount: 324,
      heroImage: "/images/tours/four-islands-hero.jpg",
      description:
        "สัมผัสความงดงามของ 4 เกาะสุดสวยในทะเลกระบี่ ด้วยเรือสปีดโบ๊ทที่ทันสมัย เยือนเกาะปอดะ เกาะไก่ ทะเลแหวก และเกาะทับ พร้อมชมหินไก่สุดประทับใจ และดำน้ำชมปะการังสีสันสวยงาม",
      highlights: [
        "เกาะปอดะ - หาดทรายขาวสวยงาม น้ำทะเลใสเป็นแก้ว",
        "เกาะไก่ - ชมหินไก่ที่มีชื่อเสียงระดับโลก",
        "ทะเลแหวก - ปรากฏการณ์ธรรมชาติที่น่าอัศจรรย์",
        "ถ้ำพระนาง - ชมความงาม หินงอก หินย้อย",
        "เรือสปีดโบ๊ท ปลอดภัย มีใบรับรองมาตรฐาน",
        "ไกด์ท้องถิ่นมืออาชีพ พูดภาษาไทยชัดเจน",
      ],
      itinerary: [
        {
          time: "08:00 น.",
          activity: "รับจากโรงแรม",
          description: "รับจากโรงแรมที่พักของลูกค้า",
        },
        {
          time: "09:00 - 09:15 น.",
          activity: "ออกเดินทางด้วยเรือสปีดโบ๊ท",
          description:
            "ออกเดินทางด้วยเรือสปีดโบ้ทจากหาดนพรัตน์ธารา มุ่งหน้าสู่ทัวร์ 4 เกาะ",
        },
        {
          time: "",
          activity: "ถ้ำพระนาง",
          description:
            "(อ่าวไร่เลย์ ตะวันตก) ชมความงาม หินงอก หินย้อย และถ้ำเล็ก ๆ ที่เป็นที่ตั้งของศาลพระนาง ซึ่งเป็นที่ศักการะบูชาของชาวกระบี่",
        },
        {
          time: "",
          activity: "ทะเลแหวก",
          description:
            "หนึ่งในสิ่งมหัศจรรย์ของจังหวัดกระบี่ ที่นักท่องเที่ยว สามารถเดินบนหาดทรายข้ามจากเกาะหนึ่ง ไปยังอีกเกาะหนึ่งได้(สันทรายจะเชื่อมกันเฉพาะช่วงน้ำลงเท่านั้น)",
        },
        {
          time: "",
          activity: "เกาะไก่",
          description:
            "เเวะถ่ายรูปกับเกาะไก่ เกาะที่มีหินรูปคล้ายหัวไก่ หลังจากนั้น มุ่งหน้าสู่จุดดำน้ำตื้น ซึ่งท่านจะได้สนุกสนานกับการดำน้ำดูปลาและปะการัง",
        },
        {
          time: "",
          activity: "เกาะปอดะ",
          description:
            "เกาะปอดะ เป็นเกาะที่ใหญ่ หาดทรายขาว พื้นที่กว้าง แวะรับประทานอาหารเที่ยง เล่นน้ำหน้าหาด หรือ พักผ่อนตามอัธยาศัย",
        },
        {
          time: "14.30 น.",
          activity: "กลับท่าเรือ",
          description: "กลับถึงท่าเรือหาดนพรัตน์ธาราอย่างปลอดภัย",
        },
      ],
      included: [
        "รถรับ - ส่ง จากโรงแรมถึงท่าเรือ",
        "เรือสปีดโบ๊ทพร้อมนักขับมืออาชีพ",
        "อาหารกลางวัน 1 มื้อ",
        "อุปกรณ์ดำน้ำ หน้ากากดำน้ำ",
        "เสื้อชูชีพมาตรฐาน",
        "ประกันภัยการเดินทาง",
        "ไกด์ท้องถิ่น พูดภาษาไทย",
        "น้ำดื่ม และเครื่องดื่มเย็น",
        "ผลไม้ตามฤดูกาล",
      ],
      excluded: ["ค่าทิปไกด์ (ตามใจศรัทธา)", "ค่าใช้จ่ายส่วนตัว"],
      whatToBring: [
        "ครีมกันแดด",
        "กล้องถ่ายรูป",
        "ชุดว่ายน้ำ",
        "ผ้าขนหนู",
        // ...
      ],
      menuSamples: {
        lunch: [
          "แกงเขียวหวาน หรือแกงมัสมั่น",
          "ผัดผักรวม",
          "ข้าวสวย",
          "ปอเปี๊ยะผักทอด",
          "ผลไม้สดตามฤดูกาล",
        ],
      },
      gallery: [
        {
          src: "/images/tours/four-islands/gallery1.jpg",
          alt: "เกาะปอดะ หาดทรายขาว",
          caption: "เกาะปอดะ - หาดทรายขาวสวยงาม",
        },
        {
          src: "/images/tours/four-islands/gallery2.jpg",
          alt: "หินไก่ เกาะไก่",
          caption: "หินไก่ที่มีชื่อเสียงของเกาะไก่",
        },
        {
          src: "/images/tours/four-islands/gallery3.jpg",
          alt: "ทะเลแหวก",
          caption: "ทะเลแหวก - ปรากฏการณ์ธรรมชาติ",
        },
        {
          src: "/images/tours/four-islands/gallery4.jpg",
          alt: "ถ้ำพระนาง",
          caption: "ชมความงาม หินงอก หินย้อย",
        },
        {
          src: "/images/tours/four-islands/gallery5.jpg",
          alt: "เรือสปีดโบ๊ท",
          caption: "เรือสปีดโบ๊ทใหม่ปลอดภัย",
        },
        {
          src: "/images/tours/four-islands/gallery6.jpg",
          alt: "อาหารกลางวัน",
          caption: "อาหารกลางวันอร่อยๆ",
        },
      ],
      reviews: [
        {
          id: 1,
          name: "คุณสมชาย",
          rating: 5,
          date: "2024-03-15",
          comment:
            "ทริปสุดประทับใจเลยครับ ไกด์น่ารัก เอาใจใส่ดี ทะเลสวยมาก อาหารอร่อย คุ้มค่ามากๆ",
          avatar: "/images/avatars/avatar1.jpg",
        },
        {
          id: 2,
          name: "คุณมาลี",
          rating: 5,
          date: "2024-03-10",
          comment:
            "พาครอบครัวไป เด็กๆ สนุกมาก ปลอดภัยดี เรือใหม่สะอาด จะกลับมาใช้บริการอีกแน่นอน",
          avatar: "/images/avatars/avatar2.jpg",
        },
        {
          id: 3,
          name: "คุณสุชาติ",
          rating: 4,
          date: "2024-03-05",
          comment:
            "โดยรวมดีครับ จุดเด่นคือเรือเร็วและไกด์เก่ง แต่อยากให้เวลาในแต่ละเกาะนานขึ้นหน่อย",
          avatar: "/images/avatars/avatar3.jpg",
        },
      ],
      importantNotes: [
        "ทัวร์นี้ขึ้นอยู่กับสภาพอากาศ หากฝนตกหนักหรือคลื่นลมแรง อาจต้องเลื่อนหรือยกเลิก",
        "ผู้ที่มีโรคหัวใจ โรคความดันโลหิต หรือโรคประจำตัว ควรปรึกษาแพทย์ก่อนเดินทาง",
        "ไม่แนะนำสำหรับหญิงมีครรภ์ และเด็กต่ำกว่า 4 ขวบ",
        "ควรใส่ชุดว่ายน้ำมาล่วงหน้า เพื่อความสะดวกในการเล่นน้ำ",
        "นำครีมกันแดด หมวก แว่นตากันแดด และเสื้อผ้าเปลี่ยน",
        "ทะเลแหวกจะปรากฏเฉพาะช่วงน้ำลง หากน้ำขึ้นจะไม่เห็นชัดเจน",
      ],
      faqs: [
        {
          question: "เรือสปีดโบ๊ทปลอดภัยหรือไม่?",
          answer:
            "เรือของเรามีใบรับรองความปลอดภัยครบถ้วน ตรวจสอบทุก 6 เดือน มีเสื้อชูชีพสำหรับทุกคน และมีอุปกรณ์ความปลอดภัยครบครัน",
        },
        {
          question: "หากไม่ว่ายน้ำเป็นสามารถไปได้หรือไม่?",
          answer:
            "ได้ครับ เรามีเสื้อชูชีพให้ทุกคน และไกด์จะดูแลอย่างใกล้ชิด สำหรับการดำน้ำจะอยู่ในน้ำตื้นเท่านั้น",
        },
        {
          question: "สามารถยกเลิกทัวร์ได้หรือไม่?",
          answer:
            "สามารถยกเลิกได้ หากแจ้งล่วงหน้า 24 ชั่วโมง จะคืนเงิน 100% หากแจ้งภายใน 24 ชั่วโมง จะคิดค่าใช้จ่าย 50%",
        },
      ],
    },
    "phi-phi-speedboat": {
      // ข้อมูลทัวร์เกาะพีพี...
      id: "phi-phi-krabi",
      title: "ทัวร์เกาะพีพี อ่าวมาหยา เรือสปีดโบ๊ท",
      slug: "phi-phi-speedboat",
      destination: "krabi",
      location: "กระบี่",
      price: 1500,
      oldPrice: 1899,
      duration: "1 วัน (9 ชั่วโมง)",
      rating: 4.9,
      reviewCount: 456,
      heroImage: "/images/tours/phi-phi-hero.jpg",
      description:
        "เที่ยวเกาะพีพี สวรรค์แห่งอันดามัน ชมอ่าวมาหยาที่มีชื่อเสียงจากภาพยนตร์ The Beach",
      // ... เนื้อหาเหมือนกัน
    },
  };

  useEffect(() => {
    // หาข้อมูลทัวร์จาก slug
    const foundTour = allTours[tourSlug];

    if (!foundTour || foundTour.destination !== destination) {
      navigate("/");
      return;
    }

    setTour(foundTour);
    setLoading(false);

    // SEO Meta Tags
    generateMetaTags(
      `${
        foundTour.title
      } | ราคา ${foundTour.price.toLocaleString()} บาท | Seven Smile Tour`,
      foundTour.description,
      `ทัวร์${foundTour.location}, ${foundTour.title}, ราคา ${foundTour.price} บาท, จองทัวร์${foundTour.location}, เรือสปีดโบ๊ท, one day trip`
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
        price: foundTour.price,
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
      itinerary: foundTour.itinerary.map((item) => ({
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
      <TourHero tour={tour} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {tour && <TourInfo tour={tour} />}
            {tour?.itinerary && <TourItinerary itinerary={tour.itinerary} />}
            {(tour?.included ||
              tour?.excluded ||
              tour?.importantNotes ||
              tour?.faqs) && (
              <TourIncludes
                included={tour.included || []}
                excluded={tour.excluded || []}
                importantNotes={tour.importantNotes || []}
                faqs={tour.faqs || []}
              />
            )}
            {(tour?.whatToBring || tour?.menuSamples) && (
              <TourAdditionalInfo
                whatToBring={tour.whatToBring}
                menuSamples={tour.menuSamples}
              />
            )}
            {tour?.gallery && <TourGallery gallery={tour.gallery} />}
            {tour?.reviews && tour?.rating && tour?.reviewCount && (
              <TourReviews
                reviews={tour.reviews || []}
                rating={tour.rating}
                reviewCount={tour.reviewCount}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TourBooking tour={tour} />
          </div>
        </div>

        <RelatedTours currentTour={tour} />
      </div>
    </div>
  );
};

export default TourDetail;
