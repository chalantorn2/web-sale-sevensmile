import {
  FaSuitcase,
  FaUtensils,
  FaSun,
  FaTshirt,
  FaCamera,
  FaUmbrellaBeach,
} from "react-icons/fa";

const TourAdditionalInfo = ({ whatToBring, menuSamples }) => {
  // Guard clause - return null if no data
  if (!whatToBring && !menuSamples) {
    return null;
  }

  // Icon mapping for common items
  const getItemIcon = (item) => {
    const itemLower = item.toLowerCase();
    if (itemLower.includes("ครีม") || itemLower.includes("กันแดด"))
      return <FaSun className="text-yellow-500" />;
    if (itemLower.includes("เสื้อ") || itemLower.includes("ผ้า"))
      return <FaTshirt className="text-blue-500" />;
    if (itemLower.includes("กล้อง"))
      return <FaCamera className="text-purple-500" />;
    if (itemLower.includes("ชุดว่าย") || itemLower.includes("บิกินี่"))
      return <FaUmbrellaBeach className="text-cyan-500" />;
    return <FaSuitcase className="text-gray-500" />;
  };

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* What to Bring */}
        {whatToBring && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-600 flex items-center">
              <FaSuitcase className="mr-2" />
              สิ่งที่ต้องนำมา
            </h3>

            <div className="space-y-3">
              {whatToBring.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-lg mr-3 mt-1">{getItemIcon(item)}</div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Pro Tips */}
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>เคล็ดลับ:</strong>{" "}
                    แนะนำให้เตรียมกระเป๋ากันน้ำสำหรับของใช้ส่วนตัว
                    และใส่ชุดว่ายน้ำมาล่วงหน้าเพื่อความสะดวก
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Samples */}
        {menuSamples && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-green-600 flex items-center">
              <FaUtensils className="mr-2" />
              ตัวอย่างเมนูอาหาร
            </h3>

            {/* Breakfast */}
            {menuSamples.breakfast && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="text-orange-400 mr-2">🌅</span>
                  อาหารเช้า
                </h4>
                <ul className="space-y-2">
                  {menuSamples.breakfast.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lunch */}
            {menuSamples.lunch && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="text-yellow-400 mr-2">☀️</span>
                  อาหารกลางวัน
                </h4>
                <ul className="space-y-2">
                  {menuSamples.lunch.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dinner */}
            {menuSamples.dinner && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="text-purple-400 mr-2">🌙</span>
                  อาหารเย็น
                </h4>
                <ul className="space-y-2">
                  {menuSamples.dinner.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Snacks */}
            {menuSamples.snacks && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="text-pink-400 mr-2">🍉</span>
                  ผลไม้ตามฤดูกาลและเครื่องดื่ม
                </h4>
                <ul className="space-y-2">
                  {menuSamples.snacks.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Note */}
            <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    <strong>หมายเหตุ:</strong>{" "}
                    เมนูอาหารอาจมีการเปลี่ยนแปลงตามฤดูกาลและความพร้อมของวัตถุดิบ
                    หากมีอาหารที่แพ้โปรดแจ้งล่วงหน้า
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TourAdditionalInfo;
