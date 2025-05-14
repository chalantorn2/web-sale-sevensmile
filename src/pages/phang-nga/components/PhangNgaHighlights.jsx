import { FaMapMarkedAlt, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const PhangNgaHighlights = () => {
  const highlights = [
    {
      title: "อ่าวพังงา",
      image: "/images/phang-nga/phang-nga-bay.jpg",
      description:
        "อ่าวพังงามีภูมิทัศน์ที่งดงามประกอบด้วยเกาะหินปูนมากมายกว่า 40 เกาะ ที่โผล่ขึ้นมาจากน้ำทะเลสีเขียวมรกต",
    },
    {
      title: "เกาะเจมส์บอนด์",
      image: "/images/phang-nga/james-bond.jpg",
      description:
        "เกาะตะปู หรือเกาะเจมส์บอนด์ เป็นเกาะหินปูนที่มีชื่อเสียงจากภาพยนตร์เรื่อง The Man with the Golden Gun",
    },
    {
      title: "เกาะปันหยี",
      image: "/images/phang-nga/panyee.jpg",
      description:
        "หมู่บ้านชาวประมงมุสลิมที่ตั้งอยู่กลางทะเล สร้างบ้านเรือนบนเสาไม้เหนือน้ำทะเล มีวิถีชีวิตที่น่าสนใจ",
    },
    {
      title: "เกาะสิมิลัน",
      image: "/images/phang-nga/similan.jpg",
      description:
        "หมู่เกาะที่มีชายหาดสีขาวละเอียด น้ำทะเลใสสีฟ้า และแนวปะการังที่สวยงาม เป็นแหล่งดำน้ำที่ดีที่สุดแห่งหนึ่งของโลก",
    },
    {
      title: "เกาะสุรินทร์",
      image: "/images/phang-nga/surin.jpg",
      description:
        "หมู่เกาะที่มีความอุดมสมบูรณ์ของท้องทะเล เหมาะสำหรับการดำน้ำตื้นและดำน้ำลึก สามารถพบเห็นปลากระเบนราหู และฉลามวาฬได้",
    },
    {
      title: "ถ้ำลอด",
      image: "/images/phang-nga/hong-island.jpg",
      description:
        "ถ้ำที่ถูกกัดเซาะโดยน้ำทะเลเป็นเวลานาน จนเกิดเป็นช่องทางให้เรือสามารถลอดผ่านได้ ภายในมีหินงอกหินย้อยสวยงาม",
    },
  ];

  const info = [
    {
      icon: <FaMapMarkedAlt />,
      title: "สถานที่ท่องเที่ยวยอดนิยม",
      items: [
        "อ่าวพังงา",
        "เกาะตะปู (เกาะเจมส์บอนด์)",
        "เกาะปันหยี",
        "เกาะสิมิลัน",
        "เกาะสุรินทร์",
        "ถ้ำลอด",
        "น้ำตกโตนไทร",
        "วัดถ้ำสุวรรณคูหา",
      ],
    },
    {
      icon: <FaCalendarAlt />,
      title: "ช่วงเวลาที่เหมาะสำหรับการเที่ยว",
      items: [
        "ฤดูร้อน (มีนาคม - พฤษภาคม): อากาศร้อน ทะเลสงบ เหมาะสำหรับการดำน้ำ",
        "ฤดูฝน (มิถุนายน - ตุลาคม): ฝนตกเป็นช่วง ๆ ราคาทัวร์ถูกลง",
        "ฤดูหนาว (พฤศจิกายน - กุมภาพันธ์): อากาศดี เป็นช่วงไฮซีซั่น",
        "ช่วงที่แนะนำ: พฤศจิกายน - เมษายน (ทะเลสวย อากาศดี)",
      ],
    },
    {
      icon: <FaInfoCircle />,
      title: "ข้อมูลสำคัญ",
      items: [
        "การเดินทาง: ไม่มีสนามบินในพังงา สามารถบินไปลงที่ภูเก็ตหรือกระบี่ แล้วเดินทางต่อด้วยรถ",
        "อุทยานแห่งชาติหมู่เกาะสิมิลัน มีค่าธรรมเนียมเข้าอุทยาน ผู้ใหญ่ 500 บาท เด็ก 300 บาท",
        "ควรเตรียมชุดว่ายน้ำ ครีมกันแดด หมวก และแว่นตากันแดด",
        "ในช่วงมรสุม (พฤษภาคม - ตุลาคม) อุทยานแห่งชาติหมู่เกาะสิมิลันและสุรินทร์จะปิดให้บริการ",
      ],
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">ไฮไลท์พังงา</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            พังงาเป็นจังหวัดที่มีความอุดมสมบูรณ์ของทรัพยากรธรรมชาติ ทั้งท้องทะเล
            ป่าไม้ ภูเขา น้ำตก และถ้ำ มีสถานที่ท่องเที่ยวหลากหลายรูปแบบ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-custom hover-scale"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            ข้อมูลเพิ่มเติมเกี่ยวกับพังงา
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {info.map((infoItem, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
                <div className="text-3xl text-primary mb-4">
                  {infoItem.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3">{infoItem.title}</h4>
                <ul className="space-y-2">
                  {infoItem.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhangNgaHighlights;
