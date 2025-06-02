import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

/**
 * Hook สำหรับดึงรายการทัวร์จากฐานข้อมูล
 * รองรับทั้งข้อมูลใหม่และ fallback ข้อมูลเก่า
 */
const useTours = (destination = null, limit = 10) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTours = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from("tours")
          .select(
            `
            id,
            title,
            hero_image,
            location,
            destination,
            base_price,
            old_price,
            duration,
            rating,
            slug,
            is_featured,
            review_count
          `
          )
          .order("sort_order", { ascending: true })
          .limit(limit);

        if (destination) {
          query = query.eq("destination", destination);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        if (isMounted) {
          // แปลงข้อมูลให้ตรงกับ format เดิม
          const formattedTours =
            data?.map((tour) => ({
              id: tour.id,
              title: tour.title,
              image: tour.hero_image,
              location: tour.location,
              destination: tour.destination,
              price: tour.base_price,
              oldPrice: tour.old_price,
              duration: tour.duration,
              rating: tour.rating,
              link: `/tours/${tour.destination}/${tour.slug}`,
              featured: tour.is_featured,
              reviewCount: tour.review_count,
            })) || [];

          setTours(formattedTours);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching tours:", err);

        if (isMounted) {
          setError(err.message);
          // Fallback to sample data if database error
          setTours(getSampleTours(destination, limit));
          setLoading(false);
        }
      }
    };

    fetchTours();

    return () => {
      isMounted = false;
    };
  }, [destination, limit]);

  return { tours, loading, error };
};

