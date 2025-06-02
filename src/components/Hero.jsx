import { Link } from "react-router-dom";

const Hero = ({
  image,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  showAdvertBanner = false,
}) => {
  return (
    <div
      className={`relative ${
        showAdvertBanner ? "h-[75vh]" : "h-screen"
      } min-h-[500px]`}
    >
      {/* Background Image - Single image instead of slider */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 modal-backdrop"></div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-4xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight ">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">{subtitle}</p>

          <div className="flex flex-wrap gap-4">
            {primaryButton && (
              <Link
                to={primaryButton.link}
                className="bg-primary text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-primary-dark transition-colors"
              >
                {primaryButton.text}
              </Link>
            )}

            {secondaryButton && (
              <Link
                to={secondaryButton.link}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-white hover:text-primary transition-colors"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Advertisement Banner Area - Only shown when showAdvertBanner is true */}
      {/* {showAdvertBanner && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-0/4 z-10">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="w-full text-center">
              <div className="bg-white/90 rounded-lg p-4 shadow-lg mx-auto max-w-5xl">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  โปรโมชันพิเศษ
                </h3>
                <p className="text-gray-800">
                  จองทัวร์ภายในวันนี้ รับส่วนลดทันที 15% พร้อมฟรี!
                  รถรับ-ส่งสนามบิน
                </p>
                <Link
                  to="/contact"
                  className="inline-block mt-3 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-dark transition-colors"
                >
                  จองเลย
                </Link>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Hero;
