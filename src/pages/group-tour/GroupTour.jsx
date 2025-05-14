import { useEffect } from "react";
import Hero from "../../components/Hero";
import GroupTourForm from "./components/GroupTourForm";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";
import "./GroupTour.css";

const GroupTour = () => {
  useEffect(() => {
    // Update SEO meta tags
    generateMetaTags(
      "จัดกรุ๊ปทัวร์ส่วนตัว | Seven Smile Tour And Ticket",
      "บริการจัดกรุ๊ปทัวร์ส่วนตัว ทัวร์บริษัท ทัวร์โรงเรียน ทัวร์สัมมนา ราคาพิเศษสำหรับกรุ๊ปเหมา",
      "จัดกรุ๊ปทัวร์, ทัวร์เหมากรุ๊ป, ทัวร์บริษัท, ทัวร์โรงเรียน, ทัวร์สัมมนา, จัดทัวร์ส่วนตัว"
    );

    // Add structured data for better SEO
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "บริการจัดกรุ๊ปทัวร์ส่วนตัว",
      serviceType: "Tour Planning",
      description:
        "บริการจัดกรุ๊ปทัวร์ส่วนตัว ทัวร์บริษัท ทัวร์โรงเรียน ทัวร์สัมมนา ราคาพิเศษสำหรับกรุ๊ปเหมา",
      provider: {
        "@type": "TravelAgency",
        name: "Seven Smile Tour And Ticket",
        url: "https://www.sevensmiletour.com",
      },
    });
  }, []);

  const heroImages = [
    "/images/group-tour/banner1.jpg",
    "/images/group-tour/banner2.jpg",
  ];

  const advantages = [
    {
      title: "ออกแบบทริปได้ตามต้องการ",
      description:
        "เลือกสถานที่ท่องเที่ยว เวลา และความสะดวกได้ตามที่คุณต้องการ",
      icon: "🌈",
    },
    {
      title: "ไกด์นำเที่ยวมืออาชีพ",
      description: "ไกด์ท้องถิ่นที่มีความรู้และประสบการณ์ ให้บริการด้วยใจ",
      icon: "👨‍🏫",
    },
    {
      title: "ราคาที่เหมาะสม",
      description: "ราคาคุ้มค่าสำหรับกรุ๊ปทัวร์ส่วนตัว ไม่มีค่าใช้จ่ายแอบแฝง",
      icon: "💰",
    },
    {
      title: "รถรับส่งคุณภาพดี",
      description:
        "รถตู้ รถบัส รถเก๋ง คุณภาพดี สะอาด ปลอดภัย พร้อมคนขับที่ชำนาญเส้นทาง",
      icon: "🚌",
    },
    {
      title: "อาหารคุณภาพดี",
      description:
        "เลือกรับประทานอาหารที่ร้านดัง หรือร้านที่ต้องการได้ตามความเหมาะสม",
      icon: "🍽️",
    },
    {
      title: "การันตีความประทับใจ",
      description: "เราการันตีความประทับใจทุกทริป ด้วยประสบการณ์มากกว่า 10 ปี",
      icon: "🎯",
    },
  ];

  const tourTypes = [
    {
      title: "ทัวร์บริษัท",
      description:
        "จัดทัวร์สำหรับบริษัทของคุณ ทั้งทริปสัมมนา ทริปท่องเที่ยว อิ่มเอมทั้งความรู้และความสนุก",
      image: "/images/group-tour/company.jpg",
    },
    {
      title: "ทัวร์ครอบครัว",
      description:
        "ทริปพักผ่อนสำหรับครอบครัว เปิดประสบการณ์ท่องเที่ยวร่วมกัน สร้างความผูกพันและความทรงจำดีๆ",
      image: "/images/group-tour/family.jpg",
    },
    {
      title: "ทัวร์เพื่อนกลุ่มใหญ่",
      description:
        "แพ็คเกจสำหรับกลุ่มเพื่อน เฮฮาได้เต็มที่ กับกิจกรรมสนุกๆ ที่เหมาะกับกลุ่มเพื่อนโดยเฉพาะ",
      image: "/images/group-tour/friends.jpg",
    },
    {
      title: "ทัวร์โรงเรียน",
      description:
        "ทัศนศึกษาที่ให้ทั้งความรู้และความสนุก ปลอดภัยและเหมาะสมสำหรับนักเรียนทุกระดับชั้น",
      image: "/images/group-tour/school.jpg",
    },
  ];

  return (
    <div>
      <Hero
        images={heroImages}
        title="จัดกรุ๊ปทัวร์ส่วนตัว"
        subtitle="บริการจัดกรุ๊ปทัวร์เหมาตามความต้องการของลูกค้า ทั้งทัวร์ในประเทศและต่างประเทศ"
        primaryButton={{ text: "ขอใบเสนอราคา", link: "#request-form" }}
      />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">
              ข้อดีของการจัดกรุ๊ปทัวร์กับเรา
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Seven Smile Tour And Ticket ให้บริการจัดกรุ๊ปทัวร์แบบครบวงจร
              ด้วยทีมงานมืออาชีพที่มีประสบการณ์มากกว่า 10 ปี
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-custom hover-scale"
              >
                <div className="text-5xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              ประเภทของกรุ๊ปทัวร์ที่เราให้บริการ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tourTypes.map((tourType, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-custom"
                >
                  <div className="md:w-5/12">
                    <img
                      src={tourType.image}
                      alt={tourType.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-7/12 p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      {tourType.title}
                    </h3>
                    <p className="text-gray-600">{tourType.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="request-form">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              ขอใบเสนอราคา
            </h2>
            <GroupTourForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupTour;
