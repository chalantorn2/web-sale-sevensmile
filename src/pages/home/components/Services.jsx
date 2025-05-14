import {
  FaRoute,
  FaPlane,
  FaHotel,
  FaBusAlt,
  FaShip,
  FaIdCard,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaRoute />,
      title: "ทัวร์ในประเทศ",
      description:
        "บริการทัวร์ในประเทศไทยคุณภาพดี ราคาประหยัด ครอบคลุมทุกจังหวัดทั่วไทย",
    },
    {
      icon: <FaPlane />,
      title: "ทัวร์ต่างประเทศ",
      description:
        "ทัวร์ต่างประเทศแบบหลากหลาย ทั้งเอเชีย ยุโรป อเมริกา ออสเตรเลียและนิวซีแลนด์",
    },
    {
      icon: <FaHotel />,
      title: "จองโรงแรม",
      description:
        "จองโรงแรมทั่วโลกในราคาพิเศษ พร้อมห้องพักให้เลือกหลากหลายระดับ",
    },
    {
      icon: <FaBusAlt />,
      title: "รถเช่าพร้อมคนขับ",
      description:
        "บริการรถเช่าพร้อมคนขับ รถตู้ รถบัส รถเก๋ง พร้อมคนขับที่ชำนาญเส้นทาง",
    },
    {
      icon: <FaShip />,
      title: "เช่าเรือส่วนตัว",
      description:
        "บริการเช่าเรือส่วนตัวพร้อมกัปตัน สำหรับเที่ยวเกาะต่างๆ ทั้งภูเก็ต กระบี่ พังงา",
    },
    {
      icon: <FaIdCard />,
      title: "วีซ่า",
      description:
        "บริการรับทำวีซ่า ครอบคลุมทุกประเทศ ทั้งท่องเที่ยว ธุรกิจ และศึกษาต่อ",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">บริการของเรา</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Seven Smile Tour And Ticket ให้บริการด้านการท่องเที่ยวอย่างครบวงจร
            ด้วยทีมงานมืออาชีพที่พร้อมดูแลลูกค้าทุกท่าน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-custom hover-scale"
            >
              <div className="text-4xl text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
