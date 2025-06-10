import { Link } from "react-router-dom";

const Hero = ({
  image,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  showAdvertBanner = false,
}) => {
  // Function สำหรับ smooth scroll
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace("#", ""));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
            {primaryButton &&
              (primaryButton.link.startsWith("#") ? (
                <button
                  onClick={(e) => handleSmoothScroll(e, primaryButton.link)}
                  className="cursor-pointer bg-primary text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-primary-dark transition-colors"
                >
                  {primaryButton.text}
                </button>
              ) : (
                <Link
                  to={primaryButton.link}
                  className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-primary-dark transition-colors"
                >
                  {primaryButton.text}
                </Link>
              ))}

            {secondaryButton &&
              (secondaryButton.link.startsWith("#") ? (
                <button
                  onClick={(e) => handleSmoothScroll(e, secondaryButton.link)}
                  className="cursor-pointer bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-white hover:text-black transition-colors"
                >
                  {secondaryButton.text}
                </button>
              ) : (
                <Link
                  to={secondaryButton.link}
                  className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-white hover:text-primary transition-colors"
                >
                  {secondaryButton.text}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
