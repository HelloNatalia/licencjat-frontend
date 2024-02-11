import { useState } from "react";
import "./Recipes.css";
import { Form, Button } from "react-bootstrap";

const recipes_array = [
  { id_recipe: 1, title: "Makaron ze szpinakiem", id_recipe_category: 2 },
  { id_recipe: 2, title: "Spaghetti", id_recipe_category: 2 },
  { id_recipe: 3, title: "Naleśniki ze szpiankiem", id_recipe_category: 3 },
];

export default function Recipes() {
  const [selectedProducts, setSelectedProducts] = useState([
    "Makaron",
    "Cebula",
    "Mąka",
  ]);
  const [listView, setListView] = useState(true);
  const handleAddProduct = (id) => {
    setSelectedProducts([...selectedProducts, id]);
  };
  const handleRemoveProduct = (id) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== id));
  };
  const handleShowListView = () => setListView(true);
  const handleHideListView = () => setListView(false);
  return (
    <div className="content">
      {listView ? (
        <>
          <SearchForms
            selectedProducts={selectedProducts}
            handleAddProduct={handleAddProduct}
            handleRemoveProduct={handleRemoveProduct}
          />
          <RecipesList handleHideListView={handleHideListView} />
        </>
      ) : (
        <RecipePage handleShowListView={handleShowListView} />
      )}
    </div>
  );
}

function SearchForms({
  selectedProducts,
  handleAddProduct,
  handleRemoveProduct,
}) {
  return (
    <div>
      <div className="row mt-3 mx-2">
        <div className="col-12 col-md-6 col-lg-5 mt-2">
          <Form.Select name="product_id" className="search-form">
            <option className="default-product">Wybierz produkty</option>
            <option>Makaron</option>
            <option>Chleb</option>
          </Form.Select>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mt-2">
          <Form.Select name="category_id" className="search-form">
            <option className="default-category">Kategoria</option>
            <option>Śniadanie</option>
            <option>Obiad</option>
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

function RecipesList({ handleHideListView }) {
  return (
    <div className="row mx-3 mt-4">
      {recipes_array.map((recipe) => (
        <Recipe recipe={recipe} handleHideListView={handleHideListView} />
      ))}
    </div>
  );
}

function Recipe({ recipe, handleHideListView }) {
  return (
    <div className="col-12 col-lg-6 p-3">
      <div
        onClick={() => handleHideListView()}
        className="recipe-box d-flex align-items-center p-2"
      >
        <div className="description col-8">
          <p className="title">{recipe.title}</p>
          <p className="area">Brakuje: 0</p>
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

function RecipePage({ handleShowListView }) {
  return (
    <>
      <RecipeButtons handleShowListView={handleShowListView} />
      <RecipeContent />
    </>
  );
}

function RecipeButtons({ handleShowListView }) {
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
            <div className="btn btn-sm category-info px-3">NAZWA KATEGORII</div>
          </div>
        </div>
      </div>
    </>
  );
}

function RecipeContent() {
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
