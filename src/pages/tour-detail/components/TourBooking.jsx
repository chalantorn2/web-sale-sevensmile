import {
  FaPhone,
  FaLine,
  FaEnvelope,
  FaCalculator,
  FaClock,
} from "react-icons/fa";

const TourBooking = ({ tour }) => {
  if (!tour) {
    return (
      <div className="sticky top-24">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const groupSizes = [
    { people: 1, label: "1 ท่าน" },
    { people: 2, label: "2 ท่าน" },
    { people: 4, label: "4 ท่าน" },
    { people: 6, label: "6 ท่าน" },
    { people: 10, label: "10 ท่าน" },
  ];

  const contactMethods = [
    {
      type: "hotline",
      icon: <FaPhone className="text-red-500" />,
      label: "Hotline",
      value: "095-265-5516",
      href: "tel:0952655516",
      description: "สายด่วน 24 ชั่วโมง",
    },
    {
      type: "tour",
      icon: <FaPhone className="text-blue-500" />,
      label: "แผนกทัวร์",
      value: "082-253-6662, 061-928-9988",
      href: "tel:0822536662",
      description: "จองทัวร์และสอบถามรายละเอียด",
    },
    {
      type: "ticket",
      icon: <FaPhone className="text-green-500" />,
      label: "แผนกตั๋ว",
      value: "083-969-1300",
      href: "tel:0839691300",
      description: "จองตั๋วเครื่องบิน",
    },
    {
      type: "line",
      icon: <FaLine className="text-green-500" />,
      label: "Line Official",
      value: "@sevensmile",
      href: "https://line.me/R/ti/p/@sevensmile",
      description: "แชทสอบถามได้ตลอดเวลา",
    },
    {
      type: "email",
      icon: <FaEnvelope className="text-orange-500" />,
      label: "อีเมล",
      value: "sevensmiletour@gmail.com",
      href: "mailto:sevensmiletour@gmail.com",
      description: "ส่งข้อมูลรายละเอียด",
    },
  ];

  return (
    <div className="sticky top-24 space-y-6 ">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">ราคาทัวร์</h3>
          <div className="flex items-baseline gap-2">
            {tour.oldPrice && (
              <span className="text-gray-500 line-through text-lg">
                ฿{tour.oldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-bold text-blue-600">
              ฿{tour.price.toLocaleString()}
            </span>
            <span className="text-gray-600">/ท่าน</span>
          </div>
          {tour.oldPrice && (
            <div className="mt-2 inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
              ประหยัด{" "}
              {Math.round(((tour.oldPrice - tour.price) / tour.oldPrice) * 100)}
              %
            </div>
          )}
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
            <FaCalculator className="mr-2" />
            ราคาทัวร์
          </h4>
          <div className="space-y-2">
            {groupSizes.map((group) => (
              <div key={group.people} className="flex justify-between text-sm">
                <span className="text-gray-600">{group.label}</span>
                <span className="font-medium text-blue-600">
                  ฿{(group.people * tour.price).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">ติดต่อจองทัวร์</h3>
        <div className="space-y-4">
          {contactMethods.map((contact) => (
            <div
              key={contact.type}
              className="border-b border-gray-100 pb-3 last:border-b-0"
            >
              <div className="flex items-start">
                <div className="text-xl mr-3 mt-1">{contact.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 mb-1">
                    {contact.label}
                  </div>
                  <a
                    href={contact.href}
                    target={contact.type === "line" ? "_blank" : undefined}
                    rel={
                      contact.type === "line"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    {contact.value}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    {contact.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <a
            href="tel:0952655516"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium text-center flex items-center justify-center transition-colors"
          >
            <FaPhone className="mr-2" />
            โทรจองทันที
          </a>
          <a
            href="https://line.me/R/ti/p/@sevensmile"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium text-center flex items-center justify-center transition-colors"
          >
            <FaLine className="mr-2" />
            แชท Line
          </a>
          <a
            href={`mailto:sevensmiletour@gmail.com?subject=สอบถามทัวร์: ${tour.title}`}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium text-center flex items-center justify-center transition-colors"
          >
            <FaEnvelope className="mr-2" />
            ส่งอีเมล
          </a>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>เวลาทำการ: จันทร์-เสาร์ 08:00-17:00 น.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-3">ทำไมต้องเลือกเรา?</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✓</span>
            <span>ใบอนุญาต TAT License</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✓</span>
            <span>ประกันภัยครอบคลุม</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✓</span>
            <span>ไกด์มืออาชีพ</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✓</span>
            <span>รีวิวดี {tour.rating}/5 ดาว</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TourBooking;
