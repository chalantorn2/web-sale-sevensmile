import { useEffect } from "react";
import Hero from "../../components/Hero";
import PhuketPackages from "./components/PhuketPackages";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";

const Phuket = () => {
  useEffect(() => {
    // Enhanced SEO meta tags with focus on ทัวร์ภูเก็ต
    generateMetaTags(
      "ทัวร์ภูเก็ต เกาะพีพี เกาะเจมส์บอนด์ ซิตี้ทัวร์ | ราคาพิเศษ | Seven Smile Tour",
      "ทัวร์ภูเก็ตยอดนิยม เที่ยวเกาะพีพี เกาะเจมส์บอนด์ เกาะเฮ ซิตี้ทัวร์ภูเก็ต ราคาเริ่มต้น 1,000 บาท เรือสปีดโบ๊ท ไกด์มืออาชีพ จองออนไลน์ง่าย",
      "ทัวร์ภูเก็ต, ทัวร์เกาะพีพี, ทัวร์เกาะเจมส์บอนด์, ทัวร์เกาะเฮ, ซิตี้ทัวร์ภูเก็ต, ทัวร์ภูเก็ตราคาถูก, เที่ยวภูเก็ต, จองทัวร์ภูเก็ต, ทัวร์ภูเก็ตออนไลน์, ทัวร์เมืองภูเก็ต"
    );

    // Enhanced structured data with local business info
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Seven Smile Tour - ทัวร์ภูเก็ต",
      description:
        "บริการทัวร์ภูเก็ตครบครัน ทัวร์เกาะพีพี เกาะเจมส์บอนด์ เกาะเฮ ซิตี้ทัวร์ ราคาเริ่มต้น 1,000 บาท",
      url: "https://www.sevensmiletour.com/phuket",
      image: "https://www.sevensmiletour.com/images/phuket/banner1.jpg",
      areaServed: {
        "@type": "Place",
        name: "ภูเก็ต, ประเทศไทย",
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ทัวร์เกาะพีพี อ่าวมาหยา",
            description: "ทัวร์เกาะพีพี อ่าวมาหยา ถ้ำไวกิ้ง เกาะไผ่",
          },
          price: "1690",
          priceCurrency: "THB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ทัวร์เกาะเจมส์บอนด์",
            description: "ทัวร์เกาะตะปู อ่าวพังงา เกาะปันหยี",
          },
          price: "1490",
          priceCurrency: "THB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ทัวร์เกาะเฮ เกาะราชา",
            description: "ทัวร์ดำน้ำชมปะการัง เกาะเฮ เกาะราชา",
          },
          price: "1590",
          priceCurrency: "THB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ซิตี้ทัวร์ภูเก็ต",
            description: "ทัวร์เมืองภูเก็ต พระใหญ่ แหลมพรหมเทพ เมืองเก่า",
          },
          price: "990",
          priceCurrency: "THB",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+66-95-265-5516",
        contactType: "customer service",
        availableLanguage: ["Thai", "English"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "83 ถ.พังงา",
        addressLocality: "ภูเก็ต",
        addressRegion: "ภูเก็ต",
        postalCode: "83000",
        addressCountry: "TH",
      },
    });

    // FAQ Schema for better SEO
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ทัวร์ภูเก็ตยอดนิยมมีอะไรบ้าง?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ทัวร์ภูเก็ตยอดนิยม ได้แก่ ทัวร์เกาะพีพี อ่าวมาหยา, ทัวร์เกาะเจมส์บอนด์ (จากภูเก็ต), ทัวร์เกาะเฮ เกาะราชา, ซิตี้ทัวร์ภูเก็ต และทัวร์เมืองเก่าภูเก็ต",
          },
        },
        {
          "@type": "Question",
          name: "ราคาทัวร์ภูเก็ตเริ่มต้นเท่าไหร่?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ราคาทัวร์ภูเก็ตเริ่มต้นที่ 990 บาท สำหรับซิตี้ทัวร์ภูเก็ต ทัวร์เกาะเริ่มต้น 1,490 บาท รวมอาหารเที่ยง ผลไม้ น้ำดื่ม และอุปกรณ์ดำน้ำ",
          },
        },
        {
          "@type": "Question",
          name: "ช่วงเวลาที่เหมาะสำหรับทัวร์ภูเก็ต?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ช่วงเวลาที่เหมาะสำหรับทัวร์ภูเก็ตคือ ตุลาคม-เมษายน (ฤดูแล้ง) ทะเลสงบ อากาศดี เหมาะสำหรับกิจกรรมทางน้ำทุกประเภท",
          },
        },
        {
          "@type": "Question",
          name: "ทัวร์ภูเก็ตรวมอะไรบ้าง?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ทัวร์ภูเก็ตรวม รถรับ-ส่งโรงแรม เรือสปีดโบ๊ท/หางยาว อาหารเที่ยง ผลไม้ น้ำดื่ม อุปกรณ์ดำน้ำ เสื้อชูชีพ ไกด์ท้องถิ่น ประกันภัย และค่าเข้าอุทยาน",
          },
        },
      ],
    });

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
          name: "ทัวร์ภูเก็ต",
          item: "https://www.sevensmiletour.com/phuket",
        },
      ],
    });
  }, []);

  const heroImages = [
    "/images/phuket/banner1.jpg",
    "/images/phuket/banner2.jpg",
  ];

  return (
    <div>
      <Hero
        image={heroImages[0]}
        title="ทัวร์ภูเก็ต ราคาเริ่มต้น 1,000 บาท"
        subtitle="สัมผัสไข่มุกแห่งอันดามัน ทัวร์เกาะพีพี เกาะเจมส์บอนด์ เกาะเฮ ซิตี้ทัวร์ เรือสปีดโบ๊ท ไกด์มืออาชีพ จองง่าย ราคาคุ้มค่า"
        primaryButton={{ text: "ดูแพ็คเกจทัวร์", link: "#phuket-packages" }}
        showAdvertBanner={true}
      />

      <div id="phuket-packages">
        <PhuketPackages />
      </div>
    </div>
  );
};

export default Phuket;