// Sample data as fallback (เดิม)
const getSampleTours = (destination = null, limit = 10) => {
  const allTours = [
    {
      id: 1,
      title: "ทัวร์ 4 เกาะ กระบี่ One Day Trip",
      image: "/images/krabi/tour1.jpg",
      location: "กระบี่",
      destination: "krabi",
      price: 1290,
      oldPrice: 1590,
      duration: "1 วัน",
      rating: 4.8,
      link: "/krabi/four-islands",
      featured: true,
    },
    {
      id: 2,
      title: "ทัวร์เกาะพีพี อ่าวมาหยา เกาะไผ่",
      image: "/images/krabi/tour2.jpg",
      location: "กระบี่",
      destination: "krabi",
      price: 1590,
      oldPrice: 1890,
      duration: "1 วัน",
      rating: 4.7,
      link: "/krabi/phi-phi-bamboo",
      featured: true,
    },
    {
      id: 3,
      title: "ทัวร์เกาะห้อง มาดาม คาเงียน",
      image: "/images/krabi/tour3.jpg",
      location: "กระบี่",
      destination: "krabi",
      price: 1390,
      oldPrice: null,
      duration: "1 วัน",
      rating: 4.6,
      link: "/krabi/hong-island",
      featured: false,
    },
    {
      id: 4,
      title: "ทัวร์เกาะพีพี มาหยา ลันตา",
      image: "/images/phuket/tour1.jpg",
      location: "ภูเก็ต",
      destination: "phuket",
      price: 1690,
      oldPrice: 1990,
      duration: "1 วัน",
      rating: 4.9,
      link: "/phuket/phi-phi",
      featured: true,
    },
    {
      id: 5,
      title: "ทัวร์เกาะเจมส์บอนด์ เขาตะปู",
      image: "/images/phuket/tour2.jpg",
      location: "ภูเก็ต",
      destination: "phuket",
      price: 1490,
      oldPrice: 1790,
      duration: "1 วัน",
      rating: 4.8,
      link: "/phuket/james-bond",
      featured: true,
    },
    {
      id: 6,
      title: "ทัวร์ชมเมืองภูเก็ต พระพุทธมิ่งมงคลฯ แหลมพรหมเทพ",
      image: "/images/phuket/tour3.jpg",
      location: "ภูเก็ต",
      destination: "phuket",
      price: 990,
      oldPrice: null,
      duration: "1 วัน",
      rating: 4.6,
      link: "/phuket/city-tour",
      featured: false,
    },
    {
      id: 7,
      title: "ทัวร์อ่าวพังงา เขาตะปู ถ้ำลอด",
      image: "/images/phang-nga/tour1.jpg",
      location: "พังงา",
      destination: "phang-nga",
      price: 1390,
      oldPrice: 1690,
      duration: "1 วัน",
      rating: 4.8,
      link: "/phang-nga/james-bond",
      featured: true,
    },
    {
      id: 8,
      title: "ทัวร์เกาะสิมิลัน One Day Trip",
      image: "/images/phang-nga/tour2.jpg",
      location: "พังงา",
      destination: "phang-nga",
      price: 3290,
      oldPrice: 3790,
      duration: "1 วัน",
      rating: 4.9,
      link: "/phang-nga/similan",
      featured: true,
    },
    {
      id: 9,
      title: "ทัวร์เกาะสุรินทร์ วันเดย์ทริป",
      image: "/images/phang-nga/tour3.jpg",
      location: "พังงา",
      destination: "phang-nga",
      price: 2990,
      oldPrice: 3290,
      duration: "1 วัน",
      rating: 4.7,
      link: "/phang-nga/surin",
      featured: false,
    },
    {
      id: 10,
      title: "ทัวร์ญี่ปุ่น โตเกียว ฟูจิ 5 วัน 3 คืน",
      image: "/images/international/japan1.jpg",
      location: "ญี่ปุ่น",
      destination: "international",
      price: 29900,
      oldPrice: 35900,
      duration: "5 วัน 3 คืน",
      rating: 4.8,
      link: "/international/japan-tokyo",
      featured: true,
    },
    {
      id: 11,
      title: "ทัวร์เกาหลี โซล เอเวอร์แลนด์ 5 วัน 3 คืน",
      image: "/images/international/korea1.jpg",
      location: "เกาหลี",
      destination: "international",
      price: 19900,
      oldPrice: 25900,
      duration: "5 วัน 3 คืน",
      rating: 4.7,
      link: "/international/korea-seoul",
      featured: true,
    },
    {
      id: 12,
      title: "ทัวร์เวียดนาม ฮานอย ซาปา 4 วัน 3 คืน",
      image: "/images/international/vietnam1.jpg",
      location: "เวียดนาม",
      destination: "international",
      price: 14900,
      oldPrice: 17900,
      duration: "4 วัน 3 คืน",
      rating: 4.6,
      link: "/international/vietnam-hanoi",
      featured: false,
    },
    {
      id: 13,
      title: "ทัวร์เกาะห้อง เรือสปีดโบ๊ท/เรือหางยาว",
      image: "/images/krabi/hong-island-tour.jpg",
      location: "กระบี่",
      destination: "krabi",
      price: 1390,
      oldPrice: 1590,
      duration: "1 วัน",
      rating: 4.7,
      link: "/tours/krabi/hong-island-tour",
      featured: true,
    },
    {
      id: 14,
      title: "ซิตี้ทัวร์กระบี่ ครึ่งวัน",
      image: "/images/krabi/krabi-city-tour.jpg",
      location: "กระบี่",
      destination: "krabi",
      price: 590,
      oldPrice: 790,
      duration: "ครึ่งวัน",
      rating: 4.5,
      link: "/tours/krabi/krabi-city-tour",
      featured: false,
    },
    {
      id: 15,
      title: "กระบี่จังเกิ้ลทัวร์",
      image: "/images/krabi/jungle-tour.jpg",
      location: "กระบี่",
      destination: "krabi",
      price: 1490,
      oldPrice: 1790,
      duration: "1 วัน",
      rating: 4.8,
      link: "/tours/krabi/krabi-jungle-tour",
      featured: true,
    },
  ];

  if (destination) {
    return allTours
      .filter((tour) => tour.destination === destination)
      .slice(0, limit);
  }

  return allTours.slice(0, limit);
};

export default useTours;
