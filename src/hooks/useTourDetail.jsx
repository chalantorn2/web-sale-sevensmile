// src/hooks/useTourDetail.js - Fixed Gallery & Enhanced SEO
import { useState, useEffect } from "react";
import { toursApi } from "../utils/api";
import { useParams } from "react-router-dom";

const useTourDetail = (tourSlug) => {
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { destination } = useParams();

  useEffect(() => {
    if (!tourSlug || !destination) {
      setLoading(false);
      return;
    }

    const fetchTourDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`🔍 Fetching tour: ${destination}/${tourSlug}`);

        // Use API instead of direct database access
        const result = await toursApi.getDetail(destination, tourSlug);

        if (result.error) {
          console.warn("API Error:", result.error);
          // Fallback to mock data
          const mockData = getMockTourData(destination, tourSlug);
          setTourData(mockData);
        } else if (result.data) {
          // Process and format API data
          console.log("🔄 Raw API data:", result.data);
          const formattedTour = formatTourData(result.data);
          console.log("✅ Formatted tour data:", formattedTour);
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

// Enhanced format tour data from API response
const formatTourData = (apiData) => {
  console.log("🔧 Formatting API data:", apiData);

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

  // ✅ Fix Gallery formatting - ปัญหาหลักอยู่ตรงนี้
  let gallery = [];
  if (apiData.gallery && Array.isArray(apiData.gallery)) {
    gallery = apiData.gallery.map((item, index) => {
      // Handle different possible data structures
      const imageUrl =
        item.url ||
        item.image_url ||
        item.src ||
        `/images/tours/four-islands/gallery${index + 1}.jpg`;
      const altText = item.alt_text || item.alt || `รูปภาพทัวร์ ${index + 1}`;
      const caption = item.caption || item.description || altText;

      console.log(`🖼️ Gallery item ${index + 1}:`, {
        original: item,
        processed: { src: imageUrl, alt: altText, caption },
      });

      return {
        src: imageUrl,
        alt: altText,
        caption: caption,
      };
    });
  }

  // ✅ Process itinerary with proper error handling
  let itinerary = [];
  if (apiData.itinerary && Array.isArray(apiData.itinerary)) {
    itinerary = apiData.itinerary.map((item) => ({
      time: item.time_slot || item.time || "00:00",
      activity: item.activity || "กิจกรรม",
      description: item.description || "",
    }));
  }

  // ✅ Enhanced options/programs processing
  let options = [];
  if (apiData.options && Array.isArray(apiData.options)) {
    options = apiData.options.map((option) => {
      // Process itinerary for each option
      let optionItinerary = [];
      if (option.itinerary && Array.isArray(option.itinerary)) {
        optionItinerary = option.itinerary.map((item) => ({
          time_slot: item.time_slot || item.time,
          activity: item.activity,
          description: item.description,
        }));
      }

      return {
        id: option.id,
        name: option.name,
        price_modifier: Number(option.price_modifier) || 0,
        description: option.description,
        itinerary: optionItinerary,
      };
    });
  }

  // ✅ Enhanced review processing
  let reviews = [];
  if (apiData.reviews && Array.isArray(apiData.reviews)) {
    reviews = apiData.reviews.map((review) => ({
      id: review.id,
      name: review.name,
      rating: Number(review.rating) || 5,
      comment: review.comment,
      date: review.review_date || review.date,
      avatar: review.avatar || "/images/default-avatar.jpg",
    }));
  }

  const formattedData = {
    id: apiData.id,
    title: apiData.title,
    slug: apiData.slug,
    heroImage:
      apiData.hero_image ||
      apiData.heroImage ||
      `/images/tours/${apiData.slug}-hero.jpg`,
    location: apiData.location,
    destination: apiData.destination,
    price: Number(apiData.base_price || apiData.price) || 0,
    oldPrice: apiData.old_price ? Number(apiData.old_price) : null,
    duration: apiData.duration,
    rating: Number(apiData.rating) || 0,
    reviewCount: Number(apiData.review_count || apiData.reviewCount) || 0,
    description: apiData.description,
    highlights: apiData.highlights
      ? Array.isArray(apiData.highlights)
        ? apiData.highlights
        : JSON.parse(apiData.highlights || "[]")
      : [],

    // Content sections
    included: groupedContent.included,
    excluded: groupedContent.excluded,
    whatToBring: groupedContent.bring,
    importantNotes: groupedContent.note,
    faqs: faqs,
    menuSamples: Object.keys(menuSamples).length > 0 ? menuSamples : null,

    // Media and interaction
    gallery: gallery.length > 0 ? gallery : null,
    reviews: reviews,
    options: options,
    programs: options, // alias for backward compatibility
    itinerary: itinerary,

    // ✅ SEO enhancements
    seoData: {
      metaTitle: `${apiData.title} | ราคา ${Number(
        apiData.base_price || apiData.price || 0
      ).toLocaleString()} บาท | Seven Smile Tour`,
      metaDescription: `${apiData.description} ราคาเริ่มต้น ${Number(
        apiData.base_price || apiData.price || 0
      ).toLocaleString()} บาท/ท่าน จองออนไลน์ได้ทันที`,
      keywords: [
        `ทัวร์${apiData.location}`,
        apiData.title,
        `ราคา ${Number(
          apiData.base_price || apiData.price || 0
        ).toLocaleString()} บาท`,
        `จองทัวร์${apiData.location}`,
        "one day trip",
        "Seven Smile Tour",
      ]
        .filter(Boolean)
        .join(", "),
      canonical: `https://www.sevensmiletour.com/tours/${apiData.destination}/${apiData.slug}`,
      images:
        gallery.length > 0
          ? gallery.map((img) => ({
              url: img.src.startsWith("http")
                ? img.src
                : `https://www.sevensmiletour.com${img.src}`,
              alt: img.alt,
              caption: img.caption,
            }))
          : [
              {
                url: `https://www.sevensmiletour.com${
                  apiData.hero_image || `/images/tours/${apiData.slug}-hero.jpg`
                }`,
                alt: apiData.title,
                caption: apiData.title,
              },
            ],
    },
  };

  console.log("✅ Final formatted data:", formattedData);
  return formattedData;
};

// Enhanced mock data generator for fallback with better SEO
const getMockTourData = (destination, tourSlug) => {
  console.log(`🔄 Using mock data for: ${destination}/${tourSlug}`);

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
          "สำรวจความงามของ 4 เกาะสุดฮิตในกระบี่ ด้วยเรือสปีดโบ๊ทสุดหรู เยี่ยมชมเกาะปอดะ หินไก่ ถ้ำพระนาง และทะเลแหวก ในทริปเดียว พร้อมอาหารกลางวันและอุปกรณ์ดำน้ำตื้น",
        highlights: [
          "เกาะปอดะ - ชายหาดทรายขาวละเอียด น้ำใสเหมือนคริสตัล",
          "ไก่เดี่ยว - โขดหินรูปไก่แปลกตาของเกาะไก่",
          "ถ้ำพระนาง - ถ้ำในตำนานพร้อมชายหาดสวยงาม",
          "ทะเลแหวก - ปรากฏการณ์ธรรมชาติที่เดินบนทรายกลางทะเลได้",
          "ดำน้ำตื้นชมปะการังสีสวยและฝูงปลาเขตร้อน",
          "อาหารกลางวันแสนอร่อยในบรรยากาศเกาะสวยงาม",
        ],
        included: [
          "รถรับ-ส่ง โรงแรม (เขตเมืองกระบี่/อ่าวนาง)",
          "เรือสปีดโบ๊ท + เชื้อเพลิง + ไกด์ท้องถิ่น",
          "อาหารกลางวันสไตล์ไทย + ผลไม้สด + น้ำดื่ม",
          "อุปกรณ์ดำน้ำตื้น (หน้ากาก+ท่อหายใจ+ตีนกบ)",
          "เสื้อชูชีพมาตรฐาน",
          "ประกันอุบัติเหตุ",
          "ค่าธรรมเนียมเข้าอุทยานแห่งชาติ",
        ],
        excluded: [
          "ค่าใช้จ่ายส่วนตัว",
          "ทิปไกด์และลูกเรือ (100-200 บาท)",
          "รองเท้าแตะกันลื่น (แนะนำให้เตรียมมา)",
          "กล้องกันน้ำ (สามารถเช่าได้ที่เรือ 300 บาท)",
        ],
        whatToBring: [
          "ชุดว่ายน้ำ และ เสื้อผ้าสำรอง",
          "ผ้าเช็ดตัว",
          "ครีมกันแดด กันน้ำ SPF 50+",
          "แว่นกันแดด และ หมวก",
          "กล้องกันน้ำ (ถ่ายใต้น้ำ)",
          "เงินสำหรับค่าใช้จ่ายส่วนตัว",
          "ยาเมาเรือ (สำหรับผู้ที่เมาเรือง่าย)",
        ],
        importantNotes: [
          "เวลาอาจปรับเปลี่ยนตามสภาพอากาศและกระแสน้ำ",
          "ไม่เหมาะสำหรับเด็กอายุต่ำกว่า 4 ปี และ หญิงมีครรภ์",
          "ห้ามดื่มแอลกอฮอล์ก่อนลงเรือ",
          "ควรแจ้งอาการเมาเรือล่วงหน้า",
          "สภาพอากาศไม่เอื้ออำนวยอาจมีการยกเลิกเพื่อความปลอดภัย",
        ],
        gallery: [
          {
            src: "/images/tours/four-islands/gallery1.jpg",
            alt: "เกาะปอดะ ชายหาดทรายขาวงาม",
            caption: "เกาะปอดะ - ชายหาดทรายขาวสะอาด น้ำใสใสแบบคริสตัล",
          },
          {
            src: "/images/tours/four-islands/gallery2.jpg",
            alt: "ไก่เดี่ยว โขดหินรูปไก่",
            caption: "หินไก่ - โขดหินรูปไก่ที่มีชื่อเสียงของเกาะไก่",
          },
          {
            src: "/images/tours/four-islands/gallery3.jpg",
            alt: "ถ้ำพระนาง ถ้ำในตำนาน",
            caption: "ถ้ำพระนาง - ถ้ำในตำนานพร้อมชายหาดสวยงาม",
          },
          {
            src: "/images/tours/four-islands/gallery4.jpg",
            alt: "ทะเลแหวก ปรากฏการณ์ธรรมชาติ",
            caption: "ทะเลแหวก - ปรากฏการณ์ธรรมชาติสุดอัศจรรย์",
          },
          {
            src: "/images/tours/four-islands/gallery5.jpg",
            alt: "ดำน้ำตื้นชมปะการัง",
            caption: "ดำน้ำตื้น - ชมปะการังสีสวยและฝูงปลาเขตร้อน",
          },
          {
            src: "/images/tours/four-islands/gallery6.jpg",
            alt: "อาหารกลางวันบนเกาะ",
            caption: "อาหารกลางวัน - เมนูไทยแสนอร่อยในบรรยากาศเกาะสวย",
          },
        ],
        itinerary: [
          {
            time: "08:00",
            activity: "รับจากโรงแรม",
            description: "รถรับจากโรงแรมในเขตเมืองกระบี่และอ่าวนาง",
          },
          {
            time: "09:00",
            activity: "ออกเดินทางด้วยเรือสปีดโบ๊ท",
            description: "จากท่าเรืออ่าวนาง พร้อมบรีฟฟิ่งความปลอดภัย",
          },
          {
            time: "09:30",
            activity: "เกาะไก่ (Chicken Island)",
            description: "ชมโขดหินรูปไก่ ถ่ายรูป ดำน้ำตื้นชมปะการัง",
          },
          {
            time: "10:30",
            activity: "ทะเลแหวก (Separated Sea)",
            description: "เดินบนทรายกลางทะเล ปรากฏการณ์ธรรมชาติสุดอัศจรรย์",
          },
          {
            time: "11:30",
            activity: "เกาะปอดะ (Poda Island)",
            description: "ชายหาดทรายขาวละเอียด ดำน้ำตื้น ถ่ายรูปสวยๆ",
          },
          {
            time: "12:30",
            activity: "อาหารกลางวัน",
            description: "มื้อกลางวันแสนอร่อยสไตล์ไทยบนเกาะ",
          },
          {
            time: "13:30",
            activity: "ถ้ำพระนาง (Phra Nang Cave)",
            description: "สำรวจถ้ำในตำนาน ชายหาดสวยงาม พักผ่อน",
          },
          {
            time: "15:00",
            activity: "เดินทางกลับ",
            description: "เรือสปีดโบ๊ทกลับสู่ท่าเรืออ่าวนาง",
          },
          {
            time: "16:00",
            activity: "ส่งกลับโรงแรม",
            description: "ส่งถึงโรงแรมพร้อมความประทับใจ",
          },
        ],
        reviews: [
          {
            id: 1,
            name: "คุณสมชาย",
            rating: 5.0,
            comment:
              "ทัวร์ดีมาก ไกด์น่ารัก อธิบายดี ทะเลใสมาก เกาะสวยจริงๆ แนะนำเลย คุ้มค่าเงินมาก",
            date: "2024-11-15",
            avatar: "/images/default-avatar.jpg",
          },
          {
            id: 2,
            name: "คุณมาลี",
            rating: 4.5,
            comment:
              "สวยงามมาก เรือเร็วสบาย อาหารอร่อย คุ้มค่าเงิน ถ่ายรูปได้สวยมาก จะมาอีกแน่นอน",
            date: "2024-11-10",
            avatar: "/images/default-avatar.jpg",
          },
          {
            id: 3,
            name: "คุณอรรถพล",
            rating: 5.0,
            comment:
              "เป็นทริปที่ประทับใจมาก ไกด์เป็นกันเอง อธิบายดี ดูแลดี ทะเลใสมาก ปลาเยอะ",
            date: "2024-11-08",
            avatar: "/images/default-avatar.jpg",
          },
        ],
        faqs: [
          {
            question: "ทัวร์นี้เหมาะกับเด็กเล็กหรือไม่?",
            answer:
              "เหมาะสำหรับเด็กอายุ 4 ปีขึ้นไป ต้องมีผู้ปกครองดูแลตลอดเวลา และเด็กต้องใส่เสื้อชูชีพตลอดการเดินทาง",
          },
          {
            question: "ถ้าฝนตกทัวร์จะยกเลิกไหม?",
            answer:
              "หากสภาพอากาศไม่เอื้ออำนวย จะแจ้งให้ทราบล่วงหน้าและสามารถเลื่อนวันหรือขอเงินคืนได้เต็มจำนวน",
          },
          {
            question: "ต้องเตรียมอะไรบ้าง?",
            answer:
              "เตรียมชุดว่ายน้ำ ครีมกันแดด ผ้าเช็ดตัว แว่นกันแดด และกล้องกันน้ำ อุปกรณ์อื่นๆ ทางเรามีให้ครบ",
          },
          {
            question: "รวมค่าเข้าอุทยานหรือไม่?",
            answer:
              "รวมค่าธรรมเนียมเข้าอุทยานแห่งชาติแล้ว ไม่มีค่าใช้จ่ายเพิ่มเติม",
          },
        ],
        options: [
          {
            id: 1,
            name: "เรือสปีดโบ๊ท มาตรฐาน",
            price_modifier: 0,
            description: "เรือสปีดโบ๊ทขนาดกลาง ความเร็วปานกลาง นั่งสบาย",
            itinerary: [],
          },
          {
            id: 2,
            name: "เรือสปีดโบ๊ท พรีเมียม",
            price_modifier: 200,
            description:
              "เรือสปีดโบ๊ทหรู ความเร็วสูง นั่งสบายมาก มีหลังคากันแดด",
            itinerary: [],
          },
        ],
        seoData: {
          metaTitle:
            "ทัวร์ 4 เกาะ กระบี่ One Day Trip | ราคา 1,290 บาท | Seven Smile Tour",
          metaDescription:
            "สำรวจความงามของ 4 เกาะสุดฮิตในกระบี่ ด้วยเรือสปีดโบ๊ทสุดหรู ราคาเริ่มต้น 1,290 บาท/ท่าน จองออนไลน์ได้ทันที",
          keywords:
            "ทัวร์กระบี่, ทัวร์ 4 เกาะ กระบี่, ราคา 1290 บาท, จองทัวร์กระบี่, one day trip, Seven Smile Tour",
          canonical:
            "https://www.sevensmiletour.com/tours/krabi/four-islands-speedboat",
        },
      },
      // เพิ่ม mock tours อื่นๆ ได้ที่นี่
    },
    // เพิ่ม destinations อื่นๆ ได้ที่นี่
  };

  // Return mock data based on destination and slug
  const destinationTours = mockTours[destination];
  if (destinationTours && destinationTours[tourSlug]) {
    return destinationTours[tourSlug];
  }

  // Default fallback with proper structure
  return {
    id: 0,
    title: `ทัวร์ ${tourSlug} ไม่พบข้อมูล`,
    slug: tourSlug,
    destination: destination,
    location: destination,
    price: 0,
    heroImage: `/images/tours/${tourSlug}-hero.jpg`,
    description: "ขออภัย ไม่พบข้อมูลทัวร์นี้ในระบบ",
    highlights: [],
    included: [],
    excluded: [],
    whatToBring: [],
    importantNotes: [],
    gallery: null,
    itinerary: [],
    reviews: [],
    faqs: [],
    options: [],
    seoData: {
      metaTitle: `ทัวร์ ${tourSlug} | Seven Smile Tour`,
      metaDescription: "ขออภัย ไม่พบข้อมูลทัวร์นี้ในระบบ",
      keywords: `ทัวร์${destination}, ${tourSlug}, Seven Smile Tour`,
      canonical: `https://www.sevensmiletour.com/tours/${destination}/${tourSlug}`,
    },
  };
};

export default useTourDetail;
