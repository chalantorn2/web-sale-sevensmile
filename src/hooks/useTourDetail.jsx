// src/hooks/useTourDetail.js - Updated สำหรับใช้ API
import { useState, useEffect } from "react";
import { toursApi } from "../utils/api";
import { useParams } from "react-router-dom";

const useTourDetail = (tourSlug) => {
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { destination } = useParams(); // Get destination from URL

  useEffect(() => {
    if (!tourSlug || !destination) {
      setLoading(false);
      return;
    }

    const fetchTourDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use API instead of direct database access
        const result = await toursApi.getDetail(destination, tourSlug);

        if (result.error) {
          console.warn("API Error:", result.error);
          // Fallback to mock data
          const mockData = getMockTourData(destination, tourSlug);
          setTourData(mockData);
        } else if (result.data) {
          // Process and format API data
          const formattedTour = formatTourData(result.data);
          setTourData(formattedTour);
        } else {
          // No data found, use mock
          const mockData = getMockTourData(destination, tourSlug);
          setTourData(mockData);
        }
      } catch (err) {
        console.error("Error fetching tour detail:", err);
        setError(err.message);
        // Fallback to mock data
        const mockData = getMockTourData(destination, tourSlug);
        setTourData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetail();
  }, [tourSlug, destination]);

  return { tourData, loading, error };
};

// Format tour data from API response
const formatTourData = (apiData) => {
  // Group content by type
  const groupedContent = {
    included: [],
    excluded: [],
    bring: [],
    note: [],
    faq_q: [],
    faq_a: [],
    menu_breakfast: [],
    menu_lunch: [],
    menu_dinner: [],
    menu_snacks: [],
  };

  if (apiData.content) {
    apiData.content.forEach((item) => {
      if (groupedContent[item.type]) {
        groupedContent[item.type].push(item.content);
      }
    });
  }

  // Create FAQs array
  const faqs = [];
  for (let i = 0; i < groupedContent.faq_q.length; i++) {
    if (groupedContent.faq_a[i]) {
      faqs.push({
        question: groupedContent.faq_q[i],
        answer: groupedContent.faq_a[i],
      });
    }
  }

  // Create menu samples
  const menuSamples = {};
  if (groupedContent.menu_breakfast.length > 0)
    menuSamples.breakfast = groupedContent.menu_breakfast;
  if (groupedContent.menu_lunch.length > 0)
    menuSamples.lunch = groupedContent.menu_lunch;
  if (groupedContent.menu_dinner.length > 0)
    menuSamples.dinner = groupedContent.menu_dinner;
  if (groupedContent.menu_snacks.length > 0)
    menuSamples.snacks = groupedContent.menu_snacks;

  // Format gallery
  const gallery =
    apiData.gallery?.map((item) => ({
      src: item.url,
      alt: item.alt_text,
      caption: item.caption,
    })) || [];

  return {
    id: apiData.id,
    title: apiData.title,
    slug: apiData.slug,
    heroImage: apiData.heroImage,
    location: apiData.location,
    destination: apiData.destination,
    price: Number(apiData.price) || 0,
    oldPrice: apiData.oldPrice ? Number(apiData.oldPrice) : null,
    duration: apiData.duration,
    rating: Number(apiData.rating) || 0,
    reviewCount: Number(apiData.reviewCount) || 0,
    description: apiData.description,
    highlights: apiData.highlights || [],
    included: groupedContent.included,
    excluded: groupedContent.excluded,
    whatToBring: groupedContent.bring,
    importantNotes: groupedContent.note,
    faqs: faqs,
    menuSamples: Object.keys(menuSamples).length > 0 ? menuSamples : null,
    gallery: gallery.length > 0 ? gallery : null,
    reviews: apiData.reviews || [],
    options: apiData.options || [],
    programs: apiData.options || [], // alias
    itinerary: [], // will be populated from options or separate API
  };
};

