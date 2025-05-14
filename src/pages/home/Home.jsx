import { useEffect } from "react";
import Hero from "../../components/Hero";
import FeaturedTours from "./components/FeaturedTours";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import { generateMetaTags, generateStructuredData } from "../../utils/seo";
import "./Home.css";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
const Home = () => {
  useEffect(() => {
    generateMetaTags(
      "Seven Smile Tour And Ticket | ทัวร์กระบี่ ทัวร์พังงา ทัวร์ภูเก็ต",
      "บริการทัวร์ในประเทศไทย ทัวร์ต่างประเทศ และตั๋วเครื่องบิน บริการทัวร์กระบี่ ทัวร์พังงา ทัวร์ภูเก็ต โดยทีมงานมืออาชีพ",
      "ทัวร์กระบี่, ทัวร์พังงา, ทัวร์ภูเก็ต, ทัวร์ต่างประเทศ, ตั๋วเครื่องบิน"
    );

    generateStructuredData({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Seven Smile Tour And Ticket",
      url: "https://www.sevensmiletour.com",
      logo: "https://www.sevensmiletour.com/assets/images/logo.png",
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
      openingHours: "Mo-Sa 09:00-18:00",
    });
  }, []);

  const heroImages = [banner1, banner2, banner3];

  return (
    <div>
      <Hero
        images={heroImages}
        title="ทัวร์กระบี่ ภูเก็ต พังงา และทัวร์ต่างประเทศ"
        subtitle="ให้บริการทัวร์คุณภาพโดยทีมงานมืออาชีพ พร้อมบริการตั๋วเครื่องบินในราคาพิเศษ"
        primaryButton={{ text: "ทัวร์ยอดนิยม", link: "#featured-tours" }}
        secondaryButton={{ text: "ติดต่อเรา", link: "/contact" }}
      />

      <div id="featured-tours">
        <FeaturedTours />
      </div>

      <Services />

      <Testimonials />
    </div>
  );
};

export default Home;
