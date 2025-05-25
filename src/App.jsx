import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import Krabi from "./pages/krabi/Krabi";
import Phuket from "./pages/phuket/Phuket";
import PhangNga from "./pages/phang-nga/PhangNga";
import International from "./pages/international/International";
import GroupTour from "./pages/group-tour/GroupTour";
import Contact from "./pages/contact/Contact";
import TourDetail from "./pages/tour-detail/TourDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/krabi" element={<Krabi />} />
          <Route path="/phuket" element={<Phuket />} />
          <Route path="/phang-nga" element={<PhangNga />} />
          <Route path="/international" element={<International />} />
          <Route path="/group-tour" element={<GroupTour />} />
          <Route path="/contact" element={<Contact />} />

          {/* Tour Detail Routes */}
          <Route
            path="/tours/:destination/:tourSlug"
            element={<TourDetail />}
          />

          {/* Legacy routes for backward compatibility */}
          <Route path="/krabi/:tourSlug" element={<TourDetail />} />
          <Route path="/phuket/:tourSlug" element={<TourDetail />} />
          <Route path="/phang-nga/:tourSlug" element={<TourDetail />} />
          <Route path="/international/:tourSlug" element={<TourDetail />} />

          {/* 404 Route - should be last */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">ไม่พบหน้าที่คุณต้องการ</p>
                  <a href="/" className="text-blue-600 hover:text-blue-800">
                    กลับสู่หน้าแรก
                  </a>
                </div>
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
