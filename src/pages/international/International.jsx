import { useEffect } from "react";
import Hero from "../../components/Hero";
import InternationalPackages from "./components/InternationalPackages";
import InternationalHighlights from "./components/InternationalHighlights";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";

const International = () => {
  useEffect(() => {
    // Update SEO meta tags
    generateMetaTags(
      "ทัวร์ต่างประเทศ | Seven Smile Tour And Ticket",
      "บริการทัวร์ต่างประเทศหลากหลายเส้นทาง ทัวร์ญี่ปุ่น ทัวร์เกาหลี ทัวร์ยุโรป ทัวร์อเมริกา ราคาพิเศษ เดินทางปลอดภัยโดยทีมงานมืออาชีพ",
      "ทัวร์ต่างประเทศ, ทัวร์ญี่ปุ่น, ทัวร์เกาหลี, ทัวร์ยุโรป, ทัวร์อเมริกา, ทัวร์จีน, ทัวร์ฮ่องกง"
    );

    // Add structured data for better SEO
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "ทัวร์ต่างประเทศ",
      description:
        "บริการทัวร์ต่างประเทศหลากหลายเส้นทาง ทัวร์ญี่ปุ่น ทัวร์เกาหลี ทัวร์ยุโรป",
      touristType: ["คู่รัก", "ครอบครัว", "กรุ๊ปเพื่อน", "นักท่องเที่ยวทั่วไป"],
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "14900",
        highPrice: "89900",
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
    "/images/international/banner1.jpg",
    "/images/international/banner2.jpg",
  ];

  return (
    <div>
      <Hero
        images={heroImages}
        title="ทัวร์ต่างประเทศ"
        subtitle="เปิดประสบการณ์การท่องเที่ยวต่างประเทศกับแพ็คเกจทัวร์คุณภาพ บริการครบวงจร"
        primaryButton={{
          text: "แพ็คเกจทัวร์",
          link: "#international-packages",
        }}
      />

      <InternationalHighlights />

      <div id="international-packages">
        <InternationalPackages />
      </div>
    </div>
  );
};

export default International;
