import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLine,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-10 mt-5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4 ">
              <img
                src="/images/logo.png"
                alt="Seven Smile Tour And Ticket"
                className="h-16"
              />
            </Link>
            <h3 className="text-xl font-semibold mb-2">
              Seven Smile Tour And Ticket
            </h3>
            <p className="mb-4">
              บริการทัวร์ในประเทศ ทัวร์ต่างประเทศ และตั๋วเครื่องบิน
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-secondary-light transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-secondary-light transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-secondary-light transition-colors"
              >
                <FaLine />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">ทัวร์ยอดนิยม</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/krabi"
                  className="hover:text-secondary-light transition-colors"
                >
                  ทัวร์กระบี่
                </Link>
              </li>
              <li>
                <Link
                  to="/phuket"
                  className="hover:text-secondary-light transition-colors"
                >
                  ทัวร์ภูเก็ต
                </Link>
              </li>
              <li>
                <Link
                  to="/phang-nga"
                  className="hover:text-secondary-light transition-colors"
                >
                  ทัวร์พังงา
                </Link>
              </li>
              <li>
                <Link
                  to="/international"
                  className="hover:text-secondary-light transition-colors"
                >
                  ทัวร์ญี่ปุ่น
                </Link>
              </li>
              <li>
                <Link
                  to="/international"
                  className="hover:text-secondary-light transition-colors"
                >
                  ทัวร์เกาหลี
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">เมนู</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-secondary-light transition-colors"
                >
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link
                  to="/international"
                  className="hover:text-secondary-light transition-colors"
                >
                  ทัวร์ต่างประเทศ
                </Link>
              </li>
              <li>
                <Link
                  to="/group-tour"
                  className="hover:text-secondary-light transition-colors"
                >
                  จัดกรุ๊ปทัวร์
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-secondary-light transition-colors"
                >
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">ติดต่อเรา</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0" />
                <p>83 ถ.พังงา ต.ตลาดใหญ่ อ.เมือง จ.ภูเก็ต 83000</p>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2 flex-shrink-0" />
                <p>076-123456, 081-1234567</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 flex-shrink-0" />
                <p>info@sevensmile.com</p>
              </div>
              <div className="pt-2">
                <a
                  href="https://maps.app.goo.gl/Ydw5smr3pd1fsyXF6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-secondary px-4 py-2 rounded hover:bg-secondary-dark transition-colors"
                >
                  แผนที่ Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-dark py-4">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} Seven Smile Tour And Ticket.
            สงวนลิขสิทธิ์
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
