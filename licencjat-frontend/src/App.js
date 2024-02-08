import TopBrand from "./TopBrand";
import Menu from "./Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Announcements from "./Announcements";
import { Helmet } from "react-helmet";

function App() {
  return (
    <Router>
      <Helmet>
        <title>ShareIT</title>
        <link rel="icon" type="image/png" href="/logo_icon.png" sizes="any" />
      </Helmet>
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
