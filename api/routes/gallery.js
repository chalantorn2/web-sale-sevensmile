// api/routes/gallery.js - Gallery Routes
import express from "express";
import { selectMany } from "../middleware/database.js";

const router = express.Router();

// GET /api/gallery - Get group tour gallery
router.get("/", async (req, res) => {
  try {
    const { type = "all", active = "all" } = req.query;

    // เริ่มด้วยการดูว่ามีตารางและข้อมูลไหม
    let sql = "SELECT * FROM group_tour_gallery WHERE 1=1";
    let params = [];

    // Filter by active status (default: show all)
    if (active === "true" || active === "1") {
      sql += " AND is_active = 1";
    } else if (active === "false" || active === "0") {
      sql += " AND is_active = 0";
    }
    // ถ้า active = 'all' จะแสดงทั้งหมด (ไม่เพิ่ม WHERE is_active)

    // ถ้าต้องการ filter by type
    if (type !== "all") {
      sql += " AND type = ?";
      params.push(type);
    }

    sql += " ORDER BY sort_order ASC, id DESC"; // เรียงตาม sort_order แล้วจาก id ใหม่ไปเก่า

    console.log("🔍 Gallery Query:", sql, params);

    const result = await query(sql, params);

    if (result.success) {
      console.log(`📊 Gallery found ${result.data.length} records`);

      // Log sample data for debugging
      if (result.data.length > 0) {
        console.log("📸 Sample gallery item:", {
          id: result.data[0].id,
          title: result.data[0].title?.substring(0, 30) + "...",
          type: result.data[0].type,
          is_active: result.data[0].is_active,
        });
      }

      const gallery = result.data.map((item) => ({
        id: item.id,
        title: item.title,
        image_url: item.image_url,
        type: item.type,
        participants_count: item.participants_count,
        year: item.year,
        sort_order: item.sort_order,
        is_active: Boolean(item.is_active),
        description: item.description || null,
        created_at: item.created_at,
      }));

      res.json({
        success: true,
        data: gallery,
        count: gallery.length,
        filter: { type, active },
        debug: {
          sql: sql,
          params: params,
          totalRows: result.data.length,
        },
      });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("❌ Gallery API Error:", error.message);

    // Fallback to sample gallery data
    const sampleGallery = getSampleGallery(req.query.type);

    res.json({
      success: true,
      data: sampleGallery,
      count: sampleGallery.length,
      fallback: true,
      error: error.message,
    });
  }
});

// Sample gallery data for fallback
const getSampleGallery = (type = "all") => {
  const allGallery = [
    {
      id: 1,
      title: "กรุ๊ปทัวร์บริษัท ABC 45 ท่าน - ภูเก็ต",
      image_url: "/images/group-tour/gallery/domestic-1.jpg",
      type: "domestic",
      participants_count: 45,
      year: 2024,
      description: "ทัวร์ภูเก็ต 3 วัน 2 คืน สำหรับพนักงานบริษัท ABC",
      created_at: "2024-03-15",
    },
    {
      id: 2,
      title: "กรุ๊ปทัวร์ครอบครัวใหญ่ 38 ท่าน - กระบี่",
      image_url: "/images/group-tour/gallery/domestic-2.jpg",
      type: "domestic",
      participants_count: 38,
      year: 2024,
      description: "ทัวร์กระบี่ 2 วัน 1 คืน สำหรับครอบครัวใหญ่",
      created_at: "2024-02-20",
    },
    {
      id: 3,
      title: "กรุ๊ปทัวร์เพื่อน 22 ท่าน - เกาะสิมิลัน",
      image_url: "/images/group-tour/gallery/domestic-3.jpg",
      type: "domestic",
      participants_count: 22,
      year: 2024,
      description: "ทัวร์เกาะสิมิลัน 1 วัน สำหรับกลุ่มเพื่อน",
      created_at: "2024-01-10",
    },
    {
      id: 4,
      title: "กรุ๊ปทัวร์โรงเรียน 55 ท่าน - กระบี่",
      image_url: "/images/group-tour/gallery/domestic-4.jpg",
      type: "domestic",
      participants_count: 55,
      year: 2023,
      description: "ทัวร์ศึกษาดูงาน กระบี่ สำหรับนักเรียนมัธยม",
      created_at: "2023-12-05",
    },
    {
      id: 5,
      title: "กรุ๊ปทัวร์วงเล็บ 28 ท่าน - พังงา",
      image_url: "/images/group-tour/gallery/domestic-5.jpg",
      type: "domestic",
      participants_count: 28,
      year: 2023,
      description: "ทัวร์อ่าวพังงา สำหรับกลุ่มเพื่อนสนิท",
      created_at: "2023-11-18",
    },
    {
      id: 6,
      title: "กรุ๊ปทัวร์ญี่ปุ่น 25 ท่าน - โตเกียว",
      image_url: "/images/group-tour/gallery/international-1.jpg",
      type: "international",
      participants_count: 25,
      year: 2024,
      description: "ทัวร์ญี่ปุ่น โตเกียว 5 วัน 3 คืน",
      created_at: "2024-04-10",
    },
    {
      id: 7,
      title: "กรุ๊ปทัวร์เกาหลี 32 ท่าน - โซล",
      image_url: "/images/group-tour/gallery/international-2.jpg",
      type: "international",
      participants_count: 32,
      year: 2024,
      description: "ทัวร์เกาหลี โซล 5 วัน 3 คืน",
      created_at: "2024-03-25",
    },
    {
      id: 8,
      title: "กรุ๊ปทัวร์ยุโรป 18 ท่าน - ฝรั่งเศส",
      image_url: "/images/group-tour/gallery/international-3.jpg",
      type: "international",
      participants_count: 18,
      year: 2023,
      description: "ทัวร์ยุโรป ฝรั่งเศส-อิตาลี 8 วัน 5 คืน",
      created_at: "2023-10-15",
    },
    {
      id: 9,
      title: "กรุ๊ปทัวร์สิงคโปร์ 42 ท่าน",
      image_url: "/images/group-tour/gallery/international-4.jpg",
      type: "international",
      participants_count: 42,
      year: 2023,
      description: "ทัวร์สิงคโปร์ 4 วัน 3 คืน สำหรับกลุ่มใหญ่",
      created_at: "2023-09-08",
    },
  ];

  if (type === "all") {
    return allGallery;
  }

  return allGallery.filter((item) => item.type === type);
};

export default router;
