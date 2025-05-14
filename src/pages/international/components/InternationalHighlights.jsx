import {
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaInfoCircle,
  FaPassport,
} from "react-icons/fa";

const InternationalHighlights = () => {
  const highlights = [
    {
      title: "ญี่ปุ่น",
      image: "/images/international/japan.jpg",
      description:
        "สัมผัสวัฒนธรรมอันเป็นเอกลักษณ์ ชมซากุระบาน ภูเขาฟูจิ วัดเก่าแก่ ชิมอาหารเลิศรส และช้อปปิ้งสินค้าแบรนด์ดัง",
    },
    {
      title: "เกาหลี",
      image: "/images/international/korea.jpg",
      description:
        "ตามรอยซีรีส์ดัง เยือนพระราชวังโบราณ เดินเล่นย่านเมียงดง ทดลองแต่งชุดฮันบก และลิ้มลองอาหารเกาหลีแท้ๆ",
    },
    {
      title: "ฮ่องกง-มาเก๊า",
      image: "/images/international/hongkong.jpg",
      description:
        "เที่ยวดิสนีย์แลนด์ ไหว้พระวัดดัง ชมวิวบนจุดชมวิว Victoria Peak ช้อปปิ้งตลาดนัดเลดี้มาร์เก็ต และลองเสี่ยงโชคที่คาสิโนมาเก๊า",
    },
    {
      title: "ยุโรป",
      image: "/images/international/europe.jpg",
      description:
        "ชมสถาปัตยกรรมอันงดงาม พระราชวังเก่าแก่ หอไอเฟล มหาวิหารโนเทรอดาม ล่องเรือแม่น้ำไรน์ และช้อปปิ้งสินค้าแบรนด์เนม",
    },
    {
      title: "สิงคโปร์",
      image: "/images/international/singapore.jpg",
      description:
        "ชมความทันสมัยของเมรไลออน การ์เด้นบายเดอะเบย์ ยูนิเวอร์แซลสตูดิโอ เที่ยวเกาะเซ็นโตซ่า และชมโชว์แสงสีเสียง",
    },
    {
      title: "ไต้หวัน",
      image: "/images/international/taiwan.jpg",
      description:
        "ตึกไทเป 101 อุทยานแห่งชาติเย่หลิว ล่องเรือทะเลสาบสุริยันจันทรา ตลาดกลางคืนและลิ้มลองอาหารไต้หวันแท้ๆ",
    },
  ];

  const info = [
    {
      icon: <FaMapMarkedAlt />,
      title: "ทวีปยอดนิยม",
      items: [
        "เอเชีย (ญี่ปุ่น, เกาหลี, จีน, ฮ่องกง, สิงคโปร์)",
        "ยุโรป (อิตาลี, ฝรั่งเศส, สวิตเซอร์แลนด์, อังกฤษ)",
        "อเมริกา (สหรัฐอเมริกา, แคนาดา)",
        "ออสเตรเลียและนิวซีแลนด์",
        "ตะวันออกกลาง (ดูไบ, ตุรกี)",
      ],
    },
    {
      icon: <FaCalendarAlt />,
      title: "ช่วงเวลาที่เหมาะสำหรับการเที่ยว",
      items: [
        "ญี่ปุ่น: ฤดูใบไม้ผลิ (มี.ค.-พ.ค.), ฤดูใบไม้ร่วง (ก.ย.-พ.ย.)",
        "เกาหลี: ฤดูใบไม้ผลิ (มี.ค.-พ.ค.), ฤดูใบไม้ร่วง (ก.ย.-พ.ย.)",
        "ยุโรป: ฤดูร้อน (มิ.ย.-ส.ค.), ฤดูใบไม้ร่วง (ก.ย.-พ.ย.)",
        "ออสเตรเลีย: ฤดูร้อน (ธ.ค.-ก.พ.) หรือฤดูใบไม้ผลิ (ก.ย.-พ.ย.)",
        "ไต้หวัน: ฤดูใบไม้ร่วง (ก.ย.-พ.ย.), ฤดูหนาว (ธ.ค.-ก.พ.)",
      ],
    },
    {
      icon: <FaPassport />,
      title: "ข้อมูลวีซ่า",
      items: [
        "ญี่ปุ่น, เกาหลี, ไต้หวัน: ต้องทำวีซ่า สามารถยื่นได้ที่บริษัทของเรา",
        "ฮ่องกง, สิงคโปร์, มาเก๊า: คนไทยไม่ต้องทำวีซ่า พำนักได้ 14-30 วัน",
        "ยุโรป (เชงเก้น): ต้องทำวีซ่า ใช้เวลาประมาณ 15 วันทำการ",
        "อเมริกา: ต้องขอวีซ่าและสัมภาษณ์ ใช้เวลาประมาณ 1-2 เดือน",
        "ทางเรามีบริการให้คำปรึกษาเรื่องวีซ่าทุกประเภท",
      ],
    },
    {
      icon: <FaInfoCircle />,
      title: "ข้อมูลสำคัญ",
      items: [
        "แพ็คเกจทัวร์รวมตั๋วเครื่องบิน ที่พัก อาหาร รถรับส่ง และไกด์นำเที่ยว",
        "ประกันการเดินทางคุ้มครองตลอดทริป",
        "รองรับการเดินทางทั้งแบบกรุ๊ปทัวร์และแบบส่วนตัว (Private Tour)",
        "มีทัวร์หลายระดับราคาให้เลือกตามความต้องการ",
        "ฟรี! บริการถ่ายรูปตลอดทริป และมีบริการ WiFi ให้ใช้ตลอดการเดินทาง",
      ],
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">ไฮไลท์ทัวร์ต่างประเทศ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Seven Smile Tour มีทัวร์ต่างประเทศให้เลือกหลากหลายเส้นทาง
            ครอบคลุมทุกทวีปทั่วโลก พร้อมบริการครบวงจรและการันตีความประทับใจ
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
            ข้อมูลเพิ่มเติมเกี่ยวกับทัวร์ต่างประเทศ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

export default InternationalHighlights;
