import { useEffect } from "react";
import Hero from "../../components/Hero";
import PhuketPackages from "./components/PhuketPackages";
import PhuketHighlights from "./components/PhuketHighlights";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";
import "./Phuket.css";

const Phuket = () => {
  useEffect(() => {
    // Update SEO meta tags
    generateMetaTags(
      "ทัวร์ภูเก็ต | Seven Smile Tour And Ticket",
      "บริการทัวร์ภูเก็ตหลากหลายเส้นทาง ทัวร์เกาะพีพี ทัวร์เจมส์บอนด์ ทัวร์เมืองภูเก็ต ราคาพิเศษ เดินทางปลอดภัยโดยทีมงานมืออาชีพ",
      "ทัวร์ภูเก็ต, ทัวร์เกาะพีพี, ทัวร์อ่าวพังงา, ทัวร์เจมส์บอนด์, ทัวร์เกาะเฮ, ทัวร์ One Day Trip ภูเก็ต"
    );

    // Add structured data for better SEO
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "ทัวร์ภูเก็ต",
      description:
        "บริการทัวร์ภูเก็ตหลากหลายเส้นทาง ทัวร์เกาะพีพี ทัวร์เจมส์บอนด์ ทัวร์เมืองภูเก็ต",
      touristType: ["คู่รัก", "ครอบครัว", "กรุ๊ปเพื่อน", "นักท่องเที่ยวทั่วไป"],
      offers: {
        "@type": "Offer",
        price: "990",
        priceCurrency: "THB",
      },
      provider: {
        "@type": "TravelAgency",
        name: "Seven Smile Tour And Ticket",
        url: "https://www.sevensmiletour.com",
      },
    });
  }, []);

  const heroImages = [
    "/images/phuket/banner1.jpg",
    "/images/phuket/banner2.jpg",
  ];

  return (
    <div>
      <Hero
        images={heroImages}
        title="ทัวร์ภูเก็ต"
        subtitle="สัมผัสไข่มุกแห่งอันดามัน ที่พักหรูหรา ชายหาดสวยงาม อาหารทะเลสด พร้อมกิจกรรมหลากหลาย"
        primaryButton={{ text: "แพ็คเกจทัวร์", link: "#phuket-packages" }}
      />

      <PhuketHighlights />

      <div id="phuket-packages">
        <PhuketPackages />
      </div>
    </div>
  );
};

export default Phuket;
