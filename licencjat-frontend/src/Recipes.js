import { useEffect, useState } from "react";
import "./Recipes.css";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";

export default function Recipes() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductsId, setSelectedProductsId] = useState([]);
  const [listView, setListView] = useState(true);
  const [categoriesList, setCategoriesList] = useState();
  const [productsList, setProductsList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recipesList, setRecipesList] = useState([]);
  const [recipeId, setRecipeId] = useState(null);
  const handleAddProduct = (event) => {
    setSelectedProductsId([...selectedProductsId, event.target.value]);
    const selectedOptionData = JSON.parse(
      event.target.selectedOptions[0].getAttribute("data-option")
    );
    setSelectedProducts([...selectedProducts, selectedOptionData.name]);
  };
  const handleRemoveProduct = (id) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== id));
    setSelectedProductsId(selectedProductsId.filter((_, i) => i !== id));
  };
  const handleShowListView = () => {
    setRecipeId(null);
    setListView(true);
  };
  const handleHideListView = (id) => {
    setRecipeId(id);
    setListView(false);
  };

  useEffect(
    function () {
      async function fetchRecipesList() {
        setIsLoading(true);
        let body;
        if (selectedCategory.length !== 0) {
          body = {
            id_recipe_category: selectedCategory,
            products_list: selectedProductsId,
          };
        } else body = { products_list: selectedProductsId };

        const res = await fetch(`http://localhost:4000/recipe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        setRecipesList(data);
        console.log("lista: ", recipesList);
        setIsLoading(false);
      }
      fetchRecipesList();
    },
    [selectedCategory, selectedProductsId]
  );

  useEffect(function () {
    async function fetchCategoriesList() {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:4000/recipe/recipes-categories`
      );
      const data = await res.json();
      console.log(data);
      setCategoriesList(data);
      setIsLoading(false);
    }
    async function fetchProductsList() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/product/product-list`);
      const data = await res.json();
      console.log(data);
      setProductsList(data);
      setIsLoading(false);
    }
    fetchCategoriesList();
    fetchProductsList();
  }, []);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="content">
      {listView ? (
        <>
          <SearchForms
            selectedProducts={selectedProducts}
            handleAddProduct={handleAddProduct}
            handleRemoveProduct={handleRemoveProduct}
            categoriesList={categoriesList}
            productsList={productsList}
            setSelectedCategory={setSelectedCategory}
          />
          <RecipesList
            handleHideListView={handleHideListView}
            recipesList={recipesList}
          />
        </>
      ) : (
        <RecipePage
          handleShowListView={handleShowListView}
          recipeId={recipeId}
          selectedProductsId={selectedProductsId}
        />
      )}
    </div>
  );
}

function SearchForms({
  selectedProducts,
  handleAddProduct,
  handleRemoveProduct,
  categoriesList,
  productsList,
  setSelectedCategory,
}) {
  const handleRecipeCategoryChange = (event) => {
    if (event.target.value === "") setSelectedCategory("");
    else {
      setSelectedCategory(event.target.value);
    }
  };

  return (
    <div>
      <div className="row mt-3 mx-2">
        <div className="col-12 col-md-6 col-lg-5 mt-2">
          <Form.Select
            name="product_id"
            className="search-form"
            onChange={handleAddProduct}
          >
            <option value="" className="default-product">
              Wybierz produkty
            </option>
            {productsList && productsList.length > 0
              ? productsList.map((element) => {
                  return (
                    <option
                      value={element.id_product}
                      data-option={JSON.stringify({
                        id: element.id_product,
                        name: element.name,
                      })}
                    >
                      {element.name}
                    </option>
                  );
                })
              : ""}
          </Form.Select>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mt-2">
          <Form.Select
            name="category_id"
            className="search-form"
            onChange={handleRecipeCategoryChange}
          >
            <option value="" className="default-category">
              Kategoria
            </option>
            {categoriesList && categoriesList.length > 0
              ? categoriesList.map((element) => {
                  return (
                    <option value={element.id_recipe_category}>
                      {element.name}
                    </option>
                  );
                })
              : ""}
          </Form.Select>
        </div>
      </div>
      {selectedProducts.length !== 0 && (
        <div className="row mt-3 mx-2">
          <div className="col">
            <div className="d-flex flex-wrap">
              {selectedProducts.map((element, index) => (
                <div className="selected-product d-flex" key={index}>
                  <p className="">{element}</p>
                  <i
                    onClick={() => handleRemoveProduct(index)}
                    className="bi bi-x-lg ms-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RecipesList({ handleHideListView, recipesList }) {
  const sortedRecipesList = [...recipesList].sort(
    (a, b) => a.missing - b.missing
  );
  return (
    <div className="row mx-3 mt-4">
      {sortedRecipesList.map((recipe) => (
        <Recipe recipe={recipe} handleHideListView={handleHideListView} />
      ))}
    </div>
  );
}

function Recipe({ recipe, handleHideListView }) {
  return (
    <div className="col-12 col-lg-6 p-3">
      <div
        onClick={() => handleHideListView(recipe.id_recipe)}
        className="recipe-box d-flex align-items-center p-2"
      >
        <div className="description col-8">
          <p className="title">{recipe.title}</p>
          <p className="area">Brakuje: {recipe.missing}</p>
          <p className="date">{recipe.id_recipe_category}</p>
        </div>
        <div className="img-recipe-box col-4 p-2 text-end">
          <img
            src="announcement-img/1.png"
            className="img-fluid"
            alt="product"
          />
        </div>
      </div>
    </div>
  );
}

function RecipePage({ handleShowListView, recipeId, selectedProductsId }) {
  const [recipeProductData, setRecipeProductData] = useState([]);
  const [recipeData, setRecipeData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function fetchRecipeProduct() {
        setIsLoading(true);
        const res = await fetch(`http://localhost:4000/recipe/${recipeId}`);
        const data = await res.json();
        setRecipeProductData(data);
      }
      async function fetchRecipeData() {
        const res = await fetch(
          `http://localhost:4000/recipe/only-recipe/${recipeId}`
        );
        const data = await res.json();
        setRecipeData(data);
        setIsLoading(false);
      }
      fetchRecipeProduct();
      fetchRecipeData();
    },
    [recipeId]
  );

  if (isLoading) return <div>Loading ...</div>;

  return (
    <>
      <RecipeButtons
        handleShowListView={handleShowListView}
        recipeData={recipeData}
      />
      <RecipeContent
        recipeProductData={recipeProductData}
        recipeData={recipeData}
        selectedProductsId={selectedProductsId}
      />
    </>
  );
}

