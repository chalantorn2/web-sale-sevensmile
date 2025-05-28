import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

/**
 * Hook สำหรับดึงข้อมูลทัวร์ครบชุดจากฐานข้อมูล
 * รวมถึง options, programs, itinerary, content, media, reviews
 */
const useTourDetail = (tourSlug) => {
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tourSlug) {
      setLoading(false);
      return;
    }

    const fetchTourDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. ดึงข้อมูลหลักของทัวร์
        const { data: tour, error: tourError } = await supabase
          .from("tours")
          .select("*")
          .eq("slug", tourSlug)
          .single();

        if (tourError) throw tourError;
        if (!tour) throw new Error("Tour not found");

        // 2. ดึงข้อมูล options (เช่น เรือสปีดโบ๊ท/หางยาว)
        const { data: options, error: optionsError } = await supabase
          .from("tour_options")
          .select("*")
          .eq("tour_id", tour.id)
          .order("sort_order");

        if (optionsError) throw optionsError;

        // 3. ดึงข้อมูล itinerary สำหรับแต่ละ option
        const itineraryPromises = options.map(async (option) => {
          const { data: itinerary, error: itineraryError } = await supabase
            .from("tour_itineraries")
            .select("*")
            .eq("tour_id", tour.id)
            .eq("option_id", option.id)
            .order("sort_order");

          if (itineraryError) throw itineraryError;

          return {
            ...option,
            // แปลง price_modifier เป็น number
            price_modifier: Number(option.price_modifier) || 0,
            itinerary:
              itinerary?.map((item) => ({
                time_slot: item.time_slot,
                activity: item.activity,
                description: item.description,
              })) || [],
          };
        });

        const optionsWithItinerary = await Promise.all(itineraryPromises);

        // 4. ดึงข้อมูล itinerary หลัก (ถ้าไม่มี options หรือเป็นทัวร์ที่ไม่ใช่ options-based)
        let mainItinerary = [];
        const { data: itinerary, error: itineraryError } = await supabase
          .from("tour_itineraries")
          .select("*")
          .eq("tour_id", tour.id)
          .is("option_id", null)
          .order("sort_order");

        if (itineraryError) console.warn("Itinerary error:", itineraryError);
        mainItinerary =
          itinerary?.map((item) => ({
            time: item.time_slot,
            activity: item.activity,
            description: item.description,
          })) || [];

        // 5. ดึงข้อมูล content (included, excluded, notes, faqs, menus)
        const { data: content, error: contentError } = await supabase
          .from("tour_content")
          .select("*")
          .eq("tour_id", tour.id)
          .order("sort_order");

        if (contentError) throw contentError;

        // จัดกลุ่ม content ตาม type
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

        content?.forEach((item) => {
          if (groupedContent[item.type]) {
            groupedContent[item.type].push(item.content);
          }
        });

        // สร้าง FAQs array
        const faqs = [];
        for (let i = 0; i < groupedContent.faq_q.length; i++) {
          if (groupedContent.faq_a[i]) {
            faqs.push({
              question: groupedContent.faq_q[i],
              answer: groupedContent.faq_a[i],
            });
          }
        }

        // สร้าง menu samples
        const menuSamples = {};
        if (groupedContent.menu_breakfast.length > 0)
          menuSamples.breakfast = groupedContent.menu_breakfast;
        if (groupedContent.menu_lunch.length > 0)
          menuSamples.lunch = groupedContent.menu_lunch;
        if (groupedContent.menu_dinner.length > 0)
          menuSamples.dinner = groupedContent.menu_dinner;
        if (groupedContent.menu_snacks.length > 0)
          menuSamples.snacks = groupedContent.menu_snacks;

        // 6. ดึงข้อมูล media (gallery)
        const { data: media, error: mediaError } = await supabase
          .from("tour_media")
          .select("*")
          .eq("tour_id", tour.id)
          .order("sort_order");

        if (mediaError) throw mediaError;

        const gallery =
          media?.map((item) => ({
            src: item.url,
            alt: item.alt_text,
            caption: item.caption,
          })) || [];

        // 7. ดึงข้อมูล reviews
        const { data: reviews, error: reviewsError } = await supabase
          .from("tour_reviews")
          .select("*")
          .eq("tour_id", tour.id)
          .order("review_date", { ascending: false });

        if (reviewsError) throw reviewsError;

        // 8. สร้างข้อมูลที่ format แล้ว
        const formattedTour = {
          // ข้อมूลหลัก
          id: tour.id,
          title: tour.title,
          slug: tour.slug,
          heroImage: tour.hero_image,
          location: tour.location,
          destination: tour.destination,
          price: Number(tour.base_price) || 0,
          oldPrice: tour.old_price ? Number(tour.old_price) : null,
          duration: tour.duration,
          rating: Number(tour.rating) || 0,
          reviewCount: Number(tour.review_count) || 0,
          description: tour.description,
          highlights: Array.isArray(tour.highlights)
            ? tour.highlights
            : JSON.parse(tour.highlights || "[]"),

          // ข้อมูลเพิ่มเติม
          included: groupedContent.included,
          excluded: groupedContent.excluded,
          whatToBring: groupedContent.bring,
          importantNotes: groupedContent.note,
          faqs: faqs,
          menuSamples: Object.keys(menuSamples).length > 0 ? menuSamples : null,
          gallery: gallery.length > 0 ? gallery : null,
          reviews: reviews || [],

          // Options/Programs
          options: optionsWithItinerary,
          programs: optionsWithItinerary, // alias สำหรับ backward compatibility

          // Itinerary หลัก (สำหรับทัวร์ที่ไม่มี options)
          itinerary: mainItinerary,
        };

        setTourData(formattedTour);
      } catch (err) {
        console.error("Error fetching tour detail:", err);
        setError(err.message);

        // Fallback to mock data (optional)
        // setTourData(getMockTourData(tourSlug));
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetail();
  }, [tourSlug]);

  return { tourData, loading, error };
};

// Helper function สำหรับ fallback data (optional)
const getMockTourData = (tourSlug) => {
  // สามารถใส่ mock data ไว้ที่นี่เป็น fallback
  // หรือ return null ถ้าไม่ต้องการ fallback
  return null;
};

export default useTourDetail;
