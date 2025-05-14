import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import Krabi from "./pages/krabi/Krabi";
import Phuket from "./pages/phuket/Phuket";
import PhangNga from "./pages/phang-nga/PhangNga";
import International from "./pages/international/International";
import GroupTour from "./pages/group-tour/GroupTour";
import Contact from "./pages/contact/Contact";

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
