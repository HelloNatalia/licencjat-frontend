import TopBrand from "./TopBrand";
import Menu from "./Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Announcements from "./Announcements";

function App() {
  return (
    <Router>
      <div>
        <TopBrand />
        <Menu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/announcements" element={<Announcements />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
