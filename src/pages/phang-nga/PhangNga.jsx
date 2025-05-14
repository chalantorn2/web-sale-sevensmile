import { useEffect } from "react";
import Hero from "../../components/Hero";
import PhangNgaPackages from "./components/PhangNgaPackages";
import PhangNgaHighlights from "./components/PhangNgaHighlights";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";
import "./PhangNga.css";

const PhangNga = () => {
  useEffect(() => {
    // Update SEO meta tags
    generateMetaTags(
      "ทัวร์พังงา | Seven Smile Tour And Ticket",
      "บริการทัวร์พังงาหลากหลายเส้นทาง ทัวร์อ่าวพังงา ทัวร์เกาะสิมิลัน ทัวร์เกาะสุรินทร์ ราคาพิเศษ เดินทางปลอดภัยโดยทีมงานมืออาชีพ",
      "ทัวร์พังงา, ทัวร์อ่าวพังงา, ทัวร์เกาะสิมิลัน, ทัวร์เกาะสุรินทร์, ทัวร์เขาตะปู, ทัวร์ One Day Trip พังงา"
    );

    // Add structured data for better SEO
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "ทัวร์พังงา",
      description:
        "บริการทัวร์พังงาหลากหลายเส้นทาง ทัวร์อ่าวพังงา ทัวร์เกาะสิมิลัน ทัวร์เกาะสุรินทร์",
      touristType: ["คู่รัก", "ครอบครัว", "กรุ๊ปเพื่อน", "นักท่องเที่ยวทั่วไป"],
      offers: {
        "@type": "Offer",
        price: "1390",
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
    "/images/phang-nga/banner1.jpg",
    "/images/phang-nga/banner2.jpg",
  ];

  return (
    <div>
      <Hero
        images={heroImages}
        title="ทัวร์พังงา"
        subtitle="สัมผัสความมหัศจรรย์ของธรรมชาติที่อ่าวพังงา เกาะสิมิลัน และเกาะสุรินทร์ น้ำทะเลใส หาดทรายขาว"
        primaryButton={{ text: "แพ็คเกจทัวร์", link: "#phang-nga-packages" }}
      />

      <PhangNgaHighlights />

      <div id="phang-nga-packages">
        <PhangNgaPackages />
      </div>
    </div>
  );
};

export default PhangNga;
