import { useEffect } from "react";
import Hero from "../../components/Hero";
import FeaturedTours from "./components/FeaturedTours";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";
import "./Home.css";
import heroImage from "../../assets/images/hero-bg.jpg"; // Make sure the image exists in this path

const Home = () => {
  useEffect(() => {
    // Advanced SEO meta tags with more specific and detailed information
    generateMetaTags(
      "Seven Smile Tour And Ticket | ทัวร์กระบี่ ทัวร์พังงา ทัวร์ภูเก็ต ราคาพิเศษ",
      "บริษัททัวร์ภูเก็ต ให้บริการทัวร์กระบี่ ทัวร์พังงา ทัวร์ภูเก็ต ทัวร์ต่างประเทศ และตั๋วเครื่องบินราคาพิเศษ จัดกรุ๊ปทัวร์ส่วนตัว โดยทีมงานมืออาชีพที่มีประสบการณ์มากกว่า 10 ปี",
      "ทัวร์กระบี่, ทัวร์พังงา, ทัวร์ภูเก็ต, ทัวร์เกาะพีพี, ทัวร์เกาะสิมิลัน, ทัวร์ต่างประเทศ, ตั๋วเครื่องบินราคาถูก, บริษัททัวร์ภูเก็ต, จองทัวร์ออนไลน์"
    );

    // Enhanced structured data with more details
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Seven Smile Tour And Ticket",
      url: "https://www.sevensmiletour.com",
      logo: "https://www.sevensmiletour.com/images/logo.png",
      description:
        "บริการทัวร์ในประเทศไทย ทัวร์ต่างประเทศ และตั๋วเครื่องบินราคาพิเศษ โดยทีมงานมืออาชีพ",
      sameAs: [
        "https://www.facebook.com/sevensmiletravel",
        "https://www.instagram.com/sevensmiletour",
        "https://line.me/sevensmile",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "83 ถ.พังงา",
        addressLocality: "ภูเก็ต",
        addressRegion: "ภูเก็ต",
        postalCode: "83000",
        addressCountry: "TH",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "7.8804911",
        longitude: "98.3883034",
      },
      telephone: "+66-76-123456",
      openingHours: "Mo-Sa 09:00-18:00",
      priceRange: "$$",
      areaServed: ["Phuket", "Krabi", "Phang Nga", "Thailand"],
      makesOffer: {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tour Packages",
          description: "Domestic and international tour packages",
        },
      },
    });

    // Additional schema for FAQs to boost SEO
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ทัวร์ยอดนิยมในภูเก็ตมีอะไรบ้าง?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ทัวร์ยอดนิยมในภูเก็ต ได้แก่ ทัวร์เกาะพีพี ทัวร์อ่าวพังงา-เกาะเจมส์บอนด์ ทัวร์เมืองเก่าภูเก็ต และทัวร์เกาะเฮ-เกาะราชา",
          },
        },
        {
          "@type": "Question",
          name: "ช่วงเวลาที่เหมาะสมในการท่องเที่ยวภูเก็ตคือเมื่อไหร่?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ช่วงเวลาที่เหมาะสมที่สุดคือระหว่างเดือนพฤศจิกายนถึงเมษายน ซึ่งเป็นช่วงที่อากาศดี ทะเลสงบ เหมาะสำหรับกิจกรรมทางน้ำ",
          },
        },
        {
          "@type": "Question",
          name: "Seven Smile Tour มีบริการรับ-ส่งจากโรงแรมหรือไม่?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "มีบริการรับ-ส่งฟรีจากโรงแรมที่พักในพื้นที่ท่องเที่ยวหลัก เช่น ป่าตอง กะตะ กะรน เมืองภูเก็ต และพื้นที่ใกล้เคียง",
          },
        },
      ],
    };

    generateStructuredData(faqSchema);
  }, []);

  return (
    <div>
      <Hero
        image={heroImage}
        title="ทัวร์กระบี่ ภูเก็ต พังงา และทัวร์ต่างประเทศ"
        subtitle="ให้บริการทัวร์คุณภาพโดยทีมงานมืออาชีพ พร้อมบริการตั๋วเครื่องบินในราคาพิเศษ"
        primaryButton={{ text: "ทัวร์ยอดนิยม", link: "#featured-tours" }}
        secondaryButton={{ text: "ติดต่อเรา", link: "/contact" }}
        showAdvertBanner={true}
      />

      <div id="featured-tours">
        <FeaturedTours />
      </div>

      {/* SEO Optimized Introduction Section */}
      {/* <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">
              ยินดีต้อนรับสู่ Seven Smile Tour
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Seven Smile Tour</strong> เป็นบริษัททัวร์ชั้นนำในภูเก็ต
              ให้บริการทัวร์คุณภาพมากว่า 10 ปี
              เราเชี่ยวชาญการจัดทัวร์ในพื้นที่ฝั่งอันดามัน ทั้ง
              <strong>ทัวร์ภูเก็ต</strong>, <strong>ทัวร์กระบี่</strong> และ{" "}
              <strong>ทัวร์พังงา</strong>
              ด้วยราคาที่คุ้มค่า บริการประทับใจ
            </p>
            <p className="text-lg text-gray-700">
              เรามีทีมงานที่มีประสบการณ์ ไกด์ที่เชี่ยวชาญ
              พร้อมดูแลคุณตลอดการเดินทาง ไม่ว่าจะเป็น
              <strong>ทัวร์เกาะพีพี</strong>, <strong>ทัวร์อ่าวพังงา</strong>,{" "}
              <strong>ทัวร์เกาะสิมิลัน</strong>
              หรือ<strong>ทัวร์ต่างประเทศ</strong>{" "}
              เรามีแพ็คเกจให้เลือกหลากหลายตอบโจทย์ทุกความต้องการ
            </p>
          </div>
        </div>
      </section> */}

      <Services />

      <Testimonials />
    </div>
  );
};

export default Home;
