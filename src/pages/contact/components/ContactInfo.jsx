import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaLine,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">ข้อมูลติดต่อ</h2>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="text-primary text-2xl mt-1 mr-4">
            <FaMapMarkerAlt />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">ที่อยู่</h3>
            <p>83 ถ.พังงา ต.ตลาดใหญ่ อ.เมือง จ.ภูเก็ต 83000</p>
            <a
              href="https://maps.app.goo.gl/Ydw5smr3pd1fsyXF6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition-colors mt-2 inline-block"
            >
              ดูแผนที่ Google Maps
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="text-primary text-2xl mt-1 mr-4">
            <FaPhoneAlt />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">โทรศัพท์</h3>
            <p>076-123456, 081-1234567</p>
            <p className="text-gray-600 text-sm mt-1">
              สามารถติดต่อผ่าน Line ได้ที่เบอร์ 081-1234567
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="text-primary text-2xl mt-1 mr-4">
            <FaEnvelope />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">อีเมล</h3>
            <a
              href="mailto:info@sevensmile.com"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              info@sevensmile.com
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="text-primary text-2xl mt-1 mr-4">
            <FaClock />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">เวลาทำการ</h3>
            <p>จันทร์ - เสาร์: 09:00 - 18:00 น.</p>
            <p>วันอาทิตย์และวันหยุดนักขัตฤกษ์: 10:00 - 16:00 น.</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">ติดตามเรา</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-primary hover:text-primary-dark transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-primary hover:text-primary-dark transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-primary hover:text-primary-dark transition-colors"
            >
              <FaLine />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
