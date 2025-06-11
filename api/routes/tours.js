// api/routes/tours.js - Tours Routes
import express from "express";
import { query, selectOne, selectMany } from "../middleware/database.js";

const router = express.Router();

// GET /api/tours - Get all tours or filter by destination
router.get("/", async (req, res) => {
  try {
    const { destination, limit = 10, featured } = req.query;

    let sql = `
      SELECT 
        id, title, hero_image, location, destination, 
        base_price, old_price, duration, rating, slug, 
        is_featured, review_count, description, highlights
      FROM tours 
      WHERE 1=1
    `;
    const params = [];

    if (destination) {
      sql += " AND destination = ?";
      params.push(destination);
    }

    if (featured === "true") {
      sql += " AND is_featured = 1";
    }

    sql += " ORDER BY sort_order ASC, is_featured DESC, rating DESC";

    if (limit && limit !== "all") {
      sql += " LIMIT ?";
      params.push(parseInt(limit));
    }

    const result = await query(sql, params);

    if (result.success) {
      // Format data for frontend
      const tours = result.data.map((tour) => {
        let highlights = [];
        try {
          // ลองแปลง JSON ถ้าไม่ได้ให้ใช้ string array
          if (tour.highlights) {
            if (typeof tour.highlights === "string") {
              // ถ้าเป็น JSON string
              if (
                tour.highlights.startsWith("[") ||
                tour.highlights.startsWith("{")
              ) {
                highlights = JSON.parse(tour.highlights);
              } else {
                // ถ้าเป็น string ธรรมดา แยกด้วย comma หรือ newline
                highlights = tour.highlights
                  .split(/[,\n]/)
                  .map((h) => h.trim())
                  .filter((h) => h);
              }
            } else if (Array.isArray(tour.highlights)) {
              highlights = tour.highlights;
            }
          }
        } catch (error) {
          console.warn(
            `⚠️ Invalid highlights JSON for tour ${tour.id}:`,
            error.message
          );
          // Fallback: ถ้า parse ไม่ได้ใช้เป็น string
          highlights = tour.highlights ? [tour.highlights.toString()] : [];
        }

        return {
          id: tour.id,
          title: tour.title,
          image: tour.hero_image,
          location: tour.location,
          destination: tour.destination,
          price: tour.base_price,
          oldPrice: tour.old_price,
          duration: tour.duration,
          rating: tour.rating,
          slug: tour.slug,
          link: `/tours/${tour.destination}/${tour.slug}`,
          featured: Boolean(tour.is_featured),
          reviewCount: tour.review_count,
          description: tour.description,
          highlights: highlights,
        };
      });

      res.json({
        success: true,
        data: tours,
        count: tours.length,
        query: { destination, limit, featured },
      });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("❌ Tours API Error:", error.message);

    // Fallback to sample data
    const sampleTours = getSampleTours(
      req.query.destination,
      parseInt(req.query.limit) || 10
    );

    res.json({
      success: true,
      data: sampleTours,
      count: sampleTours.length,
      fallback: true,
      error: error.message,
    });
  }
});

// GET /api/tours/:destination/:slug - Get tour detail
router.get("/:destination/:slug", async (req, res) => {
  try {
    const { destination, slug } = req.params;

    // Get main tour data
    const tourResult = await selectOne("tours", { slug, destination });

    if (!tourResult.success || !tourResult.data) {
      return res.status(404).json({
        success: false,
        error: "Tour not found",
        destination,
        slug,
      });
    }

    const tour = tourResult.data;

    // Get tour options
    const optionsResult = await selectMany("tour_options", {
      where: { tour_id: tour.id },
      orderBy: "sort_order",
    });

    // Get tour content
    const contentResult = await selectMany("tour_content", {
      where: { tour_id: tour.id },
      orderBy: "sort_order",
    });

    // Get tour media
    const mediaResult = await selectMany("tour_media", {
      where: { tour_id: tour.id },
      orderBy: "sort_order",
    });

    console.log(
      `🖼️ Media found for tour ${tour.id}: ${
        mediaResult.success ? mediaResult.data.length : 0
      } items`
    );
    if (mediaResult.success && mediaResult.data.length > 0) {
      console.log("📸 Raw media data:", mediaResult.data[0]);
    }

    // Format gallery data ให้ถูกต้อง
    let galleryData = [];
    if (
      mediaResult.success &&
      mediaResult.data &&
      mediaResult.data.length > 0
    ) {
      galleryData = mediaResult.data.map((item) => {
        console.log("🖼️ Processing media item:", {
          id: item.id,
          url: item.url,
          alt_text: item.alt_text,
          caption: item.caption,
        });

        return {
          src: item.url, // ✅ ต้องเป็น 'src'
          alt: item.alt_text, // ✅ ต้องเป็น 'alt'
          caption: item.caption,
        };
      });

      console.log("🖼️ Formatted gallery:", galleryData);
    }

    // Get tour reviews
    const reviewsResult = await selectMany("tour_reviews", {
      where: { tour_id: tour.id },
      orderBy: "review_date",
      order: "DESC",
    });

    // Get tour itineraries
    const itinerariesResult = await selectMany("tour_itineraries", {
      where: { tour_id: tour.id },
      orderBy: "sort_order",
    });

    // Format response
    // Format response
    let highlights = [];
    try {
      if (tour.highlights) {
        if (typeof tour.highlights === "string") {
          if (
            tour.highlights.startsWith("[") ||
            tour.highlights.startsWith("{")
          ) {
            highlights = JSON.parse(tour.highlights);
          } else {
            highlights = tour.highlights
              .split(/[,\n]/)
              .map((h) => h.trim())
              .filter((h) => h);
          }
        } else if (Array.isArray(tour.highlights)) {
          highlights = tour.highlights;
        }
      }
    } catch (error) {
      console.warn(
        `⚠️ Invalid highlights JSON for tour ${tour.id}:`,
        error.message
      );
      highlights = tour.highlights ? [tour.highlights.toString()] : [];
    }

    const tourDetail = {
      id: tour.id,
      title: tour.title,
      slug: tour.slug,
      heroImage: tour.hero_image,
      location: tour.location,
      destination: tour.destination,
      price: tour.base_price,
      oldPrice: tour.old_price,
      duration: tour.duration,
      rating: tour.rating,
      reviewCount: tour.review_count,
      description: tour.description,
      highlights: highlights,
      options: optionsResult.success ? optionsResult.data : [],
      content: contentResult.success ? contentResult.data : [],
      gallery: galleryData, // ✅ ใช้ galleryData ที่ format แล้ว
      reviews: reviewsResult.success ? reviewsResult.data : [],
      itinerary: itinerariesResult.success ? itinerariesResult.data : [],
    };

    res.json({
      success: true,
      data: tourDetail,
      meta: {
        gallery_count: tourDetail.gallery ? tourDetail.gallery.length : 0,
        options_count: tourDetail.options ? tourDetail.options.length : 0,
        reviews_count: tourDetail.reviews ? tourDetail.reviews.length : 0,
      },
    });
  } catch (error) {
    console.error("❌ Tour Detail API Error:", error.message);

    // Fallback to mock data
    const mockData = getMockTourData(req.params.destination, req.params.slug);

    if (mockData) {
      res.json({
        success: true,
        data: mockData,
        fallback: true,
        error: error.message,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Tour not found",
        destination: req.params.destination,
        slug: req.params.slug,
      });
    }
  }
});

// Sample tours data for fallback
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

// Mock tour detail data
const getMockTourData = (destination, slug) => {
  // Return basic mock data - can be expanded
  return {
    id: 1,
    title: `ทัวร์ ${destination} - ${slug}`,
    slug: slug,
    destination: destination,
    location: destination,
    price: 1590,
    description: "ข้อมูลจำลองสำหรับการทดสอบ",
    highlights: ["จุดท่องเที่ยวสวยงาม", "ราคาเหมาะสม", "บริการดี"],
    gallery: [],
    reviews: [],
    itinerary: [],
  };
};

export default router;
