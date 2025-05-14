import { FaMapMarkedAlt, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const KrabiHighlights = () => {
  const highlights = [
    {
      title: "เกาะพีพี",
      image: "/images/krabi/phi-phi.jpg",
      description:
        "เกาะสวรรค์ที่มีชื่อเสียงระดับโลก ด้วยน้ำทะเลสีเขียวมรกต หาดทรายขาวละเอียด และแนวปะการังที่สวยงาม",
    },
    {
      title: "4 เกาะ",
      image: "/images/krabi/4-islands.jpg",
      description:
        "ทัวร์ยอดนิยมที่จะพาคุณไปเยือน 4 เกาะสวย ได้แก่ เกาะปอดะ เกาะไก่ เกาะม้า และเกาะทับ",
    },
    {
      title: "เกาะห้อง",
      image: "/images/krabi/hong-island.jpg",
      description:
        "เกาะห้อง หรือ ทะเลใน ที่เกิดจากการยุบตัวของภูเขาหินปูน เกิดเป็นลากูนธรรมชาติที่สวยงาม",
    },
    {
      title: "อ่าวมาหยา",
      image: "/images/krabi/maya-bay.jpg",
      description:
        "อ่าวที่มีชื่อเสียงจากภาพยนตร์ The Beach มีหาดทรายขาวละเอียด ล้อมรอบด้วยหน้าผาหินปูนสูงชัน",
    },
    {
      title: "ทะเลแหวก",
      image: "/images/krabi/talay-waek.jpg",
      description:
        "ปรากฏการณ์ธรรมชาติที่เกิดจากสันทรายเชื่อมระหว่างเกาะ 3 เกาะ ปรากฏให้เห็นในช่วงน้ำลงเท่านั้น",
    },
    {
      title: "อ่าวไร่เลย์",
      image: "/images/krabi/railay.jpg",
      description:
        "หาดไร่เลย์เป็นหาดที่มีชื่อเสียงในด้านการปีนผา มีหน้าผาหินปูนและหาดทรายขาวสวยงาม",
    },
  ];

  const info = [
    {
      icon: <FaMapMarkedAlt />,
      title: "สถานที่ท่องเที่ยวยอดนิยม",
      items: [
        "เกาะพีพี & อ่าวมาหยา",
        "ทัวร์ 4 เกาะ (เกาะปอดะ, เกาะไก่, เกาะม้า, เกาะทับ)",
        "เกาะห้อง (ทะเลใน)",
        "อ่าวไร่เลย์",
        "ทะเลแหวก",
        "เกาะลันตา",
        "น้ำตกร้อน",
        "สระมรกต",
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
        "การเดินทาง: มีสนามบินกระบี่ สามารถบินตรงจากกรุงเทพฯ ใช้เวลาประมาณ 1 ชั่วโมง 20 นาที",
        "อุทยานแห่งชาติหมู่เกาะพีพี มีค่าธรรมเนียมเข้าอุทยาน ผู้ใหญ่ 400 บาท เด็ก 200 บาท",
        "ควรเตรียมชุดว่ายน้ำ ครีมกันแดด หมวก และแว่นตากันแดด",
        "ในช่วงมรสุม (พฤษภาคม - ตุลาคม) บางเกาะอาจปิดให้บริการ",
      ],
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">ไฮไลท์กระบี่</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            กระบี่เป็นจังหวัดที่มีสถานที่ท่องเที่ยวทางทะเลที่สวยงามมากมาย
            ตั้งแต่เกาะสวย หาดทราย ถ้ำ และภูเขาหินปูน
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
            ข้อมูลเพิ่มเติมเกี่ยวกับกระบี่
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

export default KrabiHighlights;
