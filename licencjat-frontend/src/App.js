import TopBrand from "./TopBrand";
import Menu from "./Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Announcements from "./Announcements/Announcements.js";
import { Helmet } from "react-helmet";
import Requests from "./requests/Requests.js";
import MyAnnouncements from "./Announcements/my-announcements/MyAnnouncements.js";
import Recipes from "./recipes/Recipes.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import CreateAnnouncement from "./Announcements/CreateAnnouncement.js";
import EditAnnouncement from "./Announcements/EditAnnouncement.js";
import MyAccount from "./MyAccount.js";
import SpecificAccount from "./SpecificAccount.js";
import FavouriteRecipes from "./recipes/favourite-recipes/FavouriteRecipes.js";
import CreateTempRecipe from "./recipes/create-recipe/CreateTempRecipe.js";
import MyTemporaryRecipes from "./recipes/my-recipes/MyTemporaryRecipes.js";
import Admin from "./admin/Admin.js";
import RecipesPanel from "./admin/RecipesPanel.js";
import TempRecipesPanel from "./admin/TempRecipesPanel.js";
import CreateRecipe from "./admin/CreateRecipe.js";
import EditRecipe from "./admin/EditRecipe.js";
import Reports from "./admin/reports/Reports.js";
import Products from "./admin/creating/products/Products.js";
import CreateProduct from "./admin/creating/products/CreateProduct.js";
import CreateRecords from "./admin/creating/CreateRecords.js";
import ProductsCategories from "./admin/creating/products-categories/ProductsCategories.js";
import CreateProductCategory from "./admin/creating/products-categories/CreateProductCategory.js";
import RecipesCategories from "./admin/creating/recipes-categories/RecipesCategories.js";
import CreateRecipeCategory from "./admin/creating/recipes-categories/CreateRecipeCategory.js";
import BlockedAccount from "./errors/BlockedAccount.js";
import SingleAnnouncementPage from "./Announcements/SingleAnnouncementPage.js";
import Tips from "./Tips.js";

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
          <Route path="/products" element={<Products />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/create-records" element={<CreateRecords />} />
          <Route path="/products-categories" element={<ProductsCategories />} />
          <Route
            path="/create-product-category"
            element={<CreateProductCategory />}
          />
          <Route path="/recipes-categories" element={<RecipesCategories />} />
          <Route
            path="/create-recipe-category"
            element={<CreateRecipeCategory />}
          />
          <Route path="/blocked" element={<BlockedAccount />} />
          <Route
            path="/announcement-page"
            element={<SingleAnnouncementPage />}
          />
          <Route path="/tips" element={<Tips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
