import { useEffect } from "react";
import Hero from "../../components/Hero";
import KrabiPackages from "./components/KrabiPackages";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";
import "./Krabi.css";

const Krabi = () => {
  useEffect(() => {
    // Enhanced SEO meta tags with focus on ทัวร์กระบี่
    generateMetaTags(
      "ทัวร์กระบี่ 4 เกาะ เกาะพีพี เกาะห้อง | ราคาพิเศษ | Seven Smile Tour",
      "ทัวร์กระบี่ยอดนิยม เที่ยว 4 เกาะ เกาะพีพี อ่าวมาหยา เกาะห้อง ทัวร์พระอาทิตย์ตก จังเกิ้ลทัวร์ ราคาเริ่มต้น 590 บาท เรือสปีดโบ๊ท ไกด์มืออาชีพ จองออนไลน์ง่าย",
      "ทัวร์กระบี่, ทัวร์ 4 เกาะกระบี่, ทัวร์เกาะพีพี, ทัวร์เกาะห้อง, ทัวร์กระบี่ราคาถูก, เที่ยวกระบี่, จองทัวร์กระบี่, ทัวร์กระบี่ออนไลน์, ทัวร์พระอาทิตย์ตกกระบี่, กระบี่จังเกิ้ลทัวร์"
    );

    // Enhanced structured data with local business info
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Seven Smile Tour - ทัวร์กระบี่",
      description:
        "บริการทัวร์กระบี่ครบครัน ทัวร์ 4 เกาะ เกาะพีพี เกาะห้อง ทัวร์พระอาทิตย์ตก และจังเกิ้ลทัวร์ ราคาเริ่มต้น 590 บาท",
      url: "https://www.sevensmiletour.com/krabi",
      image: "https://www.sevensmiletour.com/images/krabi/banner1.jpg",
      areaServed: {
        "@type": "Place",
        name: "กระบี่, ประเทศไทย",
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ทัวร์ 4 เกาะกระบี่",
            description: "ทัวร์เกาะปอดะ เกาะไก่ ทะเลแหวก ถ้ำพระนาง",
          },
          price: "1000",
          priceCurrency: "THB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ทัวร์เกาะพีพี อ่าวมาหยา",
            description: "ทัวร์เกาะพีพี อ่าวมาหยา ถ้ำไวกิ้ง เกาะไผ่",
          },
          price: "1500",
          priceCurrency: "THB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ทัวร์เกาะห้อง",
            description: "ทัวร์เกาะห้อง ทะเลใน จุดชมวิว 360 องศา",
          },
          price: "1390",
          priceCurrency: "THB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "กระบี่จังเกิ้ลทัวร์",
            description: "สระมรกต น้ำตกร้อน วัดถ้ำเสือ",
          },
          price: "1490",
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
          name: "ทัวร์กระบี่ยอดนิยมมีอะไรบ้าง?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ทัวร์กระบี่ยอดนิยม ได้แก่ ทัวร์ 4 เกาะ (เกาะปอดะ เกาะไก่ ทะเลแหวก ถ้ำพระนาง), ทัวร์เกาะพีพี อ่าวมาหยา, ทัวร์เกาะห้อง, ทัวร์พระอาทิตย์ตก 7 เกาะ และกระบี่จังเกิ้ลทัวร์",
          },
        },
        {
          "@type": "Question",
          name: "ราคาทัวร์กระบี่เริ่มต้นเท่าไหร่?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ราคาทัวร์กระบี่เริ่มต้นที่ 590 บาท สำหรับซิตี้ทัวร์ครึ่งวัน ทัวร์เกาะเริ่มต้น 1,000 บาท รวมอาหารเที่ยง ผลไม้ น้ำดื่ม และอุปกรณ์ดำน้ำ",
          },
        },
        {
          "@type": "Question",
          name: "ช่วงเวลาที่เหมาะสำหรับทัวร์กระบี่?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ช่วงเวลาที่เหมาะสำหรับทัวร์กระบี่คือ ตุลาคม-เมษายน (ฤดูแล้ง) ทะเลสงบ อากาศดี เหมาะสำหรับกิจกรรมทางน้ำทุกประเภท",
          },
        },
        {
          "@type": "Question",
          name: "ทัวร์กระบี่รวมอะไรบ้าง?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ทัวร์กระบี่รวม รถรับ-ส่งโรงแรม เรือสปีดโบ๊ท/หางยาว อาหารเที่ยง ผลไม้ น้ำดื่ม อุปกรณ์ดำน้ำ เสื้อชูชีพ ไกด์ท้องถิ่น ประกันภัย และค่าเข้าอุทยาน",
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
          name: "ทัวร์กระบี่",
          item: "https://www.sevensmiletour.com/krabi",
        },
      ],
    });
  }, []);

  const heroImages = ["/images/krabi/banner1.jpg", "/images/krabi/banner2.jpg"];

  return (
    <div>
      <Hero
        image={heroImages[0]}
        title="ทัวร์กระบี่ เที่ยวเกาะสวย ราคาเริ่มต้น 1,000 บาท"
        subtitle="สัมผัสความงดงามของทะเลกระบี่ ทัวร์ 4 เกาะ เกาะพีพี เกาะห้อง พระอาทิตย์ตก จังเกิ้ลทัวร์ เรือสปีดโบ๊ท ไกด์มืออาชีพ จองง่าย ราคาคุ้มค่า"
        primaryButton={{ text: "ดูแพ็คเกจทัวร์", link: "#krabi-packages" }}
        showAdvertBanner={true}
      />

      <div id="krabi-packages">
        <KrabiPackages />
      </div>
    </div>
  );
};

export default Krabi;
