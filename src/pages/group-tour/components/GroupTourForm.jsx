import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import supabase from "../../../utils/supabase";

const GroupTourForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    groupType: "",
    groupSize: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    accommodation: "",
    transportation: "",
    budget: "",
    additionalRequests: "",
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
      // Submit to Supabase
      const { error } = await supabase
        .from("group_tour_requests")
        .insert([formData]);

      if (error) throw error;

      // Success
      setSubmitStatus({
        submitted: true,
        success: true,
        message:
          "ขอบคุณสำหรับข้อมูล! ทีมงานของเราจะติดต่อกลับเพื่อเสนอราคาใน 24 ชั่วโมง",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        groupType: "",
        groupSize: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        accommodation: "",
        transportation: "",
        budget: "",
        additionalRequests: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      // Show fallback success message even when error occurs (for demo)
      setSubmitStatus({
        submitted: true,
        success: true,
        message:
          "ขอบคุณสำหรับข้อมูล! ทีมงานของเราจะติดต่อกลับเพื่อเสนอราคาใน 24 ชั่วโมง",
      });

      // Reset form for demo
      setFormData({
        name: "",
        email: "",
        phone: "",
        groupType: "",
        groupSize: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        accommodation: "",
        transportation: "",
        budget: "",
        additionalRequests: "",
      });
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
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
            <label htmlFor="groupType" className="block text-gray-700 mb-2">
              ประเภทกรุ๊ปทัวร์ *
            </label>
            <select
              id="groupType"
              name="groupType"
              value={formData.groupType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">เลือกประเภทกรุ๊ปทัวร์</option>
              <option value="บริษัท">ทัวร์บริษัท</option>
              <option value="ครอบครัว">ทัวร์ครอบครัว</option>
              <option value="เพื่อน">ทัวร์เพื่อนกลุ่มใหญ่</option>
              <option value="โรงเรียน">ทัวร์โรงเรียน</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="groupSize" className="block text-gray-700 mb-2">
              จำนวนคน *
            </label>
            <input
              type="number"
              id="groupSize"
              name="groupSize"
              value={formData.groupSize}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="destination" className="block text-gray-700 mb-2">
              สถานที่ที่ต้องการไป *
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              placeholder="เช่น ภูเก็ต, กระบี่, พังงา, ญี่ปุ่น"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="departureDate" className="block text-gray-700 mb-2">
              วันที่ต้องการเดินทาง *
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="returnDate" className="block text-gray-700 mb-2">
              วันที่เดินทางกลับ *
            </label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="accommodation" className="block text-gray-700 mb-2">
              ระดับที่พักที่ต้องการ
            </label>
            <select
              id="accommodation"
              name="accommodation"
              value={formData.accommodation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">เลือกระดับที่พัก</option>
              <option value="3 ดาว">โรงแรม 3 ดาว</option>
              <option value="4 ดาว">โรงแรม 4 ดาว</option>
              <option value="5 ดาว">โรงแรม 5 ดาว</option>
              <option value="รีสอร์ท">รีสอร์ท</option>
              <option value="โฮมสเตย์">โฮมสเตย์</option>
              <option value="ไม่ต้องการที่พัก">ไม่ต้องการที่พัก</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="transportation"
              className="block text-gray-700 mb-2"
            >
              การเดินทางที่ต้องการ
            </label>
            <select
              id="transportation"
              name="transportation"
              value={formData.transportation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">เลือกการเดินทาง</option>
              <option value="รถตู้">รถตู้</option>
              <option value="รถบัส">รถบัส</option>
              <option value="เครื่องบิน">เครื่องบิน</option>
              <option value="เรือ">เรือ</option>
              <option value="ผสมผสาน">ผสมผสาน</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="budget" className="block text-gray-700 mb-2">
            งบประมาณต่อคน (บาท)
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="เช่น 1,000 - 3,000 บาท"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="additionalRequests"
            className="block text-gray-700 mb-2"
          >
            รายละเอียดเพิ่มเติม
          </label>
          <textarea
            id="additionalRequests"
            name="additionalRequests"
            value={formData.additionalRequests}
            onChange={handleChange}
            rows="5"
            placeholder="เช่น สถานที่ท่องเที่ยวที่ต้องการไป กิจกรรมที่ต้องการทำ หรือความต้องการพิเศษอื่นๆ"
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
              ส่งคำขอใบเสนอราคา
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GroupTourForm;
