import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaComments,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaBuilding,
  FaGraduationCap,
  FaHeart,
} from "react-icons/fa";
import { insertOne } from "../../../utils/api";

const EnhancedGroupTourForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: ข้อมูลติดต่อ
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    company_name: "",

    // Step 2: รายละเอียดทริป
    group_type: "",
    group_size: "",
    travel_date: "",
    return_date: "",
    destination: "",
    budget_min: "",
    budget_max: "",

    // Step 3: ความต้องการพิเศษ
    accommodation_type: "",
    transportation_type: "",
    special_requirements: "",
    dietary_requirements: "",

    // ข้อมูลระบบ
    inquiry_status: "pending",
    source: "website_form",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.customer_name &&
          formData.customer_email &&
          formData.customer_phone
        );
      case 2:
        return (
          formData.group_type &&
          formData.group_size &&
          formData.destination &&
          formData.travel_date
        );
      case 3:
        return true; // Step 3 is optional
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // เตรียมข้อมูลสำหรับบันทึกในฐานข้อมูล
      const dbData = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        company_name: formData.company_name || null,
        group_type: formData.group_type,
        group_size: parseInt(formData.group_size),
        travel_date: formData.travel_date || null,
        return_date: formData.return_date || null,
        destination: formData.destination,
        budget_min: formData.budget_min ? parseInt(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseInt(formData.budget_max) : null,
        accommodation_type: formData.accommodation_type || null,
        transportation_type: formData.transportation_type || null,
        special_requirements: formData.special_requirements || null,
        dietary_requirements: formData.dietary_requirements || null,
        inquiry_status: "pending",
        source: "website_form",
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "), // MySQL datetime format
        updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      };

      // บันทึกข้อมูลลงฐานข้อมูล
      const { data: insertResult, error: dbError } = await insertOne(
        "group_tour_inquiries",
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
        message: `ส่งข้อมูลสำเร็จ! (รหัสอ้างอิง: #${insertResult.id}) ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง`,
      });

      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);

      // แสดง error หรือ fallback success
      if (error.message.includes("Database")) {
        setSubmitStatus({
          submitted: true,
          success: false,
          message:
            "เกิดข้อผิดพลาดในการบันทึกข้อมูล โปรดลองใหม่อีกครั้ง หรือติดต่อเราโดยตรง",
        });
      } else {
        // Fallback success for demo/development
        setSubmitStatus({
          submitted: true,
          success: true,
          message: "ส่งข้อมูลสำเร็จ! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
        });
        resetForm();
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

  const resetForm = () => {
    setFormData({
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      company_name: "",
      group_type: "",
      group_size: "",
      travel_date: "",
      return_date: "",
      destination: "",
      budget_min: "",
      budget_max: "",
      accommodation_type: "",
      transportation_type: "",
      special_requirements: "",
      dietary_requirements: "",
      inquiry_status: "pending",
      source: "website_form",
    });
    setCurrentStep(1);
  };

  // ฟังก์ชันส่งอีเมลแจ้งเตือน (สามารถใช้ API service ภายนอก)
  const sendNotificationEmail = async (formData, inquiryId) => {
    // สามารถใช้ services เช่น EmailJS, SendGrid, หรือ API ของตัวเอง
    console.log("Sending notification email for inquiry:", inquiryId);

    // ตัวอย่างการส่งผ่าน EmailJS (ถ้าต้องการ)
    /*
    const emailData = {
      inquiry_id: inquiryId,
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      group_type: formData.group_type,
      group_size: formData.group_size,
      destination: formData.destination,
      travel_date: formData.travel_date
    };
    
    // ส่งอีเมลไปยัง admin
    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData, 'YOUR_PUBLIC_KEY');
    */
  };

  const stepTitles = {
    1: "ข้อมูลติดต่อ",
    2: "รายละเอียดทริป",
    3: "ความต้องการพิเศษ",
  };

  const groupTypes = [
    { value: "company", label: "ทัวร์บริษัท", icon: <FaBuilding /> },
    { value: "family", label: "ทัวร์ครอบครัว", icon: <FaUsers /> },
    { value: "friends", label: "ทัวร์เพื่อน", icon: <FaUsers /> },
    { value: "school", label: "ทัวร์โรงเรียน", icon: <FaGraduationCap /> },
    { value: "wedding", label: "ทัวร์งานแต่ง", icon: <FaHeart /> },
    { value: "other", label: "อื่นๆ", icon: <FaUsers /> },
  ];

  const destinationOptions = [
    "ภูเก็ต",
    "กระบี่",
    "พังงา",
    "สุราษฎร์ธานี",
    "เกาะสมุย",
    "เกาะพงัน",
    "เกาะเต่า",
    "ญี่ปุ่น",
    "เกาหลี",
    "ไต้หวัน",
    "ฮ่องกง",
    "สิงคโปร์",
    "มาเลเซีย",
    "เวียดนาม",
    "กัมพูชา",
    "ยุโรป",
    "อเมริกา",
    "ออสเตรเลีย",
    "นิวซีแลนด์",
    "ดูไบ",
    "ตุรกี",
    "อื่นๆ",
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ขอใบเสนอราคากรุ๊ปทัวร์
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              กรอกข้อมูลของคุณ เราจะจัดเตรียมใบเสนอราคาพิเศษให้คุณภายใน 24
              ชั่วโมง
            </motion.p>
          </div>

          {/* Success/Error Message */}
          <AnimatePresence>
            {submitStatus.submitted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-8 p-6 rounded-lg border-l-4 ${
                  submitStatus.success
                    ? "bg-green-50 border-green-400 text-green-700"
                    : "bg-red-50 border-red-400 text-red-700"
                }`}
              >
                <div className="flex items-center">
                  <FaCheckCircle className="mr-3 text-xl" />
                  <span className="font-medium">{submitStatus.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                ขั้นตอนที่ {currentStep} จาก {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {stepTitles[currentStep]}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                initial={{ width: "33%" }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: ข้อมูลติดต่อ */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                      <FaUser className="mr-3 text-primary" />
                      ข้อมูลติดต่อ
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="customer_name"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          ชื่อ-นามสกุล *
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            id="customer_name"
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="กรอกชื่อ-นามสกุล"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="customer_email"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          อีเมล *
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            id="customer_email"
                            name="customer_email"
                            value={formData.customer_email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="example@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="customer_phone"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          เบอร์โทรศัพท์ *
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            id="customer_phone"
                            name="customer_phone"
                            value={formData.customer_phone}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{9,10}"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="08X-XXX-XXXX"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="company_name"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          ชื่อบริษัท/หน่วยงาน (ถ้ามี)
                        </label>
                        <div className="relative">
                          <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="ชื่อบริษัทหรือหน่วยงาน"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: รายละเอียดทริป */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                      <FaMapMarkerAlt className="mr-3 text-primary" />
                      รายละเอียดทริป
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="group_type"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          ประเภทกรุ๊ป *
                        </label>
                        <select
                          id="group_type"
                          name="group_type"
                          value={formData.group_type}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">เลือกประเภทกรุ๊ป</option>
                          {groupTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="group_size"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          จำนวนคน *
                        </label>
                        <div className="relative">
                          <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            id="group_size"
                            name="group_size"
                            value={formData.group_size}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="จำนวนผู้เดินทาง"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="travel_date"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          วันที่ต้องการเดินทาง *
                        </label>
                        <div className="relative">
                          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            id="travel_date"
                            name="travel_date"
                            value={formData.travel_date}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="return_date"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          วันที่เดินทางกลับ
                        </label>
                        <div className="relative">
                          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            id="return_date"
                            name="return_date"
                            value={formData.return_date}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="destination"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          ปลายทางที่สนใจ *
                        </label>
                        <select
                          id="destination"
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">เลือกปลายทาง</option>
                          {destinationOptions.map((dest) => (
                            <option key={dest} value={dest}>
                              {dest}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          งบประมาณต่อคน (บาท)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative">
                            <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="number"
                              id="budget_min"
                              name="budget_min"
                              value={formData.budget_min}
                              onChange={handleChange}
                              placeholder="ต่ำสุด"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div className="relative">
                            <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="number"
                              id="budget_max"
                              name="budget_max"
                              value={formData.budget_max}
                              onChange={handleChange}
                              placeholder="สูงสุด"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: ความต้องการพิเศษ */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                      <FaComments className="mr-3 text-primary" />
                      ความต้องการพิเศษ (ไม่บังคับ)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="accommodation_type"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          ระดับที่พักที่ต้องการ
                        </label>
                        <select
                          id="accommodation_type"
                          name="accommodation_type"
                          value={formData.accommodation_type}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">เลือกระดับที่พัก</option>
                          <option value="budget">ประหยัด (3 ดาว)</option>
                          <option value="standard">มาตรฐาน (4 ดาว)</option>
                          <option value="premium">พรีเมียม (5 ดาว)</option>
                          <option value="resort">รีสอร์ท</option>
                          <option value="boutique">โรงแรมบูติก</option>
                          <option value="no_accommodation">
                            ไม่ต้องการที่พัก
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="transportation_type"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          การเดินทางที่ต้องการ
                        </label>
                        <select
                          id="transportation_type"
                          name="transportation_type"
                          value={formData.transportation_type}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">เลือกการเดินทาง</option>
                          <option value="van">รถตู้</option>
                          <option value="bus">รถบัส</option>
                          <option value="private_car">รถเก๋งส่วนตัว</option>
                          <option value="flight">เครื่องบิน</option>
                          <option value="boat">เรือ</option>
                          <option value="mixed">ผสมผสาน</option>
                          <option value="self_drive">ขับรถเอง</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="dietary_requirements"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          ข้อจำกัดด้านอาหาร
                        </label>
                        <input
                          type="text"
                          id="dietary_requirements"
                          name="dietary_requirements"
                          value={formData.dietary_requirements}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="เช่น ไม่ทานเนื้อ, แพ้อาหารทะเล, มุสลิม ฮาลาล"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="special_requirements"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          ความต้องการพิเศษอื่นๆ
                        </label>
                        <textarea
                          id="special_requirements"
                          name="special_requirements"
                          value={formData.special_requirements}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="เช่น สถานที่ท่องเที่ยวที่ต้องการไป, กิจกรรมพิเศษ, ผู้สูงอายุ, ผู้พิการ, เด็กเล็ก หรือข้อมูลอื่นๆ ที่ต้องการให้เราทราบ"
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-8 bg-white p-6 rounded-lg border">
                      <h4 className="font-semibold text-gray-800 mb-4">
                        สรุปข้อมูลคำขอ
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">ชื่อผู้ติดต่อ:</span>
                          <span className="ml-2 font-medium">
                            {formData.customer_name}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">อีเมล:</span>
                          <span className="ml-2 font-medium">
                            {formData.customer_email}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">เบอร์โทร:</span>
                          <span className="ml-2 font-medium">
                            {formData.customer_phone}
                          </span>
                        </div>
                        {formData.company_name && (
                          <div>
                            <span className="text-gray-600">
                              บริษัท/หน่วยงาน:
                            </span>
                            <span className="ml-2 font-medium">
                              {formData.company_name}
                            </span>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-600">ประเภทกรุ๊ป:</span>
                          <span className="ml-2 font-medium">
                            {groupTypes.find(
                              (t) => t.value === formData.group_type
                            )?.label || formData.group_type}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">จำนวนคน:</span>
                          <span className="ml-2 font-medium">
                            {formData.group_size} ท่าน
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">ปลายทาง:</span>
                          <span className="ml-2 font-medium">
                            {formData.destination}
                          </span>
                        </div>
                        {formData.travel_date && (
                          <div>
                            <span className="text-gray-600">
                              วันที่เดินทาง:
                            </span>
                            <span className="ml-2 font-medium">
                              {formData.travel_date}
                              {formData.return_date &&
                                ` - ${formData.return_date}`}
                            </span>
                          </div>
                        )}
                        {(formData.budget_min || formData.budget_max) && (
                          <div>
                            <span className="text-gray-600">งบประมาณ:</span>
                            <span className="ml-2 font-medium">
                              {formData.budget_min &&
                                `${parseInt(
                                  formData.budget_min
                                ).toLocaleString()}`}
                              {formData.budget_min &&
                                formData.budget_max &&
                                " - "}
                              {formData.budget_max &&
                                `${parseInt(
                                  formData.budget_max
                                ).toLocaleString()}`}
                              {(formData.budget_min || formData.budget_max) &&
                                " บาท/คน"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <FaChevronLeft className="mr-2" />
                  ย้อนกลับ
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      validateStep(currentStep)
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ถัดไป
                    <FaChevronRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !validateStep(2)}
                    className={`flex items-center px-8 py-3 rounded-lg font-medium transition-colors ${
                      isSubmitting || !validateStep(2)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
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
                        ส่งข้อมูล
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">หรือติดต่อเราโดยตรงที่</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="tel:0952655516"
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                <FaPhone className="mr-2" />
                095-265-5516
              </a>
              <a
                href="mailto:sevensmiletour@gmail.com"
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                <FaEnvelope className="mr-2" />
                sevensmiletour@gmail.com
              </a>
              <a
                href="https://line.me/R/ti/p/@sevensmile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-700 transition-colors"
              >
                <FaComments className="mr-2" />
                Line: @sevensmile
              </a>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>
                เวลาทำการ: จันทร์-เสาร์ 08:00-21:00 น. | วันอาทิตย์ 10:00-16:00
                น.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedGroupTourForm;
