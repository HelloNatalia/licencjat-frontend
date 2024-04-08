import TopBrand from "./TopBrand";
import Menu from "./Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Announcements from "./Announcements";
import { Helmet } from "react-helmet";
import Requests from "./Requests.js";
import MyAnnouncements from "./MyAnnouncements.js";
import Recipes from "./Recipes.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import CreateAnnouncement from "./CreateAnnouncement.js";
import EditAnnouncement from "./EditAnnouncement.js";
import MyAccount from "./MyAccount.js";
import SpecificAccount from "./SpecificAccount.js";
import FavouriteRecipes from "./FavouriteRecipes.js";
import CreateTempRecipe from "./CreateTempRecipe.js";
import MyTemporaryRecipes from "./MyTemporaryRecipes.js";
import Admin from "./admin/Admin.js";
import RecipesPanel from "./admin/RecipesPanel.js";
import TempRecipesPanel from "./admin/TempRecipesPanel.js";
import CreateRecipe from "./admin/CreateRecipe.js";
import EditRecipe from "./admin/EditRecipe.js";
import Reports from "./admin/reports/Reports.js";

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
          <Route path="/requests" element={<Requests />} />
          <Route path="/my-announcements" element={<MyAnnouncements />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-announcement" element={<CreateAnnouncement />} />
          <Route path="/edit-announcement/:id" element={<EditAnnouncement />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/account" element={<SpecificAccount />} />
          <Route path="/favourite-recipes" element={<FavouriteRecipes />} />
          <Route path="/create-recipe" element={<CreateTempRecipe />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/recipes-panel" element={<RecipesPanel />} />
          <Route path="/temp-recipes-panel" element={<TempRecipesPanel />} />
          <Route path="/add-recipe" element={<CreateRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route
            path="/my-temporary-recipes"
            element={<MyTemporaryRecipes />}
          />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
