import { FaShip, FaAnchor } from "react-icons/fa";

const TourOptionSelector = ({
  tourSlug,
  options = [],
  selectedOption,
  onOptionChange,
  basePrice = 0,
}) => {
  // ไม่แสดง selector ถ้าไม่มี options หรือมีแค่ตัวเดียว
  if (options.length <= 1) {
    return null;
  }

  // Helper function สำหรับกำหนด features ตามชื่อ option
  const getFeaturesByOptionName = (name) => {
    const nameLower = name.toLowerCase();

    if (nameLower.includes("สปีด") || nameLower.includes("speed")) {
      return ["เร็วและประหยัดเวลา", "นั่งสบาย", "มีหลังคากันแดด"];
    } else if (nameLower.includes("หางยาว") || nameLower.includes("longtail")) {
      return ["บรรยากาศดั้งเดิม", "ราคาประหยัด", "ใกล้ชิดธรรมชาติ"];
    } else {
      return ["บริการคุณภาพ", "ปลอดภัย", "สะดวกสบาย"];
    }
  };

  // แปลงข้อมูลจากฐานข้อมูลให้เป็น format ที่ UI ใช้
  const formatOptions = (dbOptions) => {
    return dbOptions.map((option) => ({
      id: option.id,
      name: option.name,
      price_modifier: Number(option.price_modifier) || 0,
      description: option.description,
      itinerary: option.itinerary || [],
      icon:
        option.name.toLowerCase().includes("สปีด") ||
        option.name.toLowerCase().includes("speed") ? (
          <FaShip className="text-blue-500" />
        ) : (
          <FaAnchor className="text-orange-500" />
        ),
      features: getFeaturesByOptionName(option.name),
    }));
  };

  const formattedOptions = formatOptions(options);

  console.log("TourOptionSelector Debug:", {
    tourSlug,
    optionsCount: options.length,
    formattedCount: formattedOptions.length,
    firstOption: formattedOptions[0],
  });

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FaShip className="mr-2 text-blue-500" />
        เลือกประเภทเรือ
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formattedOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedOption?.id === option.id
                ? "border-blue-500 bg-blue-50 shadow-lg"
                : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
            onClick={() => onOptionChange(option)}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{option.icon}</div>
                <h4 className="font-semibold text-gray-800">{option.name}</h4>
              </div>
              <div className="text-right">
                {option.price_modifier === 0 ? (
                  <span className="text-blue-600 font-bold">
                    ฿{basePrice.toLocaleString()}
                  </span>
                ) : (
                  <div>
                    <span className="text-blue-600 font-bold">
                      ฿{(basePrice + option.price_modifier).toLocaleString()}
                    </span>
                    <div className="text-xs text-green-600">
                      ประหยัด ฿
                      {Math.abs(option.price_modifier).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3">{option.description}</p>

            {/* Features */}
            <div className="space-y-1">
              {option.features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  <span className="mr-2 text-green-500">•</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Selected indicator */}
            {selectedOption?.id === option.id && (
              <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                เลือกแล้ว
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info Note */}
      <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>หมายเหตุ:</strong>{" "}
              ราคาและกำหนดการอาจแตกต่างกันตามประเภทเรือที่เลือก
              เรือหางยาวจะใช้เวลานานกว่าแต่ให้บรรยากาศที่แตกต่าง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourOptionSelector;
