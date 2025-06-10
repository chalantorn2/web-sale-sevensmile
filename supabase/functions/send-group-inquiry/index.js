// supabase/functions/send-group-inquiry/index.js

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const inquiryData = await req.json();

    // Create email content
    const emailText = generateEmailText(inquiryData);
    const emailHtml = generateEmailHtml(inquiryData);

    // Log email content (สำหรับ development)
    console.log("=== NEW GROUP TOUR INQUIRY ===");
    console.log(emailText);
    console.log("===============================");

    // TODO: ส่งอีเมลจริงๆ ตรงนี้
    // สามารถใช้ Resend, SendGrid, หรือ SMTP service อื่นๆ

    // ตัวอย่างการส่งด้วย fetch (ถ้ามี email service)
    /*
    const emailResponse = await fetch('YOUR_EMAIL_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'sevensmiletour@gmail.com',
        subject: `[กรุ๊ปทัวร์] ใบขอใบเสนอราคาใหม่ - ${inquiryData.customer_name}`,
        text: emailText,
        html: emailHtml
      }),
    })
    */

    return new Response(
      JSON.stringify({
        success: true,
        message: "ข้อมูลถูกส่งเรียบร้อยแล้ว",
        data: {
          customer_name: inquiryData.customer_name,
          timestamp: new Date().toISOString(),
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing inquiry:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง",
        details: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

function generateEmailText(data) {
  const timestamp = new Date().toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
📋 ใบขอใบเสนอราคากรุ๊ปทัวร์
════════════════════════════════════

👤 ข้อมูลลูกค้า:
   • ชื่อ-นามสกุล: ${data.customer_name}
   • อีเมล: ${data.customer_email}
   • เบอร์โทรศัพท์: ${data.customer_phone}

🏢 รายละเอียดทริป:
   • ประเภทกรุ๊ป: ${data.group_type}
   • จำนวนคน: ${data.group_size} ท่าน
   • ปลายทางที่สนใจ: ${data.destination}
   ${data.travel_date ? `• วันที่ต้องการเดินทาง: ${data.travel_date}` : ""}
   ${data.budget ? `• งบประมาณต่อคน: ${data.budget}` : ""}

${
  data.special_requirements
    ? `📝 ความต้องการพิเศษ:
${data.special_requirements}

`
    : ""
}⏰ ส่งเมื่อ: ${timestamp}
🌐 ที่มา: เว็บไซต์ Seven Smile Tour

════════════════════════════════════
Seven Smile Tour And Ticket
📧 sevensmiletour@gmail.com
📞 095-265-5516, 083-969-1300
🌍 www.sevensmiletour.com
  `.trim();
}

function generateEmailHtml(data) {
  const timestamp = new Date().toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ใบขอใบเสนอราคากรุ๊ปทัวร์</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #0066cc, #004c99);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 30px 20px;
    }
    .section {
      margin-bottom: 25px;
      border-left: 4px solid #0066cc;
      padding-left: 15px;
    }
    .section h2 {
      color: #0066cc;
      font-size: 18px;
      margin: 0 0 15px 0;
      display: flex;
      align-items: center;
    }
    .section h2::before {
      content: "";
      margin-right: 10px;
      font-size: 20px;
    }
    .customer-info h2::before { content: "👤"; }
    .trip-info h2::before { content: "🏢"; }
    .special-info h2::before { content: "📝"; }
    .system-info h2::before { content: "⏰"; }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 10px;
      margin-bottom: 10px;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
    .value {
      color: #333;
    }
    .special-text {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #0066cc;
      white-space: pre-wrap;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #dee2e6;
    }
    .contact-info {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #0066cc;
      text-decoration: none;
    }
    @media (max-width: 600px) {
      .info-grid {
        grid-template-columns: 1fr;
        gap: 5px;
      }
      .contact-info {
        flex-direction: column;
        gap: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 ใบขอใบเสนอราคากรุ๊ปทัวร์</h1>
    </div>
    
    <div class="content">
      <div class="section customer-info">
        <h2>ข้อมูลลูกค้า</h2>
        <div class="info-grid">
          <span class="label">ชื่อ-นามสกุล:</span>
          <span class="value">${data.customer_name}</span>
        </div>
        <div class="info-grid">
          <span class="label">อีเมล:</span>
          <span class="value">${data.customer_email}</span>
        </div>
        <div class="info-grid">
          <span class="label">เบอร์โทรศัพท์:</span>
          <span class="value">${data.customer_phone}</span>
        </div>
      </div>

      <div class="section trip-info">
        <h2>รายละเอียดทริป</h2>
        <div class="info-grid">
          <span class="label">ประเภทกรุ๊ป:</span>
          <span class="value">${data.group_type}</span>
        </div>
        <div class="info-grid">
          <span class="label">จำนวนคน:</span>
          <span class="value">${data.group_size} ท่าน</span>
        </div>
        <div class="info-grid">
          <span class="label">ปลายทางที่สนใจ:</span>
          <span class="value">${data.destination}</span>
        </div>
        ${
          data.travel_date
            ? `
        <div class="info-grid">
          <span class="label">วันที่ต้องการเดินทาง:</span>
          <span class="value">${data.travel_date}</span>
        </div>
        `
            : ""
        }
        ${
          data.budget
            ? `
        <div class="info-grid">
          <span class="label">งบประมาณต่อคน:</span>
          <span class="value">${data.budget}</span>
        </div>
        `
            : ""
        }
      </div>

      ${
        data.special_requirements
          ? `
      <div class="section special-info">
        <h2>ความต้องการพิเศษ</h2>
        <div class="special-text">${data.special_requirements}</div>
      </div>
      `
          : ""
      }

      <div class="section system-info">
        <h2>ข้อมูลระบบ</h2>
        <div class="info-grid">
          <span class="label">ส่งเมื่อ:</span>
          <span class="value">${timestamp}</span>
        </div>
        <div class="info-grid">
          <span class="label">ที่มา:</span>
          <span class="value">เว็บไซต์ Seven Smile Tour</span>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <h3 style="margin: 0 0 10px 0; color: #0066cc;">Seven Smile Tour And Ticket</h3>
      <div class="contact-info">
        <a href="mailto:sevensmiletour@gmail.com" class="contact-item">
          📧 sevensmiletour@gmail.com
        </a>
        <a href="tel:0952655516" class="contact-item">
          📞 095-265-5516
        </a>
        <a href="tel:0839691300" class="contact-item">
          📞 083-969-1300
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
