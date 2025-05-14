import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = ({ images, title, subtitle, primaryButton, secondaryButton }) => {
  console.log("Images received in Hero:", images);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen min-h-[600px]">
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === currentImage ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 modal-backdrop"></div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
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

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImage ? "bg-primary" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
