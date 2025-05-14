import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // For animations

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { label: "หน้าแรก", path: "/" },
      { label: "ทัวร์กระบี่", path: "/krabi" },
      { label: "ทัวร์ภูเก็ต", path: "/phuket" },
      { label: "ทัวร์พังงา", path: "/phang-nga" },
      { label: "ทัวร์ต่างประเทศ", path: "/international" },
      { label: "จัดกรุ๊ปทัวร์", path: "/group-tour" },
      { label: "ติดต่อเรา", path: "/contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false); // Close mobile menu on route change
  }, [location]);

  // Animation variants for mobile menu
  const menuVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    closed: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-b from-[#003f7f]/50 to-transparent py-4"
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo with scale animation on scroll */}
        <Link to="/" className="flex items-center">
          <motion.img
            src="/images/logo.png"
            alt="Seven Smile Tour And Ticket"
            className="h-12"
            loading="lazy"
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-base transition-colors ${
                location.pathname === item.path
                  ? "text-blue-600"
                  : isScrolled
                  ? "text-gray-800 hover:text-blue-600"
                  : "text-white hover:text-blue-300"
              }`}
              aria-current={
                location.pathname === item.path ? "page" : undefined
              }
            >
              {item.label}
              {/* Animated underline for active/hover state */}
              <motion.span
                className="absolute left-0 bottom-[-4px] w-full h-0.5 bg-blue-600"
                initial={false}
                animate={{
                  scaleX: location.pathname === item.path ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          ))}
          {/* CTA Button */}
          <Link
            to="/contact"
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            จองทัวร์เลย
          </Link>
        </div>

        {/* Mobile Menu Button with Animation */}
        <button
          className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <FaTimes
                className={isScrolled ? "text-gray-800" : "text-white"}
              />
            ) : (
              <FaBars className={isScrolled ? "text-gray-800" : "text-white"} />
            )}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu with Slide-in Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute w-full bg-white/95 backdrop-blur-md shadow-xl"
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-3 border-b border-gray-200 text-lg ${
                    location.pathname === item.path
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  aria-current={
                    location.pathname === item.path ? "page" : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobile CTA Button */}
              <Link
                to="/contact"
                className="block mt-4 px-4 py-2 bg-blue-600 text-white text-center rounded-full hover:bg-blue-700 transition-colors"
              >
                จองทัวร์เลย
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
