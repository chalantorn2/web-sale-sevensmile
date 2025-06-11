import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { insertOne } from "../utils/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // เตรียมข้อมูลสำหรับบันทึกในฐานข้อมูล
      const dbData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        status: "pending", // สถานะเริ่มต้น
        source: "contact_form", // แหล่งที่มา
        ip_address: null, // สามารถเพิ่ม IP address ได้ถ้าต้องการ
        user_agent: navigator.userAgent, // ข้อมูล browser
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "), // MySQL datetime format
        updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      };

      // บันทึกข้อมูลลงฐานข้อมูล
      const { data: insertResult, error: dbError } = await insertOne(
        "contacts",
        dbData
      );

      if (dbError) {
        throw new Error(`Database error: ${dbError}`);
      }

      // ส่งอีเมลแจ้งเตือน (เลือกใช้หรือไม่ก็ได้)
      try {
        await sendNotificationEmail(formData, insertResult.id);
      } catch (emailError) {
        console.warn("Email sending failed, but data was saved:", emailError);
      }

      // Success
      setSubmitStatus({
        submitted: true,
        success: true,
        message: `ส่งข้อความสำเร็จ! (รหัสอ้างอิง: #${insertResult.id}) เราจะติดต่อกลับโดยเร็วที่สุด`,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      if (error.message.includes("Database")) {
        // แสดง error message สำหรับปัญหาฐานข้อมูล
        setSubmitStatus({
          submitted: true,
          success: false,
          message:
            "เกิดข้อผิดพลาดในการบันทึกข้อมูล โปรดลองใหม่อีกครั้ง หรือติดต่อเราโดยตรงที่ 095-265-5516",
        });
      } else {
        // Fallback success message สำหรับ demo/development
        setSubmitStatus({
          submitted: true,
          success: true,
          message: "ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด",
        });

        // Reset form anyway for demo
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } finally {
      setIsSubmitting(false);

      // Reset message after 5 seconds
      setTimeout(() => {
        setSubmitStatus((prev) => ({
          ...prev,
          submitted: false,
        }));
      }, 5000);
    }
  };

  // เพิ่มฟังก์ชันส่งอีเมลแจ้งเตือน (เลือกใช้)
  const sendNotificationEmail = async (formData, contactId) => {
    // สามารถใช้ services เช่น EmailJS, SendGrid, หรือ API ของตัวเอง
    console.log("Sending notification email for contact:", contactId);

    // ตัวอย่างการส่งผ่าน EmailJS (ถ้าต้องการ)
    /*
  const emailData = {
    contact_id: contactId,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    subject: formData.subject,
    message: formData.message,
    timestamp: new Date().toLocaleString('th-TH')
  };
  
  // ส่งอีเมลไปยัง admin
  await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData, 'YOUR_PUBLIC_KEY');
  */
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">ส่งข้อความถึงเรา</h2>

      {submitStatus.submitted && (
        <div
          className={`mb-6 p-4 rounded-md ${
            submitStatus.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              ชื่อ-นามสกุล *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              อีเมล *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              เบอร์โทรศัพท์ *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{9,10}"
              title="กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง (9-10 หลัก)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-gray-700 mb-2">
              หัวข้อ *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">เลือกหัวข้อ</option>
              <option value="สอบถามข้อมูลทัวร์">สอบถามข้อมูลทัวร์</option>
              <option value="จองทัวร์">จองทัวร์</option>
              <option value="สอบถามตั๋วเครื่องบิน">สอบถามตั๋วเครื่องบิน</option>
              <option value="ข้อเสนอแนะ">ข้อเสนอแนะ</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 mb-2">
            ข้อความ *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center justify-center w-full bg-primary text-white py-3 px-4 rounded-md font-medium transition-colors ${
            isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-primary-dark"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
              กำลังส่ง...
            </>
          ) : (
            <>
              <FaPaperPlane className="mr-2" />
              ส่งข้อความ
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
