import { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const TourIncludes = ({ included, excluded, importantNotes, faqs }) => {
  const [openFaq, setOpenFaq] = useState(null);

  // Guard clause
  if (!included && !excluded && !importantNotes && !faqs) {
    return null;
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="mb-12">
      {/* What's Included & Excluded */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Included */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-green-600 flex items-center">
            <FaCheckCircle className="mr-2" />
            รายการที่รวมในแพ็คเกจ
          </h3>
          <ul className="space-y-3">
            {included.map((item, index) => (
              <li key={index} className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-red-600 flex items-center">
            <FaTimesCircle className="mr-2" />
            รายการที่ไม่รวมในแพ็คเกจ
          </h3>
          <ul className="space-y-3">
            {excluded.map((item, index) => (
              <li key={index} className="flex items-start">
                <FaTimesCircle className="text-red-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Important Notes */}
      {importantNotes && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-orange-600 flex items-center">
            <FaExclamationTriangle className="mr-2" />
            ข้อมูลสำคัญที่ควรทราบ
          </h3>
          <ul className="space-y-3">
            {importantNotes.map((note, index) => (
              <li key={index} className="flex items-start">
                <FaExclamationTriangle className="text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6 text-gray-800">
            คำถามที่พบบ่อย (FAQ)
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TourIncludes;
