import { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TourGallery = ({ gallery }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Guard clause
  if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
    return null;
  }

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(gallery[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % gallery.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(gallery[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(gallery[prevIndex]);
  };

  // Handle keyboard navigation
  const handleKeyPress = (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  return (
    <section className="mb-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          แกลเลอรี่รูปภาพ
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => openLightbox(index)}
              style={{ backgroundColor: "#f3f4f6" }} // เพิ่ม background สีเทาอ่อน
            >
              {/* รูปภาพหลัก - ให้ z-index สูง */}
              <img
                src={image.src}
                alt={image.alt || `รูปภาพ ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{
                  zIndex: 1, // ให้รูปภาพอยู่เหนือ background
                  backgroundColor: "transparent",
                }}
                loading="lazy"
                onError={(e) => {
                  // ถ้าโหลดรูปไม่ได้ ให้แสดง placeholder
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
                onLoad={(e) => {
                  // ถ้าโหลดรูปสำเร็จ ซ่อน placeholder
                  e.target.style.display = "block";
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = "none";
                  }
                }}
              />

              {/* Placeholder สำหรับรูปที่โหลดไม่ได้ */}
              <div
                className="absolute inset-0 w-full h-full bg-gray-200 flex flex-col items-center justify-center"
                style={{
                  zIndex: 0,
                  display: "none", // ซ่อนไว้ก่อน แสดงเมื่อรูปโหลดไม่ได้
                }}
              >
                <div className="text-4xl text-gray-400 mb-2">📷</div>
                <div className="text-xs text-gray-500 text-center px-2">
                  รูปภาพไม่สามารถโหลดได้
                </div>
              </div>

              {/* Hover Overlay - ให้ z-index สูงกว่ารูป */}
              <div
                className="absolute inset-0 bg-black transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-40"
                style={{ zIndex: 2 }}
              >
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ดูภาพขยาย
                </span>
              </div>

              {/* Caption preview - ให้ z-index สูงสุด */}
              {image.caption && (
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ zIndex: 3 }}
                >
                  <p className="text-white text-sm">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyPress}
            tabIndex={0}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors z-10"
              onClick={closeLightbox}
              aria-label="ปิดแกลเลอรี่"
            >
              <FaTimes />
            </button>

            {/* Previous button */}
            {gallery.length > 1 && (
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="รูปก่อนหน้า"
              >
                <FaChevronLeft />
              </button>
            )}

            {/* Next button */}
            {gallery.length > 1 && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="รูปถัดไป"
              >
                <FaChevronRight />
              </button>
            )}

            {/* Image */}
            <div
              className="max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt || `รูปภาพ ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                style={{ backgroundColor: "transparent" }}
              />

              {/* Caption */}
              <div className="bg-white p-4 text-center">
                <p className="text-gray-800 font-medium">
                  {selectedImage.caption || `รูปภาพ ${currentIndex + 1}`}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {currentIndex + 1} / {gallery.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TourGallery;
