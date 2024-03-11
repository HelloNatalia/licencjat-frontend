import { useEffect, useState } from "react";
import "./Recipes.css";
import { Form, Button } from "react-bootstrap";

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
  return (
    <div className="row mx-3 mt-4">
      {recipesList.map((recipe) => (
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

function RecipePage({ handleShowListView, recipeId }) {
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
        setIsLoading(false);
      }
      async function fetchRecipeData() {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:4000/recipe/only-recipe/${recipeId}`
        );
        const data = await res.json();
        setRecipeData(data);
        setIsLoading(false);
      }
      fetchRecipeProduct();
      fetchRecipeData();
      console.log("WYBRANE ID PRZEPISU: ", recipeData);
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
      <RecipeContent recipeProductData={recipeProductData} />
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
              {console.log(
                "ETYKIETA KATEGORII: ",
                recipeData.recipe_category.name
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function RecipeContent(recipeProductData) {
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
            <p className="fs-4">Makaron pełnoziarnisty</p>
            <ul>
              <table>
                <tr>
                  <th>
                    <li>
                      <a
                        href="#"
                        className="fs-5 text-decoration-none text-black"
                      >
                        Mąka - 400g
                      </a>
                    </li>
                  </th>
                  <th>
                    <span className="not-have-info">
                      <i class="bi bi-x"></i> 1 w pobliżu
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <li>
                      <p className="fs-5 mb-0">Masło - 200g</p>
                    </li>
                  </th>
                  <th>
                    <span className="have-info">
                      <i class="bi bi-check2"></i> posiadasz
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <li>
                      <a
                        href="#"
                        className="fs-5 text-decoration-none text-black"
                      >
                        jajko - 400g
                      </a>
                    </li>
                  </th>
                  <th>
                    <span className="not-have-info">
                      <i class="bi bi-x"></i> 0 w pobliżu
                    </span>
                  </th>
                </tr>
              </table>
            </ul>
          </div>
        </div>
      </div>
      <div className="row p-4 pt-1">
        <div className="col">
          <div className="white-box p-4">
            Lorem ipsum dolor sit amet consectetur. Odio lectus maecenas varius
            vel at. Egestas metus at nulla massa nulla leo ultrices vulputate.
            Ornare pellentesque sem viverra orci diam nunc sed pharetra sit.
            Eget malesuada et facilisis sit nisl duis tortor hendrerit etiam.
            Curabitur ullamcorper porttitor vulputate euismod maecenas. Varius
            integer quis tellus pretium. Sit ullamcorper nunc feugiat amet id.
            Ac semper tellus faucibus cursus et duis. Venenatis quam ultricies
            etiam egestas elit donec. Eu pellentesque orci vitae pulvinar.
            Varius amet a pellentesque lacus quisque sapien sit. Curabitur
            adipiscing faucibus amet accumsan dignissim. In sociis quis maecenas
            mollis et id morbi. Pretium mauris curabitur ornare auctor.
          </div>
        </div>
      </div>
    </>
  );
}
