import React, { useEffect, useState } from "react";
import "./Recipes.css";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import Select from "react-select";

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
  const [allRecipesList, setAllRecipesList] = useState([]);
  const handleAddProduct = (option) => {
    if (!selectedProductsId.includes(option.value)) {
      setSelectedProductsId([...selectedProductsId, option.value]);
      setSelectedProducts([...selectedProducts, option.label]);
    }
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
        if (selectedCategory && selectedCategory.length !== 0) {
          body = {
            id_recipe_category: selectedCategory,
            products_list: selectedProductsId,
          };
          console.log("BODY: ", body);
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
  useEffect(
    function () {
      async function fetchAllRecipesList() {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:4000/recipe/all?id_recipe_category=${selectedCategory}`
        );
        const data = await res.json();
        setAllRecipesList(data);
        setIsLoading(false);
      }
      if (recipesList.length === 0 && selectedProductsId.length === 0)
        fetchAllRecipesList();
      else setAllRecipesList([]);
    },
    [recipesList]
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
      // console.log(data);
      const newArray = [];
      data.map((element) => {
        newArray.push({ value: element.id_product, label: element.name });
      });
      setProductsList(newArray);
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
            allRecipesList={allRecipesList}
            selectedProducts={selectedProducts}
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
  const handleRecipeCategoryChange = (option) => {
    if (option.target.value === "") setSelectedCategory("");
    else {
      setSelectedCategory(option.target.value);
    }
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="row mt-3 mx-2">
        <div className="col-12 col-md-6 col-lg-5 mt-2">
          <Select
            options={productsList}
            onChange={handleAddProduct}
            className="select-react-container"
            id="id_products"
            placeholder="Produkt"
          />
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
        <div className="col">
          <button className="btn btn-danger mt-2" onClick={handleRefreshPage}>
            <i class="bi bi-trash"></i>
          </button>
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

function RecipesList({
  handleHideListView,
  recipesList,
  allRecipesList,
  selectedProducts,
}) {
  const sortedRecipesList = [...recipesList].sort(
    (a, b) => a.missing - b.missing
  );

  const _toDelete = [];
  const _allRecipeIds = [];
  const newAllRecipesList = [];
  if (allRecipesList && allRecipesList.length !== 0) {
    allRecipesList.map((element) => {
      if (_allRecipeIds.includes(element.recipe.id_recipe)) {
        _toDelete.push(element.id_recipe_product);
      } else _allRecipeIds.push(element.recipe.id_recipe);
    });
    if (allRecipesList.length !== 0) {
      allRecipesList.map((element) => {
        if (!_toDelete.includes(element.id_recipe_product)) {
          newAllRecipesList.push(element);
        }
      });
    }
  }
  return (
    <div className="row mx-3 mt-4">
      {sortedRecipesList &&
        sortedRecipesList.map((recipe) => (
          <Recipe recipe={recipe} handleHideListView={handleHideListView} />
        ))}

      {allRecipesList && allRecipesList.length !== 0
        ? newAllRecipesList.map((element) => (
            <Recipe
              recipe={element.recipe}
              handleHideListView={handleHideListView}
            />
          ))
        : ""}
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
          {recipe.missing !== undefined ? (
            <p className="area">
              Brakuje: <span className="text-secondary"> {recipe.missing}</span>
            </p>
          ) : (
            <p className="area">
              Brakuje:{" "}
              <span className="text-secondary"> Nie wybrano produktów</span>
            </p>
          )}

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
  const [productMissing, setProductMissing] = useState();
  const [city, setCity] = useState("");
  const [nearInfo, setNearInfo] = useState("");
  const [productsNearby, setProductsNearby] = useState([]);
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

  useEffect(function () {
    async function createProductsList() {
      setIsLoading(true);
      const newArray = [];
      for (const element of recipeProductData) {
        let text;
        if (!selectedProductsId.includes(element.product.id_product)) {
          text = await getProductsNearbyText(element.product.id_product);
        } else {
          text = "posiadasz";
        }
        newArray.push({
          name: element.product.name,
          id: element.product.id_product,
          text: text,
        });
      }
      setProductsNearby(newArray);
      setIsLoading(false);
    }

    createProductsList();
  }, []);

  const getProductsNearbyText = async (id) => {
    setIsLoading(true);
    const getNearby = async (city, id) => {
      const resCount = await fetch(
        `http://localhost:4000/announcement/get-products-nearby?id=${id}&city=${city}`
      );

      if (!resCount.ok) {
        setIsLoading(false);
        return "Błąd w pobraniu danych";
      }

      const dataCount = await resCount.json();
      console.log(`${dataCount} w mieście ${city}`);
      setIsLoading(false);
      return `${dataCount} w mieście ${city}`;
    };

    let cityName = "";
    // Próba pobrania miasta od zalogowanego użytkownika
    let loggedIn = false;
    try {
      const res = await fetch(
        `http://localhost:4000/address/get-user-address`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(
          "Nie posiadasz (Błąd w pobraniu danych w celu wyświetlenia ilości produktów w okolicy)"
        );
      }

      const data = await res.json();
      cityName = data.city;
      return getNearby(cityName, id);
    } catch (error) {
      // jeżeli nie udało się pobrać miasta użytkownika
      loggedIn = false;

      // Wyszukanie miasta po lokalizacji:
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        console.log("DANE LOKALIZACJI: ", latitude, longitude);

        const controller = new AbortController();
        const signal = controller.signal;
        const timeout = 3000;
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, timeout);

        try {
          const response = await fetch(apiUrl, { signal });
          const data = await response.json();
          cityName = data.address.city;
        } catch (error) {
          setIsLoading(false);
          return "Nie posiadasz (Błąd podczas pobrania ilości dostępnych w twoim meiście produktów)";
        }
      } else {
        setIsLoading(false);
        return "Nie posiadasz (Błąd z pobiedaniem lokalizacji w celu wyświetlenia ilości produktów w pobliżu)";
      }
    }
    return getNearby(cityName, id);
  };

  // if (isLoading) return <div>Loading ...</div>;

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
                {!isLoading
                  ? productsNearby.map((element) => {
                      return (
                        <tr>
                          <th>
                            <li>
                              <p className="fs-5 mb-0">{element.name}</p>
                            </li>
                          </th>
                          <th>
                            {selectedProductsId.includes(element.id) ? (
                              <span className="have-info">
                                <i class="bi bi-check2"></i> posiadasz
                              </span>
                            ) : (
                              <>
                                <Link
                                  className="text-decoration-none"
                                  to={`/announcements?product=${element.id}`}
                                >
                                  <span className="not-have-info">
                                    <i className="bi bi-x"></i> {element.text}
                                  </span>
                                </Link>
                              </>
                            )}
                          </th>
                        </tr>
                      );
                    })
                  : recipeProductData.map((element) => {
                      return (
                        <tr>
                          <th>
                            <li>
                              <p className="fs-5 mb-0">
                                {element.product.name}
                              </p>
                            </li>
                          </th>
                          <th></th>
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
