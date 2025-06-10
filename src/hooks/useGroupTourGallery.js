import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

/**
 * Hook สำหรับดึงข้อมูล Gallery รูปงานกรุ๊ปทัวร์
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

        let query = supabase
          .from("group_tour_gallery")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        // กรองตาม type ถ้าไม่ใช่ 'all'
        if (type !== "all") {
          query = query.eq("type", type);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        if (isMounted) {
          setGallery(data || []);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);

        if (isMounted) {
          setError(err.message);
          // Fallback to mock data
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

// Mock data สำหรับ fallback
const getMockGalleryData = (type = "all") => {
  const mockData = [
    {
      id: 1,
      title: "กรุ๊ปทัวร์ 45 ท่าน",
      image_url: "/images/group-tour/gallery/domestic-1.jpg",
      type: "domestic",
      participants_count: 45,
      year: 2024,
    },
    {
      id: 2,
      title: "กรุ๊ปทัวร์ 38 ท่าน",
      image_url: "/images/group-tour/gallery/domestic-2.jpg",
      type: "domestic",
      participants_count: 38,
      year: 2024,
    },
    {
      id: 3,
      title: "กรุ๊ปทัวร์ 22 ท่าน",
      image_url: "/images/group-tour/gallery/domestic-3.jpg",
      type: "domestic",
      participants_count: 22,
      year: 2024,
    },
    {
      id: 4,
      title: "กรุ๊ปทัวร์ 55 ท่าน",
      image_url: "/images/group-tour/gallery/domestic-4.jpg",
      type: "domestic",
      participants_count: 55,
      year: 2023,
    },
    {
      id: 5,
      title: "กรุ๊ปทัวร์ 28 ท่าน",
      image_url: "/images/group-tour/gallery/domestic-5.jpg",
      type: "domestic",
      participants_count: 28,
      year: 2023,
    },
    {
      id: 6,
      title: "กรุ๊ปทัวร์ 25 ท่าน",
      image_url: "/images/group-tour/gallery/international-1.jpg",
      type: "international",
      participants_count: 25,
      year: 2024,
    },
    {
      id: 7,
      title: "กรุ๊ปทัวร์ 32 ท่าน",
      image_url: "/images/group-tour/gallery/international-2.jpg",
      type: "international",
      participants_count: 32,
      year: 2024,
    },
    {
      id: 8,
      title: "กรุ๊ปทัวร์ 18 ท่าน",
      image_url: "/images/group-tour/gallery/international-3.jpg",
      type: "international",
      participants_count: 18,
      year: 2023,
    },
    {
      id: 9,
      title: "กรุ๊ปทัวร์ 42 ท่าน",
      image_url: "/images/group-tour/gallery/international-4.jpg",
      type: "international",
      participants_count: 42,
      year: 2023,
    },
  ];

  if (type === "all") {
    return mockData;
  }

  return mockData.filter((item) => item.type === type);
};

export default useGroupTourGallery;
