import { useEffect } from "react";
import Hero from "../../components/Hero";
import GroupTourGallery from "./components/GroupTourGallery";
import EnhancedGroupTourForm from "./components/EnhancedGroupTourForm";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";

const GroupTour = () => {
  useEffect(() => {
    // Enhanced SEO meta tags
    generateMetaTags(
      "จัดกรุ๊ปทัวร์ส่วนตัว บริษัท โรงเรียน ครอบครัว | Seven Smile Tour",
      "บริการจัดกรุ๊ปทัวร์ส่วนตัวครบวงจร ทัวร์บริษัท ทัวร์โรงเรียน ทัวร์ครอบครัว ทั้งในประเทศและต่างประเทศ ราคาพิเศษสำหรับกรุ๊ปเหมา ดูแลตลอดทริป",
      "จัดกรุ๊ปทัวร์, ทัวร์เหมากรุ๊ป, ทัวร์บริษัท, ทัวร์โรงเรียน, ทัวร์ครอบครัว, จัดทัวร์ส่วนตัว, กรุ๊ปทัวร์ในประเทศ, กรุ๊ปทัวร์ต่างประเทศ"
    );

    // Enhanced structured data
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "บริการจัดกรุ๊ปทัวร์ส่วนตัว",
      serviceType: "Group Tour Planning",
      description:
        "บริการจัดกรุ๊ปทัวร์ส่วนตัวครบวงจร ทัวร์บริษัท ทัวร์โรงเรียน ทัวร์ครอบครัว ทั้งในประเทศและต่างประเทศ",
      provider: {
        "@type": "TravelAgency",
        name: "Seven Smile Tour And Ticket",
        url: "https://www.sevensmiletour.com",
        telephone: "+66-95-265-5516",
        email: "sevensmiletour@gmail.com",
      },
      areaServed: [
        {
          "@type": "Place",
          name: "ประเทศไทย",
        },
        {
          "@type": "Place",
          name: "ต่างประเทศ",
        },
      ],
      offers: {
        "@type": "Offer",
        description: "แพ็คเกจกรุ๊ปทัวร์ตามความต้องการ",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "THB",
          minPrice: "5000",
          maxPrice: "50000",
        },
      },
    });

    // FAQ Schema for better SEO
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "การจัดกรุ๊ปทัวร์มีขั้นตอนอย่างไร?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "1. กรอกข้อมูลผ่านเว็บไซต์หรือติดต่อโดยตรง 2. ทีมงานจะติดต่อเพื่อสอบถามรายละเอียด 3. จัดทำใบเสนอราคา 4. ยืนยันการจอง 5. จัดเตรียมทริป 6. เดินทางพร้อมไกด์มืออาชีพ",
          },
        },
        {
          "@type": "Question",
          name: "กรุ๊ปทัวร์ต้องมีคนขั้นต่ำกี่คน?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "สำหรับกรุ๊ปทัวร์เริ่มต้นที่ 10 คนขึ้นไป แต่สามารถจัดให้กับกรุ๊ปเล็กได้ โดยราคาจะปรับตามจำนวนผู้เดินทาง",
          },
        },
        {
          "@type": "Question",
          name: "ราคากรุ๊ปทัวร์คำนวณอย่างไร?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ราคาขึ้นอยู่กับ จำนวนผู้เดินทาง, ปลายทาง, ระยะเวลา, ที่พัก, และกิจกรรม ยิ่งกรุ๊ปใหญ่ราคาต่อคนยิ่งถูกลง",
          },
        },
        {
          "@type": "Question",
          name: "สามารถยกเลิกหรือเปลี่ยนแปลงได้หรือไม่?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "สามารถยกเลิกหรือเปลี่ยนแปลงได้ตามเงื่อนไข โดยแจ้งล่วงหน้าอย่างน้อย 30 วันก่อนเดินทาง เพื่อหลีกเลี่ยงค่าปรับ",
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
          name: "จัดกรุ๊ปทัวร์",
          item: "https://www.sevensmiletour.com/group-tour",
        },
      ],
    });
  }, []);

  const heroImages = [
    "/images/group-tour/banner1.jpg",
    "/images/group-tour/banner2.jpg",
  ];

  return (
    <div>
      <Hero
        image={heroImages[0]}
        title="จัดกรุ๊ปทัวร์ส่วนตัว"
        subtitle="บริการจัดกรุ๊ปทัวร์ครบวงจร ทั้งในประเทศและต่างประเทศ ปรับแต่งได้ตามความต้องการ ราคาพิเศษสำหรับกรุ๊ปเหมา"
        primaryButton={{ text: "ดูผลงานของเรา", link: "#gallery" }}
        secondaryButton={{ text: "ขอใบเสนอราคา", link: "#inquiry-form" }}
        showAdvertBanner={true}
      />

      {/* Gallery Section */}
      <div id="gallery">
        <GroupTourGallery />
      </div>

      {/* Inquiry Form Section */}
      <div id="inquiry-form">
        <EnhancedGroupTourForm />
      </div>

      {/* Additional Info Section */}
      <section className="section-padding bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ทำไมต้องเลือกเราจัดกรุ๊ปทัวร์?
              </h2>
              <p className="text-gray-600 text-lg">
                ด้วยประสบการณ์มากกว่า 10 ปี
                เราพร้อมดูแลทุกรายละเอียดให้กรุ๊ปของคุณ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">ปรับแต่งได้ 100%</h3>
                <p className="text-gray-600">
                  ออกแบบทริปตามความต้องการของกรุ๊ป ทั้งสถานที่ กิจกรรม
                  และงบประมาณ
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">👨‍🏫</div>
                <h3 className="text-xl font-semibold mb-3">ไกด์มืออาชีพ</h3>
                <p className="text-gray-600">
                  ไกด์ท้องถิ่นที่มีความรู้และประสบการณ์
                  ดูแลกรุ๊ปอย่างใส่ใจตลอดทริป
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-3">ราคาคุ้มค่า</h3>
                <p className="text-gray-600">
                  ราคาพิเศษสำหรับกรุ๊ป ยิ่งคนเยอะยิ่งถูก ไม่มีค่าใช้จ่ายแอบแฝง
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">🚗</div>
                <h3 className="text-xl font-semibold mb-3">รถคุณภาพดี</h3>
                <p className="text-gray-600">
                  รถตู้ รถบัส ที่สะอาด ปลอดภัย พร้อมคนขับที่ชำนาญเส้นทาง
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-3">ประกันครอบคลุม</h3>
                <p className="text-gray-600">
                  ประกันการเดินทางและประกันภัยอุบัติเหตุสำหรับทุกท่าน
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold mb-3">บริการ 24/7</h3>
                <p className="text-gray-600">
                  ทีมงานพร้อมให้บริการและช่วยเหลือตลอด 24 ชั่วโมง
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                พร้อมจัดทริปในฝันให้กรุ๊ปคุณแล้ว?
              </h3>
              <p className="text-gray-600 mb-6">
                ส่งข้อมูลมาให้เรา แล้วรอรับใบเสนอราคาพิเศษภายใน 24 ชั่วโมง
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#inquiry-form"
                  className="bg-primary text-white  px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  ขอใบเสนอราคา
                </a>
                <a
                  href="tel:0952655516"
                  className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  โทรสอบถาม 095-265-5516
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupTour;
