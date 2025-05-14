import { useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "สมศักดิ์ มีสุข",
      avatar: "/images/avatar1.jpg",
      rating: 5,
      text: "ประทับใจมากๆ กับทริปกระบี่ 4 เกาะ ไกด์น่ารัก อาหารอร่อย เรือสปีดโบ๊ทดีมาก จะแนะนำเพื่อนๆ ให้มาใช้บริการแน่นอนครับ",
    },
    {
      id: 2,
      name: "นภาพร ใจดี",
      avatar: "/images/avatar2.jpg",
      rating: 5,
      text: "ใช้บริการทัวร์ภูเก็ตแบบเหมาทั้งครอบครัว ประทับใจมาก ทั้งบริการและความเป็นกันเอง ไกด์คอยดูแลตลอดทริป",
    },
    {
      id: 3,
      name: "วิชัย รักเที่ยว",
      avatar: "/images/avatar3.jpg",
      rating: 4,
      text: "พาครอบครัวไปเที่ยวญี่ปุ่น 5 วัน ดีทุกอย่าง ทั้งที่พัก อาหาร และสถานที่ท่องเที่ยว จัดการได้ครบถ้วน ไม่ผิดหวังเลย",
    },
    {
      id: 4,
      name: "สุพรรณี ชอบเที่ยว",
      avatar: "/images/avatar4.jpg",
      rating: 5,
      text: "เพิ่งกลับจากทริปเกาะพีพี ประทับใจมาก ทั้งสถานที่ อาหาร แนะนำมา Seven Smile ไม่ผิดหวังค่ะ",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            เสียงจากลูกค้า
          </h2>
          <p className="max-w-2xl mx-auto text-white">
            รีวิวจากลูกค้าที่ใช้บริการของเรา
            สะท้อนคุณภาพและความประทับใจที่เรามอบให้
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* ปรับพื้นหลังเป็นสีขาว และข้อความเป็นสีน้ำเงิน */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl absolute top-6 left-6 text-blue-200">
              <FaQuoteLeft />
            </div>

            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <img
                  src={
                    testimonials[activeIndex].avatar ||
                    "/images/default-avatar.jpg"
                  }
                  alt={testimonials[activeIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-500"
                  onError={(e) => {
                    e.target.src = "/images/default-avatar.jpg";
                  }}
                />
                <div>
                  <h4 className="text-xl font-semibold text-blue-900">
                    {testimonials[activeIndex].name}
                  </h4>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        className={
                          index < testimonials[activeIndex].rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-lg italic text-blue-700">
                "{testimonials[activeIndex].text}"
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-white" : "bg-white bg-opacity-30"
                }`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
