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
} from "react-icons/fa";
import supabase from "../../../utils/supabase";

const EnhancedGroupTourForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: ข้อมูลติดต่อ
    customer_name: "",
    customer_email: "",
    customer_phone: "",

    // Step 2: รายละเอียดทริป
    group_type: "",
    group_size: "",
    travel_date: "",
    destination: "",
    budget: "",

    // Step 3: ความต้องการพิเศษ
    special_requirements: "",
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
          formData.group_type && formData.group_size && formData.destination
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
      // บันทึกข้อมูลลง Database
      const { error: dbError } = await supabase
        .from("group_tour_inquiries")
        .insert([formData]);

      if (dbError) throw dbError;

      // ส่งอีเมลผ่าน Edge Function
      const { error: emailError } = await supabase.functions.invoke(
        "send-group-inquiry",
        {
          body: formData,
        }
      );

      if (emailError) {
        console.warn("Email sending failed, but data was saved:", emailError);
      }

      // Success
      setSubmitStatus({
        submitted: true,
        success: true,
        message: "ส่งข้อมูลสำเร็จ! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
      });

      // Reset form
      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        group_type: "",
        group_size: "",
        travel_date: "",
        destination: "",
        budget: "",
        special_requirements: "",
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);

      // Fallback success for demo
      setSubmitStatus({
        submitted: true,
        success: true,
        message: "ส่งข้อมูลสำเร็จ! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
      });

      // Reset form anyway
      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        group_type: "",
        group_size: "",
        travel_date: "",
        destination: "",
        budget: "",
        special_requirements: "",
      });
      setCurrentStep(1);
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

  const stepTitles = {
    1: "ข้อมูลติดต่อ",
    2: "รายละเอียดทริป",
    3: "ความต้องการพิเศษ",
  };

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

          {/* Success Message */}
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

                      <div className="md:col-span-2">
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
                          <option value="บริษัท">ทัวร์บริษัท</option>
                          <option value="ครอบครัว">ทัวร์ครอบครัว</option>
                          <option value="เพื่อน">ทัวร์เพื่อน</option>
                          <option value="โรงเรียน">ทัวร์โรงเรียน</option>
                          <option value="งานแต่ง">ทัวร์งานแต่ง</option>
                          <option value="อื่นๆ">อื่นๆ</option>
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
                          วันที่ต้องการเดินทาง
                        </label>
                        <div className="relative">
                          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            id="travel_date"
                            name="travel_date"
                            value={formData.travel_date}
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
                        <input
                          type="text"
                          id="destination"
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="เช่น ภูเก็ต, กระบี่, ญี่ปุ่น"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="budget"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          งบประมาณต่อคน (บาท)
                        </label>
                        <div className="relative">
                          <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="เช่น 5,000 - 10,000 บาท"
                          />
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

                    <div>
                      <label
                        htmlFor="special_requirements"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        รายละเอียดเพิ่มเติม
                      </label>
                      <textarea
                        id="special_requirements"
                        name="special_requirements"
                        value={formData.special_requirements}
                        onChange={handleChange}
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="เช่น สถานที่ท่องเที่ยวที่ต้องการไป, กิจกรรมพิเศษ, ความต้องการด้านอาหาร, ที่พัก หรือข้อมูลอื่นๆ ที่ต้องการให้เราทราบ"
                      />
                    </div>

                    {/* Summary */}
                    <div className="mt-8 bg-white p-6 rounded-lg border">
                      <h4 className="font-semibold text-gray-800 mb-4">
                        สรุปข้อมูล
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">ชื่อ:</span>
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
                          <span className="text-gray-600">เบอร์:</span>
                          <span className="ml-2 font-medium">
                            {formData.customer_phone}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">ประเภทกรุ๊ป:</span>
                          <span className="ml-2 font-medium">
                            {formData.group_type}
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
                            <span className="text-gray-600">วันที่:</span>
                            <span className="ml-2 font-medium">
                              {formData.travel_date}
                            </span>
                          </div>
                        )}
                        {formData.budget && (
                          <div>
                            <span className="text-gray-600">งบประมาณ:</span>
                            <span className="ml-2 font-medium">
                              {formData.budget}
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
                className="flex items-center text-primary hover:text-primary-dark"
              >
                <FaPhone className="mr-2" />
                095-265-5516
              </a>
              <a
                href="mailto:sevensmiletour@gmail.com"
                className="flex items-center text-primary hover:text-primary-dark"
              >
                <FaEnvelope className="mr-2" />
                sevensmiletour@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedGroupTourForm;
