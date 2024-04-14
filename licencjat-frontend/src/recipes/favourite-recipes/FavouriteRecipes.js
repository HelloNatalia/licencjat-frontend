import { useEffect, useState } from "react";
import "./FavouriteRecipes.css";
import { getAuthTokenFromCookie } from "../../cookies/auth-cookies";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { fetchPhoto } from "../../helpers/FetchPhoto";

export default function FavouriteRecipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [favourites, setFavourites] = useState();
  const accessToken = getAuthTokenFromCookie();
  const navigation = useNavigate();

  useEffect(function () {
    async function fetchFavourites() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/recipe/favourites`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === "401") navigation("/login");
      }
      setFavourites(data);
      setIsLoading(false);
    }
    fetchFavourites();
  }, []);

  const handleRemoveFavourite = async (id) => {
    if (!accessToken) navigation("/login");
    const res = await fetch(
      `http://localhost:4000/recipe/delete-favourite/${id}`,
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
    window.location.reload();
  };

  if (isLoading) return <div className="content">Loading ...</div>;

  return (
    <div className="content">
      <div className="p-3">
        <p className="m-3 fs-3">Ulubione przepisy</p>
        <div className="row">
          {Array.isArray(favourites) && favourites.length > 0 ? (
            favourites.map((element) => {
              return (
                <FavouriteRecipe
                  recipe={element}
                  handleRemoveFavourite={handleRemoveFavourite}
                />
              );
            })
          ) : (
            <p className="ms-3">Nie masz ulubionych przepisów</p>
          )}
        </div>
      </div>
    </div>
  );
}

function FavouriteRecipe({ recipe, handleRemoveFavourite }) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeProduct, setRecipeProduct] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(function () {
    async function fetchRecipeProducts() {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:4000/recipe/${recipe.recipe.id_recipe}`
      );

      const data = await res.json();
      setIsLoading(false);
      setRecipeProduct(data);
    }
    fetchRecipeProducts();
  }, []);

  const [photoUrl, setPhotoUrl] = useState(null);
  let photoNamesArray = recipe.recipe.photos.slice(1, -1).split('","');
  photoNamesArray = photoNamesArray.map((name) => name.replace(/^"|"$/g, ""));
  useEffect(() => {
    fetchPhoto(photoNamesArray[0], setPhotoUrl);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="col-12 col-lg-6 p-3">
        <div
          onClick={handleShow}
          className="recipe-box d-flex align-items-center p-2"
        >
          <div className=" col-8">
            <div className="description">
              <p className="title">{recipe.recipe.title}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-heart-fill me-2 heart-icon"
                viewBox="0 0 16 16"
                onClick={() => handleRemoveFavourite(recipe.recipe.id_recipe)}
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>{" "}
              Usuń z ulubionych
            </div>
          </div>
          <div className=" col-4 p-2 text-end d-none d-md-block">
            <img src={photoUrl} className="img-fav" alt="product" />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {recipe.recipe.title} &nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-heart-fill me-2 heart-icon"
              viewBox="0 0 16 16"
              onClick={() => handleRemoveFavourite(recipe.recipe.id_recipe)}
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              />
            </svg>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-lg-6 text-center">
              <img
                src={photoUrl}
                className="img-fluid recipe-image"
                alt="product"
              />
            </div>
            <div className="col-12 col-lg-6 mt-4">
              <p className="fs-4">Składniki:</p>
              <ul className="fs-5">
                {recipeProduct.length > 0
                  ? recipeProduct.map((element) => {
                      return (
                        <li>
                          {element.product.name} - {element.amount}
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
            <div className="col-12 mt-4 px-4">
              <div className="recipe-text-box p-4">{recipe.recipe.text}</div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
