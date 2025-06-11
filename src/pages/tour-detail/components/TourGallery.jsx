import { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TourGallery = ({ gallery }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Debug log - ดูข้อมูลที่ได้มา
  console.log("🖼️ TourGallery Debug:", {
    gallery: gallery,
    isArray: Array.isArray(gallery),
    length: gallery?.length,
    firstImage: gallery?.[0],
    allImages: gallery,
  });

  // Guard clause - ถ้าไม่มีข้อมูล gallery
  if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
    console.log("❌ TourGallery: No gallery data");
    return (
      <section className="mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            แกลเลอรี่รูปภาพ
          </h2>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p>ไม่มีรูปภาพสำหรับทัวร์นี้</p>
            <small>
              Debug: {JSON.stringify({ gallery, length: gallery?.length })}
            </small>
          </div>
        </div>
      </section>
    );
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

  console.log(`✅ TourGallery: Rendering ${gallery.length} images`);

  return (
    <section className="mb-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          แกลเลอรี่รูปภาพ
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((image, index) => {
            // Debug แต่ละรูป
            console.log(`🖼️ Rendering image ${index + 1}:`, {
              src: image.src,
              alt: image.alt,
              caption: image.caption,
            });

            return (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square bg-gray-200 border border-gray-300"
                onClick={() => openLightbox(index)}
              >
                {/* รูปภาพหลัก */}
                <img
                  src={image.src}
                  alt={image.alt || `รูปภาพทัวร์ ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  onLoad={() => {
                    console.log(
                      `✅ Image ${index + 1} loaded successfully:`,
                      image.src
                    );
                  }}
                  onError={(e) => {
                    console.error(
                      `❌ Image ${index + 1} failed to load:`,
                      image.src
                    );
                    // แสดง fallback
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />

                {/* Fallback placeholder */}
                <div
                  className="absolute inset-0 w-full h-full bg-gray-300 flex flex-col items-center justify-center"
                  style={{ display: "none" }}
                >
                  <div className="text-4xl text-gray-500 mb-2">🖼️</div>
                  <div className="text-xs text-gray-600 text-center px-2">
                    รูปภาพไม่สามารถโหลดได้
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{image.src}</div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ดูภาพขยาย
                  </span>
                </div>

                {/* Caption */}
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm">{image.caption}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 modal-backdrop-g z-50 flex items-center justify-center p-4"
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
              />

              {/* Caption */}
              <div className="bg-white p-4 text-center">
                <p className="text-gray-800 font-medium">
                  {selectedImage.caption ||
                    selectedImage.alt ||
                    `รูปภาพ ${currentIndex + 1}`}
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