// Mock data generator for fallback
const getMockTourData = (destination, tourSlug) => {
  const mockTours = {
    krabi: {
      "four-islands-speedboat": {
        id: 1,
        title: "ทัวร์ 4 เกาะ กระบี่ One Day Trip",
        slug: "four-islands-speedboat",
        heroImage: "/images/tours/four-islands-hero.jpg",
        location: "กระบี่",
        destination: "krabi",
        price: 1290,
        oldPrice: 1590,
        duration: "1 วัน",
        rating: 4.8,
        reviewCount: 156,
        description:
          "สำรวจความงามของ 4 เกาะสุดฮิตในกระบี่ ด้วยเรือสปีดโบ๊ทสุดหรู",
        highlights: [
          "เกาะปอดะ - ชายหาดทรายขาวละเอียด",
          "ไก่เดี่ยว - โขดหินรูปไก่แปลกตา",
          "ถ้ำพระนาง - ถ้ำในตำนาน",
          "ทะเลแหวก - ปรากฏการณ์ธรรมชาติ",
        ],
        included: [
          "รถรับ-ส่ง โรงแรม (เขตเมืองกระบี่)",
          "เรือสปีดโบ๊ท + ไกด์ท้องถิ่น",
          "อาหารกลางวัน + ผลไม้ + น้ำดื่ม",
          "อุปกรณ์ดำน้ำตื้น (หน้ากาก+ท่อหายใจ)",
          "ประกันอุบัติเหตุ",
          "ค่าธรรมเนียมเข้าอุทยาน",
        ],
        excluded: [
          "ค่าใช้จ่ายส่วนตัว",
          "ทิปไกด์และลูกเรือ",
          "รองเท้าแตะกันลื่น (แนะนำให้เตรียมมา)",
        ],
        whatToBring: [
          "ชุดว่ายน้ำ และ เสื้อผ้าสำรอง",
          "ผ้าเช็ดตัว",
          "ครีมกันแดด กันน้ำ SPF 50+",
          "แว่นกันแดด และ หมวก",
          "กล้องกันน้ำ (ถ่ายใต้น้ำ)",
          "เงินสำหรับค่าใช้จ่ายส่วนตัว",
        ],
        importantNotes: [
          "เวลาอาจปรับเปลี่ยนตามสภาพอากาศและกระแสน้ำ",
          "ไม่เหมาะสำหรับเด็กอายุต่ำกว่า 4 ปี และ หญิงมีครรภ์",
          "ห้ามดื่มแอลกอฮอล์ก่อนลงเรือ",
          "ควรแจ้งอาการเมาเรือล่วงหน้า",
        ],
        gallery: [
          {
            src: "/images/tours/four-islands/gallery1.jpg",
            alt: "เกาะปอดะ ชายหาดทรายขาว",
          },
          {
            src: "/images/tours/four-islands/gallery2.jpg",
            alt: "ไก่เดี่ยว โขดหินแปลกตา",
          },
          {
            src: "/images/tours/four-islands/gallery3.jpg",
            alt: "ถ้ำพระนาง ถ้ำในตำนาน",
          },
          {
            src: "/images/tours/four-islands/gallery4.jpg",
            alt: "ทะเลแหวก ปรากฏการณ์ธรรมชาติ",
          },
          {
            src: "/images/tours/four-islands/gallery5.jpg",
            alt: "ดำน้ำตื้นชมปะการัง",
          },
          {
            src: "/images/tours/four-islands/gallery6.jpg",
            alt: "อาหารกลางวันบนเกาะ",
          },
        ],
        itinerary: [
          {
            time: "08:00",
            activity: "รับจากโรงแรม",
            description: "รถรับจากโรงแรมในเขตเมืองกระบี่",
          },
          {
            time: "09:00",
            activity: "ออกเดินทางด้วยเรือสปีดโบ๊ท",
            description: "จากท่าเรืออ่าวนาง",
          },
          {
            time: "09:30",
            activity: "เกาะไก่ (Chicken Island)",
            description: "ชมโขดหินรูปไก่ ถ่ายรูป ดำน้ำตื้น",
          },
          {
            time: "10:30",
            activity: "ทะเลแหวก (Separated Sea)",
            description: "เดินบนทรายกลางทะเล ปรากฏการณ์ธรรมชาติ",
          },
          {
            time: "11:30",
            activity: "เกาะปอดะ (Poda Island)",
            description: "ชายหาดทรายขาวละเอียด ดำน้ำตื้น",
          },
          {
            time: "12:30",
            activity: "อาหารกลางวัน",
            description: "มื้อกลางวันแสนอร่อยบนเกาะ",
          },
          {
            time: "13:30",
            activity: "ถ้ำพระนาง (Phra Nang Cave)",
            description: "สำรวจถ้ำในตำนาน ชายหาดสวยงาม",
          },
          {
            time: "15:00",
            activity: "เดินทางกลับ",
            description: "เรือสปีดโบ๊ทกลับสู่ท่าเรือ",
          },
          {
            time: "16:00",
            activity: "ส่งกลับโรงแรม",
            description: "ส่งถึงโรงแรมพร้อมความประทับใจ",
          },
        ],
        reviews: [
          {
            name: "คุณสมชาย",
            rating: 5.0,
            comment: "ทัวร์ดีมาก ไกด์น่ารัก อธิบายดี ทะเลใสมาก แนะนำเลย",
            review_date: "2024-11-15",
          },
          {
            name: "คุณมาลี",
            rating: 4.5,
            comment: "สวยงามมาก เรือเร็วสบาย อาหารอร่อย คุ้มค่าเงิน",
            review_date: "2024-11-10",
          },
        ],
        faqs: [
          {
            question: "ทัวร์นี้เหมาะกับเด็กเล็กหรือไม่?",
            answer:
              "เหมาะสำหรับเด็กอายุ 4 ปีขึ้นไป ต้องมีผู้ปกครองดูแลตลอดเวลา",
          },
          {
            question: "ถ้าฝนตกทัวร์จะยกเลิกไหม?",
            answer:
              "หากสภาพอากาศไม่เอื้ออำนวย จะแจ้งให้ทราบล่วงหน้าและสามารถเลื่อนวันหรือขอเงินคืนได้",
          },
        ],
      },
      "phi-phi-speedboat": {
        id: 2,
        title: "ทัวร์เกาะพีพี อ่าวมาหยา เกาะไผ่",
        slug: "phi-phi-speedboat",
        heroImage: "/images/tours/phi-phi-hero.jpg",
        location: "กระบี่",
        destination: "krabi",
        price: 1590,
        oldPrice: 1890,
        duration: "1 วัน",
        rating: 4.7,
        reviewCount: 142,
        description:
          "สัมผัสความงามของเกาะพีพี อ่าวมาหยาในภาพยนตร์ดัง และเกาะไผ่สีเขียวมรกต",
        highlights: [
          "อ่าวมาหยา (Maya Bay) - สถานที่ถ่ายทำภาพยนตร์ The Beach",
          "อ่าวปิเละ (Pileh Lagoon) - ทะเลสีเขียวมรกต",
          "เกาะไผ่ (Bamboo Island) - หาดทรายขาวสะอาด",
          "ถ้ำไวกิ้ง (Viking Cave) - ถ้ำเก็บรังนกนางแอ่น",
        ],
        included: [
          "รถรับ-ส่ง จากโรงแรม",
          "เรือสปีดโบ๊ท + ไกด์มืออาชีพ",
          "อาหารกลางวันสไตล์ไทย",
          "ผลไม้สด + เครื่องดื่ม",
          "อุปกรณ์ดำน้ำตื้น",
          "ประกันการเดินทาง",
        ],
        excluded: [
          "ค่าธรรมเนียมเข้าอุทยานแห่งชาติ 400 บาท",
          "ค่าใช้จ่ายส่วนตัว",
          "ทิปไกด์และลูกเรือ",
        ],
        whatToBring: [
          "ชุดว่ายน้ำ",
          "ครีมกันแดดกันน้ำ",
          "แว่นกันแดด",
          "ผ้าเช็ดตัว",
          "กล้องถ่ายรูป",
        ],
        gallery: [
          {
            src: "/images/tours/phi-phi/maya-bay.jpg",
            alt: "อ่าวมาหยา ที่ถ่ายทำ The Beach",
          },
          {
            src: "/images/tours/phi-phi/pileh-lagoon.jpg",
            alt: "อ่าวปิเละ ทะเลสีเขียวมรกต",
          },
          {
            src: "/images/tours/phi-phi/bamboo-island.jpg",
            alt: "เกาะไผ่ หาดทรายขาว",
          },
          { src: "/images/tours/phi-phi/viking-cave.jpg", alt: "ถ้ำไวกิ้ง" },
        ],
        itinerary: [
          {
            time: "07:30",
            activity: "รับจากโรงแรม",
            description: "รถรับจากโรงแรม",
          },
          {
            time: "08:30",
            activity: "ออกเดินทาง",
            description: "เรือสปีดโบ๊ทจากท่าเรือ",
          },
          {
            time: "10:00",
            activity: "อ่าวมาหยา",
            description: "ชมความงาม ถ่ายรูป",
          },
          {
            time: "11:00",
            activity: "อ่าวปิเละ",
            description: "ดำน้ำตื้น ว่ายน้ำ",
          },
          {
            time: "12:30",
            activity: "อาหารกลางวัน",
            description: "บนเกาะพีพีดอน",
          },
          {
            time: "14:00",
            activity: "เกาะไผ่",
            description: "พักผ่อน ดำน้ำตื้น",
          },
          {
            time: "15:30",
            activity: "เดินทางกลับ",
            description: "กลับท่าเรือ",
          },
        ],
      },
    },
    phuket: {
      "james-bond-speedboat": {
        id: 5,
        title: "ทัวร์เกาะเจมส์บอนด์ เขาตะปู",
        slug: "james-bond-speedboat",
        heroImage: "/images/tours/james-bond-island.jpg",
        location: "ภูเก็ต",
        destination: "phuket",
        price: 1490,
        oldPrice: 1790,
        duration: "1 วัน",
        rating: 4.8,
        reviewCount: 167,
        description:
          "ท่องเที่ยวเกาะเจมส์บอนด์ เขาตะปูในภาพยนตร์ดัง และหมู่บ้านชาวเลโก้ปันหยี",
        highlights: [
          "เกาะเจมส์บอนด์ - เขาตะปูในภาพยนตร์ 007",
          "อ่าวพังงา - ทัศนียภาพสุดงาม",
          "หมู่บ้านชาวเลโก้ปันหยี",
          "ถ้ำซุ่ย - ชมหินย้อยงาม",
        ],
      },
    },
    "phang-nga": {
      "similan-speedboat": {
        id: 8,
        title: "ทัวร์เกาะสิมิลัน One Day Trip",
        slug: "similan-speedboat",
        heroImage: "/images/phang-nga/similan-speedboat.jpg",
        location: "พังงา",
        destination: "phang-nga",
        price: 3290,
        oldPrice: 3790,
        duration: "1 วัน",
        rating: 4.9,
        reviewCount: 245,
        description:
          "ดำดิ่งสู่สวรรค์ใต้น้ำ เกาะสิมิลัน หนึ่งในจุดดำน้ำที่สวยที่สุดในโลก",
        highlights: [
          "เกาะสิมิลัน - สวรรค์นักดำน้ำ",
          "Sailing Rock - จุดชมวิวสุดงาม",
          "Princess Beach - หาดทรายขาวละเอียด",
          "ดำน้ำตื้นชมปะการังสีสวย",
        ],
      },
    },
  };

  // Return mock data based on destination and slug
  const destinationTours = mockTours[destination];
  if (destinationTours && destinationTours[tourSlug]) {
    return destinationTours[tourSlug];
  }

  // Default fallback
  return {
    id: 0,
    title: "ทัวร์ไม่พบข้อมูล",
    slug: tourSlug,
    destination: destination,
    location: destination,
    price: 0,
    description: "ขออภัย ไม่พบข้อมูลทัวร์นี้",
    highlights: [],
    included: [],
    excluded: [],
    whatToBring: [],
    importantNotes: [],
    gallery: [],
    itinerary: [],
    reviews: [],
    faqs: [],
  };
};

export default useTourDetail;
