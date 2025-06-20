import { useState, useEffect } from "react";
import { selectMany } from "../utils/api";

/**
 * Hook สำหรับดึงข้อมูล Gallery รูปงานกรุ๊ปทัวร์
 * อัพเดตให้ใช้ database.js แทน supabase
 */
const useGroupTourGallery = (type = "all") => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        // สร้างเงื่อนไขการ query
        const queryOptions = {
          where: {
            is_active: 1, // MySQL ใช้ 1/0 แทน true/false
          },
          orderBy: "sort_order",
          order: "ASC",
        };

        // กรองตาม type ถ้าไม่ใช่ 'all'
        if (type !== "all") {
          queryOptions.where.type = type;
        }

        // ดึงข้อมูลจากฐานข้อมูล
        const { data, error: fetchError } = await selectMany(
          "group_tour_gallery",
          queryOptions
        );

        if (fetchError) {
          throw new Error(fetchError);
        }

        if (isMounted) {
          // แปลงข้อมูลให้เข้ากับ format ที่ frontend ต้องการ
          const formattedData = (data || []).map((item) => ({
            id: item.id,
            title: item.title,
            image_url: item.image_url,
            type: item.type,
            participants_count: item.participants_count,
            year: item.year,
            description: item.description,
            created_at: item.created_at,
          }));

          setGallery(formattedData);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);

        if (isMounted) {
          setError(err.message);
          // Fallback to mock data ถ้าเกิด error
          setGallery(getMockGalleryData(type));
          setLoading(false);
        }
      }
    };

    fetchGallery();

    return () => {
      isMounted = false;
    };
  }, [type]);

  return { gallery, loading, error };
};

// Mock data สำหรับ fallback และการทดสอบ
const getMockGalleryData = (type = "all") => {
  const mockData = [
    {
      id: 1,
      title: "กรุ๊ปทัวร์บริษัท ABC 45 ท่าน - ภูเก็ต",
      image_url: "/images/group-tour/gallery/domestic-1.jpg",
      type: "domestic",
      participants_count: 45,
      year: 2024,
      description: "ทัวร์ภูเก็ต 3 วัน 2 คืน สำหรับพนักงานบริษัท ABC",
    },
    {
      id: 2,
      title: "กรุ๊ปทัวร์ครอบครัวใหญ่ 38 ท่าน - กระบี่",
      image_url: "/images/group-tour/gallery/domestic-2.jpg",
      type: "domestic",
      participants_count: 38,
      year: 2024,
      description: "ทัวร์กระบี่ 2 วัน 1 คืน สำหรับครอบครัวใหญ่",
    },
    {
      id: 3,
      title: "กรุ๊ปทัวร์เพื่อน 22 ท่าน - เกาะสิมิลัน",
      image_url: "/images/group-tour/gallery/domestic-3.jpg",
      type: "domestic",
      participants_count: 22,
      year: 2024,
      description: "ทัวร์เกาะสิมิลัน 1 วัน สำหรับกลุ่มเพื่อน",
    },
    {
      id: 4,
      title: "กรุ๊ปทัวร์โรงเรียน 55 ท่าน - กระบี่",
      image_url: "/images/group-tour/gallery/domestic-4.jpg",
      type: "domestic",
      participants_count: 55,
      year: 2023,
      description: "ทัวร์ศึกษาดูงาน กระบี่ สำหรับนักเรียนมัธยม",
    },
    {
      id: 5,
      title: "กรุ๊ปทัวร์วงเล็บ 28 ท่าน - พังงา",
      image_url: "/images/group-tour/gallery/domestic-5.jpg",
      type: "domestic",
      participants_count: 28,
      year: 2023,
      description: "ทัวร์อ่าวพังงา สำหรับกลุ่มเพื่อนสนิท",
    },
    {
      id: 6,
      title: "กรุ๊ปทัวร์ญี่ปุ่น 25 ท่าน - โตเกียว",
      image_url: "/images/group-tour/gallery/international-1.jpg",
      type: "international",
      participants_count: 25,
      year: 2024,
      description: "ทัวร์ญี่ปุ่น โตเกียว 5 วัน 3 คืน",
    },
    {
      id: 7,
      title: "กรุ๊ปทัวร์เกาหลี 32 ท่าน - โซล",
      image_url: "/images/group-tour/gallery/international-2.jpg",
      type: "international",
      participants_count: 32,
      year: 2024,
      description: "ทัวร์เกาหลี โซล 5 วัน 3 คืน",
    },
    {
      id: 8,
      title: "กรุ๊ปทัวร์ยุโรป 18 ท่าน - ฝรั่งเศส",
      image_url: "/images/group-tour/gallery/international-3.jpg",
      type: "international",
      participants_count: 18,
      year: 2023,
      description: "ทัวร์ยุโรป ฝรั่งเศส-อิตาลี 8 วัน 5 คืน",
    },
    {
      id: 9,
      title: "กรุ๊ปทัวร์สิงคโปร์ 42 ท่าน",
      image_url: "/images/group-tour/gallery/international-4.jpg",
      type: "international",
      participants_count: 42,
      year: 2023,
      description: "ทัวร์สิงคโปร์ 4 วัน 3 คืน สำหรับกลุ่มใหญ่",
    },
    {
      id: 10,
      title: "กรุ๊ปทัวร์มัลดีฟส์ 16 ท่าน",
      image_url: "/images/group-tour/gallery/international-5.jpg",
      type: "international",
      participants_count: 16,
      year: 2024,
      description: "ทัวร์มัลดีฟส์ 5 วัน 3 คืน ฮันนีมูนกรุ๊ป",
    },
  ];

  if (type === "all") {
    return mockData;
  }

  return mockData.filter((item) => item.type === type);
};

export default useGroupTourGallery;
