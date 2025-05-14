import { FaMapMarkedAlt, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const PhuketHighlights = () => {
  const highlights = [
    {
      title: "เกาะพีพี",
      image: "/images/phuket/phi-phi.jpg",
      description:
        "ดินแดนสวรรค์แห่งอันดามันที่มีความสวยงามระดับโลก น้ำทะเลใสสีฟ้าเทอร์ควอยซ์ ชายหาดสีขาวละเอียด และแนวปะการังที่อุดมสมบูรณ์",
    },
    {
      title: "เกาะเจมส์บอนด์",
      image: "/images/phuket/james-bond.jpg",
      description:
        "เกาะตะปู หรือเกาะเจมส์บอนด์ สถานที่ถ่ายทำภาพยนตร์ดัง เกาะที่มีรูปร่างแปลกตา ตั้งเด่นเป็นสง่าในท้องทะเลอันดามัน",
    },
    {
      title: "หาดป่าตอง",
      image: "/images/phuket/patong.jpg",
      description:
        "หาดที่มีชื่อเสียงที่สุดในภูเก็ต ที่นี่คึกคักไปด้วยร้านอาหาร บาร์ แหล่งช้อปปิ้ง และกิจกรรมทางน้ำมากมาย",
    },
    {
      title: "พรอมเทพเคป",
      image: "/images/phuket/promthep-cape.jpg",
      description:
        "จุดชมวิวที่สวยที่สุดในภูเก็ต ชมพระอาทิตย์ตกสุดโรแมนติกที่สามารถมองเห็นวิวทะเลอันดามันได้ 180 องศา",
    },
    {
      title: "ย่านเมืองเก่าภูเก็ต",
      image: "/images/phuket/old-town.jpg",
      description:
        "อาคารสถาปัตยกรรมชิโนโปรตุกีสอันงดงาม สะท้อนให้เห็นถึงประวัติศาสตร์อันรุ่งเรืองของเมืองเหมืองแร่",
    },
    {
      title: "แหลมพรหมเทพ",
      image: "/images/phuket/promthep.jpg",
      description:
        "จุดชมพระอาทิตย์ตกที่สวยที่สุดแห่งหนึ่งของประเทศไทย มองเห็นวิวทะเลอันดามันได้อย่างกว้างไกล",
    },
  ];

  const info = [
    {
      icon: <FaMapMarkedAlt />,
      title: "สถานที่ท่องเที่ยวยอดนิยม",
      items: [
        "เกาะพีพี",
        "อ่าวพังงา - เกาะเจมส์บอนด์",
        "ภูเก็ต แฟนตาซี",
        "พิพิธภัณฑ์ภูเก็ตไทยหัว",
        "เมืองเก่าภูเก็ต",
        "หาดป่าตอง หาดกะตะ หาดกะรน",
        "พระพุทธมิ่งมงคลเอกนาคคีรี (พระใหญ่)",
        "แหลมพรหมเทพ",
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
        "การเดินทาง: มีสนามบินนานาชาติภูเก็ต สามารถบินตรงจากกรุงเทพฯ ใช้เวลาประมาณ 1 ชั่วโมง 20 นาที",
        "อุทยานแห่งชาติหมู่เกาะพีพี มีค่าธรรมเนียมเข้าอุทยาน ผู้ใหญ่ 400 บาท เด็ก 200 บาท",
        "ควรเตรียมชุดว่ายน้ำ ครีมกันแดด หมวก และแว่นตากันแดด",
        "ในช่วงมรสุม (พฤษภาคม - ตุลาคม) บางเกาะและหาดอาจปิดให้บริการ",
      ],
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">ไฮไลท์ภูเก็ต</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ภูเก็ตเป็นเกาะที่ใหญ่ที่สุดของประเทศไทย
            มีสถานที่ท่องเที่ยวที่หลากหลาย ทั้งชายหาดสวย ๆ เกาะน้อยใหญ่
            และสถานที่ท่องเที่ยวทางวัฒนธรรม
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
            ข้อมูลเพิ่มเติมเกี่ยวกับภูเก็ต
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

export default PhuketHighlights;
