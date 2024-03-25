import { useEffect, useState } from "react";
import "./MyTemporaryRecipes.css";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function MyTemporaryRecipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const accessToken = getAuthTokenFromCookie();
  const navigation = useNavigate();
  //  my-recipe-propositions

  useEffect(function () {
    async function fetchMyRecipes() {
      const res = await fetch(
        `http://localhost:4000/recipe/my-recipe-propositions`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        if (res.status === 401) navigation("/login");
      }
      const data = await res.json();
      setRecipes(data);
      setIsLoading(false);
    }
    if (accessToken) fetchMyRecipes();
    else navigation("/login");
  }, []);

  if (isLoading) return <div className="content">Loading ...</div>;

  return (
    <div className="content">
      <div className="p-3">
        <p className="m-3 fs-3">Moje propozycje przepisów</p>
        <div className="row">
          {Array.isArray(recipes) && recipes.length > 0
            ? recipes.map((element) => {
                return <MyRecipe recipe={element} />;
              })
            : "Pusto"}
        </div>
      </div>
    </div>
  );

  function MyRecipe({ recipe }) {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [recipeProduct, setRecipeProduct] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(function () {
      async function fetchRecipeProducts() {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:4000/recipe/temporary/${recipe.id_temporary_recipe}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          navigation("/");
        }

        const data = await res.json();
        setIsLoading(false);
        setRecipeProduct(data);
      }
      fetchRecipeProducts();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
      <>
        <div className="col-12 col-lg-6 p-3">
          <div
            onClick={handleShow}
            className="recipe-box d-flex align-items-center p-2"
          >
            <div className="description col-8">
              <p className="title">{recipe.title}</p>

              <p className="date">
                Status:{" "}
                {recipe.status === "created" ? (
                  <span className="my-recipe-status status-created">
                    niesprawdzony
                  </span>
                ) : (
                  <span className="my-recipe-status status-accepted">
                    zaakceptowany
                  </span>
                )}
              </p>
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

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {recipe.title} &nbsp;
              {recipe.status === "created" ? (
                <span className="my-recipe-status status-created fs-5">
                  niesprawdzony
                </span>
              ) : (
                <span className="my-recipe-status status-accepted fs-5">
                  zaakceptowany
                </span>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12 col-lg-6 text-center">
                <img
                  src="announcement-img/1.png"
                  className="img-fluid recipe-image"
                  alt="product"
                />
              </div>
              <div className="col-12 col-lg-6">
                <p className="fs-4">Składniki:</p>
                <ul className="fs-5">
                  {recipeProduct.length > 0
                    ? recipeProduct.map((element) => {
                        return <li>{element.product.name}</li>;
                      })
                    : ""}
                </ul>
              </div>
              <div className="col-12 mt-4 px-4">
                <div className="recipe-text-box p-4">{recipe.text}</div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
