// src/hooks/useTours.js - Updated สำหรับใช้ API
import { useState, useEffect } from "react";
import { toursApi } from "../utils/api";

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

        console.log(
          `🔍 Fetching tours: destination=${destination}, limit=${limit}`
        );

        // Use API instead of direct database
        const params = {};
        if (destination) params.destination = destination;
        if (limit) params.limit = limit;

        const result = await toursApi.getAll(params);

        if (isMounted) {
          if (result.error) {
            console.warn("⚠️ API Error, using fallback data:", result.error);
            // Fallback to sample data
            const fallbackTours = getSampleTours(destination, limit);
            setTours(fallbackTours);
            setError(`API Error: ${result.error} (ใช้ข้อมูลตัวอย่าง)`);
          } else {
            console.log(`✅ Tours loaded: ${result.data.length} tours`);
            setTours(result.data || []);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("❌ Error fetching tours:", err);
        if (isMounted) {
          setError(err.message);
          // Fallback to sample data on error
          const fallbackTours = getSampleTours(destination, limit);
          setTours(fallbackTours);
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

// Sample data as fallback (เดิม - เพื่อให้ website ยังใช้งานได้ถ้า API ล้ม)
const getSampleTours = (destination = null, limit = 10) => {
  const allTours = [
    {
      id: 1,
      title: "ทัวร์ 4 เกาะ กระบี่ One Day Trip",
      image: "/images/tours/four-islands-krabi.jpg",
      location: "กระบี่",
      destination: "krabi",
      price: 1290,
      oldPrice: 1590,
      duration: "1 วัน",
      rating: 4.8,
      link: "/tours/krabi/four-islands-speedboat",
      slug: "four-islands-speedboat",
      featured: true,
      reviewCount: 156,
    },
    {
      id: 2,
      title: "ทัวร์เกาะพีพี อ่าวมาหยา เกาะไผ่",
      image: "/images/tours/phi-phi-hero.jpg",
      location: "กระบี่",
      destination: "krabi",
      price: 1590,
      oldPrice: 1890,
      duration: "1 วัน",
      rating: 4.7,
      link: "/tours/krabi/phi-phi-speedboat",
      slug: "phi-phi-speedboat",
      featured: true,
      reviewCount: 142,
    },
    {
      id: 3,
      title: "ทัวร์เกาะห้อง มาดาม คาเงียน",
      image: "/images/krabi/hong-island-tour.jpg",
      location: "กระบี่",
      destination: "krabi",
      price: 1390,
      oldPrice: null,
      duration: "1 วัน",
      rating: 4.6,
      link: "/tours/krabi/hong-island-speedboat",
      slug: "hong-island-speedboat",
      featured: false,
      reviewCount: 98,
    },
    {
      id: 4,
      title: "ทัวร์เกาะพีพี มาหยา ลันตา",
      image: "/images/tours/phi-phi-hero.jpg",
      location: "ภูเก็ต",
      destination: "phuket",
      price: 1690,
      oldPrice: 1990,
      duration: "1 วัน",
      rating: 4.9,
      link: "/tours/phuket/phi-phi-speedboat",
      slug: "phi-phi-speedboat",
      featured: true,
      reviewCount: 203,
    },
    {
      id: 5,
      title: "ทัวร์เกาะเจมส์บอนด์ เขาตะปู",
      image: "/images/tours/james-bond-island.jpg",
      location: "ภูเก็ต",
      destination: "phuket",
      price: 1490,
      oldPrice: 1790,
      duration: "1 วัน",
      rating: 4.8,
      link: "/tours/phuket/james-bond-speedboat",
      slug: "james-bond-speedboat",
      featured: true,
      reviewCount: 167,
    },
    {
      id: 6,
      title: "ทัวร์เกาะราชา เกาะคอรัล",
      image: "/images/phuket/coral-racha-island.jpg",
      location: "ภูเก็ต",
      destination: "phuket",
      price: 1590,
      oldPrice: null,
      duration: "1 วัน",
      rating: 4.7,
      link: "/tours/phuket/coral-racha-speedboat",
      slug: "coral-racha-speedboat",
      featured: false,
      reviewCount: 134,
    },
    {
      id: 7,
      title: "ทัวร์อ่าวพังงา เขาตะปู ถ้ำลอด",
      image: "/images/tours/james-bond-island.jpg",
      location: "พังงา",
      destination: "phang-nga",
      price: 1390,
      oldPrice: 1690,
      duration: "1 วัน",
      rating: 4.8,
      link: "/tours/phang-nga/james-bond-speedboat",
      slug: "james-bond-speedboat",
      featured: true,
      reviewCount: 189,
    },
    {
      id: 8,
      title: "ทัวร์เกาะสิมิลัน One Day Trip",
      image: "/images/phang-nga/similan-speedboat.jpg",
      location: "พังงา",
      destination: "phang-nga",
      price: 3290,
      oldPrice: 3790,
      duration: "1 วัน",
      rating: 4.9,
      link: "/tours/phang-nga/similan-speedboat",
      slug: "similan-speedboat",
      featured: true,
      reviewCount: 245,
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
