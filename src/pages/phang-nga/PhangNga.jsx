import { useEffect } from "react";
import Hero from "../../components/Hero";
import PhangNgaPackages from "./components/PhangNgaPackages";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";
import "./PhangNga.css";

const PhangNga = () => {
  useEffect(() => {
    // Enhanced SEO meta tags with focus on ทัวร์พังงา
    generateMetaTags(
      "ทัวร์พังงา เกาะสุรินทร์ | ราคาพิเศษ | Seven Smile Tour",
      "ทัวร์พังงายอดนิยม เที่ยวอ่าวพังงา เกาะเจมส์บอนด์ เกาะสิมิลัน เกาะสุรินทร์ ล่องแก่ง ราคาเริ่มต้น 1,000 บาท เรือสปีดโบ๊ท ไกด์มืออาชีพ จองออนไลน์ง่าย",
      "ทัวร์พังงา, ทัวร์อ่าวพังงา, ทัวร์เกาะสิมิลัน, ทัวร์เกาะสุรินทร์, ทัวร์เกาะเจมส์บอนด์, ทัวร์พังงาราคาถูก, เที่ยวพังงา, จองทัวร์พังงา, ทัวร์พังงาออนไลน์, ล่องแก่งพังงา"
    );

    // Enhanced structured data with local business info
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Seven Smile Tour - ทัวร์พังงา",
      description:
        "บริการทัวร์พังงาครบครัน ทัวร์อ่าวพังงา เกาะสิมิลัน เกาะสุรินทร์ ล่องแก่ง ราคาเริ่มต้น 1,000 บาท",
      url: "https://www.sevensmiletour.com/phang-nga",
      image: "https://www.sevensmiletour.com/images/phang-nga/banner1.jpg",
      areaServed: {
        "@type": "Place",
        name: "พังงา, ประเทศไทย",
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ทัวร์อ่าวพังงา เกาะเจมส์บอนด์",
            description: "ทัวร์เกาะตะปู เกาะปันหยี ถ้ำลอด อ่าวพังงา",
          },
          price: "1390",
          priceCurrency: "THB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ทัวร์เกาะสิมิลัน",
            description: "ทัวร์หมู่เกาะสิมิลัน ดำน้ำชมปะการัง",
          },
          price: "3290",
          priceCurrency: "THB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ทัวร์เกาะสุรินทร์",
            description: "ทัวร์หมู่เกาะสุรินทร์ ดำน้ำตื้นและลึก",
          },
          price: "2990",
          priceCurrency: "THB",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "ทัวร์ล่องแก่ง",
            description: "ล่องแก่งน้ำขาว ผจญภัยในป่าฝนเขตร้อน",
          },
          price: "1500",
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
          name: "ทัวร์พังงายอดนิยมมีอะไรบ้าง?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ทัวร์พังงายอดนิยม ได้แก่ ทัวร์อ่าวพังงา เกาะเจมส์บอนด์ (เกาะตะปู), ทัวร์เกาะสิมิลัน, ทัวร์เกาะสุรินทร์, ทัวร์ล่องแก่ง และทัวร์ถ้ำลอด",
          },
        },
        {
          "@type": "Question",
          name: "ราคาทัวร์พังงาเริ่มต้นเท่าไหร่?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ราคาทัวร์พังงาเริ่มต้นที่ 1,000 บาท สำหรับทัวร์อ่าวพังงา ทัวร์เกาะสิมิลันเริ่มต้น 3,290 บาท รวมอาหารเที่ยง ผลไม้ น้ำดื่ม และอุปกรณ์ดำน้ำ",
          },
        },
        {
          "@type": "Question",
          name: "ช่วงเวลาที่เหมาะสำหรับทัวร์พังงา?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ช่วงเวลาที่เหมาะสำหรับทัวร์พังงาคือ ตุลาคม-เมษายน (ฤดูแล้ง) ทะเลสงบ อากาศดี เหมาะสำหรับกิจกรรมทางน้ำ เกาะสิมิลันและสุรินทร์เปิดให้บริการ",
          },
        },
        {
          "@type": "Question",
          name: "ทัวร์พังงารวมอะไรบ้าง?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ทัวร์พังงารวม รถรับ-ส่งโรงแรม เรือสปีดโบ๊ท/หางยาว อาหารเที่ยง ผลไม้ น้ำดื่ม อุปกรณ์ดำน้ำ เสื้อชูชีพ ไกด์ท้องถิ่น ประกันภัย และค่าเข้าอุทยาน",
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
          name: "ทัวร์พังงา",
          item: "https://www.sevensmiletour.com/phang-nga",
        },
      ],
    });
  }, []);

  const heroImages = [
    "/images/phang-nga/banner1.jpg",
    "/images/phang-nga/banner2.jpg",
  ];

  return (
    <div>
      <Hero
        image={heroImages[0]}
        title="ทัวร์พังงา ราคาเริ่มต้น 1,000 บาท"
        subtitle="สัมผัสความมหัศจรรย์ของธรรมชาติพังงา อ่าวพังงา เกาะเจมส์บอนด์ เกาะสิมิลัน เกาะสุรินทร์ ล่องแก่ง เรือสปีดโบ๊ท ไกด์มืออาชีพ จองง่าย ราคาคุ้มค่า"
        primaryButton={{ text: "ดูแพ็คเกจทัวร์", link: "#phang-nga-packages" }}
        showAdvertBanner={true}
      />

      <div id="phang-nga-packages">
        <PhangNgaPackages />
      </div>
    </div>
  );
};

export default PhangNga;
