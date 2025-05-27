import { useEffect } from "react";
import ContactForm from "../../components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";
import "./Contact.css";

const Contact = () => {
  useEffect(() => {
    // Update SEO meta tags
    generateMetaTags(
      "ติดต่อเรา | Seven Smile Tour And Ticket",
      "ติดต่อ Seven Smile Tour And Ticket บริการทัวร์กระบี่ ทัวร์พังงา ทัวร์ภูเก็ต และทัวร์ต่างประเทศ",
      "ติดต่อทัวร์, ติดต่อบริษัททัวร์, บริษัททัวร์ภูเก็ต, Seven Smile Tour, จองทัวร์ภูเก็ต"
    );

    // Add structured data for better SEO
    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Seven Smile Tour And Ticket",
      url: "https://www.sevensmiletour.com",
      logo: "https://www.sevensmiletour.com/images/logo.png",
      description: "บริการทัวร์ในประเทศ ทัวร์ต่างประเทศ และตั๋วเครื่องบิน",
      address: {
        "@type": "PostalAddress",
        streetAddress: "83 ถ.พังงา",
        addressLocality: "ภูเก็ต",
        addressRegion: "ภูเก็ต",
        postalCode: "83000",
        addressCountry: "TH",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "7.8804911",
        longitude: "98.3883034",
      },
      telephone: "+66-76-123456",
      email: "sevensmiletour@hotmail.com",
      openingHours: "Mo-Sa 09:00-18:00",
    });
  }, []);

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">ติดต่อเรา</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติมเกี่ยวกับบริการของเรา
            สามารถติดต่อเราได้หลายช่องทาง
            ทีมงานของเราพร้อมให้คำปรึกษาและช่วยเหลือคุณตลอดเวลา
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ContactInfo />
          <ContactForm />
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">แผนที่</h2>
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.368502080951!2d98.91602809999999!3d8.063843100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x305195003902b487%3A0xf903773a543dde98!2sSeven%20Smile%20Tour%20And%20Ticket!5e0!3m2!1sth!2sth!4v1748332554675!5m2!1sth!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Seven Smile Tour And Ticket Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