function RecipeButtons({ handleShowListView, recipeData }) {
  return (
    <>
      <div className="row d-flex mt-3 ms-2">
        <div className="col-5 col-md-3 mb-2">
          <Button
            className="back-btn btn-sm"
            onClick={() => handleShowListView()}
          >
            <i class="bi bi-caret-left"></i> POWRÓT
          </Button>
        </div>
        <div className="col">
          <div className="d-flex">
            <div className="btn btn-sm category-info px-3">
              {recipeData.recipe_category.name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function RecipeContent({ recipeProductData, recipeData, selectedProductsId }) {
  const allProducts = [];
  const [favourite, setFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAuthTokenFromCookie();
  const navigation = useNavigate();

  useEffect(function () {
    async function isFavourite() {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:4000/recipe/is-favourite/${recipeData.id_recipe}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        if (res.status === "401") navigation("/login");
      }

      if (data.is_favourite === true) {
        setFavourite(true);
      } else setFavourite(false);
      setIsLoading(false);
    }
    if (accessToken) isFavourite();
    else setIsLoading(false);
  }, []);

  recipeProductData.map((element) => {
    const productId = element.product.id_product;
    allProducts.push(productId);
  });
  console.log("Posiadane: ", selectedProductsId);
  console.log("Wszytskie: ", allProducts);

  const handleAddFavourite = async () => {
    if (!accessToken) navigation("/login");
    const requestData = { id_recipe: recipeData.id_recipe };
    const res = await fetch(`http://localhost:4000/recipe/add-to-favourite/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestData),
    });
    if (!res.ok) {
      if (res.status === "404") navigation("/login");
    }
    setFavourite(true);
  };

  const handleRemoveFavourite = async () => {
    if (!accessToken) navigation("/login");
    const requestData = { id_recipe: recipeData.id_recipe };
    const res = await fetch(
      `http://localhost:4000/recipe/delete-favourite/${recipeData.id_recipe}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
    if (!res.ok) {
      if (res.status === "404") navigation("/login");
    }
    setFavourite(false);
  };

  if (isLoading) return <div>Loading ...</div>;

  return (
    <>
      <div className="row p-4">
        <div className="col-12 col-lg-4 p-2">
          <div className="white-box text-center">
            <img
              src="announcement-img/1.png"
              className="recipe-img"
              alt="product"
            />
          </div>
        </div>
        <div className="col p-2">
          <div className="white-box p-3">
            <p className="fs-4">{recipeData.title}</p>
            <ul>
              <table>
                {recipeProductData.map((element) => {
                  return (
                    <tr>
                      <th>
                        <li>
                          <p className="fs-5 mb-0">{element.product.name}</p>
                        </li>
                      </th>
                      <th>
                        {selectedProductsId.includes(
                          element.product.id_product
                        ) ? (
                          <span className="have-info">
                            <i class="bi bi-check2"></i> posiadasz
                          </span>
                        ) : (
                          <Link
                            className="text-decoration-none"
                            to={
                              "/announcements?product=" +
                              element.product.id_product
                            }
                          >
                            <span className="not-have-info">
                              <i class="bi bi-x"></i> x w pobliżu
                            </span>
                          </Link>
                        )}
                      </th>
                    </tr>
                  );
                })}
              </table>
            </ul>
          </div>
        </div>
      </div>

      <div className="row p-4 pt-1">
        <div className="col">
          <div className="white-box p-4">
            <div className="mb-2 heart">
              {favourite ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-heart-fill me-2"
                    viewBox="0 0 16 16"
                    onClick={handleRemoveFavourite}
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                    />
                  </svg>{" "}
                  Dodano do ulubionych{" "}
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-heart me-2"
                    viewBox="0 0 16 16"
                    onClick={handleAddFavourite}
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg>{" "}
                  Dodaj do ulubionych{" "}
                </>
              )}
            </div>
            {recipeData.text}
          </div>
        </div>
      </div>
    </>
  );
}
