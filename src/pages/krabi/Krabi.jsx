import { useEffect } from "react";
import Hero from "../../components/Hero";
import KrabiPackages from "./components/KrabiPackages";
import KrabiHighlights from "./components/KrabiHighlights";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";
import "./Krabi.css";

const Krabi = () => {
  useEffect(() => {
    // Update SEO meta tags
    generateMetaTags(
      "ทัวร์กระบี่ | Seven Smile Tour And Ticket",
      "บริการทัวร์กระบี่หลากหลายเส้นทาง ทัวร์ 4 เกาะ ทัวร์เกาะพีพี ทัวร์เกาะห้อง อ่าวมาหยา ราคาพิเศษ เดินทางปลอดภัยโดยทีมงานมืออาชีพ",
      "ทัวร์กระบี่, ทัวร์ 4 เกาะกระบี่, ทัวร์เกาะพีพี, ทัวร์เกาะห้อง, ทัวร์เกาะไผ่, ทัวร์ One Day Trip กระบี่"
    );

    // Add structured data for better SEO
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "ทัวร์กระบี่",
      description:
        "บริการทัวร์กระบี่หลากหลายเส้นทาง ทัวร์ 4 เกาะ ทัวร์เกาะพีพี ทัวร์เกาะห้อง อ่าวมาหยา",
      touristType: ["คู่รัก", "ครอบครัว", "กรุ๊ปเพื่อน", "นักท่องเที่ยวทั่วไป"],
      offers: {
        "@type": "Offer",
        price: "1290",
        priceCurrency: "THB",
      },
      provider: {
        "@type": "TravelAgency",
        name: "Seven Smile Tour And Ticket",
        url: "https://www.sevensmiletour.com",
      },
    });
  }, []);

  const heroImages = ["/images/krabi/banner1.jpg", "/images/krabi/banner2.jpg"];

  return (
    <div>
      <Hero
        images={heroImages}
        title="ทัวร์กระบี่"
        subtitle="สัมผัสความงดงามของทะเลกระบี่ น้ำทะเลใส หาดทรายขาว เกาะสวยงาม"
        primaryButton={{ text: "แพ็คเกจทัวร์", link: "#krabi-packages" }}
      />

      <KrabiHighlights />

      <div id="krabi-packages">
        <KrabiPackages />
      </div>
    </div>
  );
};

export default Krabi;
