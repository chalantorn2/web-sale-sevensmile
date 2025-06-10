import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import useGroupTourGallery from "../../../hooks/useGroupTourGallery";

const GroupTourGallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { gallery, loading, error } = useGroupTourGallery(activeFilter);

  const filters = [
    { id: "all", label: "ทั้งหมด" },
    { id: "domestic", label: "ในประเทศ" },
    { id: "international", label: "ต่างประเทศ" },
  ];

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
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

  if (error) {
    console.error("Gallery error:", error);
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ผลงานกรุ๊ปทัวร์ที่ผ่านมา
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ชมผลงานการจัดกรุ๊ปทัวร์ที่เราได้ดูแลลูกค้าด้วยความใส่ใจ
            ทั้งทัวร์ในประเทศและต่างประเทศ
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white p-1 rounded-lg shadow-md">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-primary text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" layout>
            <AnimatePresence>
              {gallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(item, index)}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback image
                        e.target.src = "/images/placeholder-tour.jpg";
                      }}
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0  group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">
                        ดูภาพขยาย
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && gallery.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-300 mb-4">📷</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              ยังไม่มีรูปภาพในหมวดนี้
            </h3>
            <p className="text-gray-600">
              กรุณาเลือกหมวดอื่น หรือติดต่อเราเพื่อดูผลงานเพิ่มเติม
            </p>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 modal-backdrop-g z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              onKeyDown={handleKeyPress}
              tabIndex={0}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
                onClick={closeLightbox}
                aria-label="ปิดแกลเลอรี่"
              >
                <FaTimes />
              </button>

              {/* Previous button */}
              {gallery.length > 1 && (
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label="รูปถัดไป"
                >
                  <FaChevronRight />
                </button>
              )}

              {/* Image Container */}
              <motion.div
                className="max-w-5xl max-h-full bg-white rounded-lg overflow-hidden shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />

                {/* Image Info */}
                {/* <div className="p-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {selectedImage.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-gray-600">
                        <div className="flex items-center">
                          <FaUsers className="mr-2 text-primary" />
                          <span>{selectedImage.participants_count} ท่าน</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-primary" />
                          <span>ปี {selectedImage.year}</span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedImage.type === "domestic"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {selectedImage.type === "domestic"
                            ? "ทัวร์ในประเทศ"
                            : "ทัวร์ต่างประเทศ"}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {currentIndex + 1} / {gallery.length}
                    </div>
                  </div>
                </div> */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GroupTourGallery;
