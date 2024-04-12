import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../cookies/auth-cookies";
import { Button, Modal } from "react-bootstrap";
import "./RecipePanel.css";
import { fetchPhoto } from "../FetchPhoto";

export default function RecipesPanel() {
  return (
    <div className="content">
      <div className="container mb-4">
        <p className="fs-4 m-3">Przepisy</p>
        <div className="ms-3">
          <a className="btn btn-success me-3 mt-2" href="/add-recipe">
            Dodaj przepis
          </a>
          <a className="btn btn-success mt-2" href="/temp-recipes-panel">
            Przepisy do akceptacji
          </a>
        </div>
        <AllRecipes />
      </div>
    </div>
  );
}

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigate();
  const accessToken = getAuthTokenFromCookie();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchRecipes() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/recipe/all-admin-panel`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        navigation("/");
      }

      const data = await res.json();
      setIsLoading(false);
      setRecipes(data);
    }
    fetchRecipes();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {recipes.map((element) => {
        return (
          <div className="row m-1 mt-4">
            <div className="col">
              <Recipe id={element.id_recipe} />
            </div>
          </div>
        );
      })}
    </>
  );
}

function Recipe({ id }) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAuthTokenFromCookie();
  const navigation = useNavigate();
  const [recipe, setRecipe] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(function () {
    async function fetchRecipes() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/recipe/${id}`);

      if (!res.ok) {
        navigation("/");
      }

      const data = await res.json();
      setIsLoading(false);
      setRecipe(data);
    }
    fetchRecipes();
  }, []);

  const [photoUrl, setPhotoUrl] = useState(null);
  useEffect(() => {
    // console.log(recipe[0].recipe);
    if (recipe.length > 0) {
      let photoNamesArray = recipe[0].recipe.photos.slice(1, -1).split('","');
      photoNamesArray = photoNamesArray.map((name) =>
        name.replace(/^"|"$/g, "")
      );
      fetchPhoto(photoNamesArray[0], setPhotoUrl);
    }
  }, [recipe]);

  const handleDeleteRecipe = async (id) => {
    const res = await fetch(
      `http://localhost:4000/recipe/delete-recipe/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
      }
    );

    if (!res.ok) {
      window.location.reload();
    }
    window.location.reload();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="recipe-admin-box" onClick={handleShow}>
        <div className="row p-3">
          <div className="col">
            <div className="d-flex">
              <div className="img-admin-recipe">
                <img src={photoUrl} className="img-fluid" alt="product" />
              </div>
              <div className="info-admin-recipe ms-4">
                <p>{recipe[0].recipe.title}</p>
                <a href={`/edit-recipe/${id}`}>
                  <Button className="btn-sm btn-admin-recipe-edit m-2">
                    Edytuj
                  </Button>
                </a>
                <Button
                  className="btn-sm btn-admin-recipe-delete m-2"
                  onClick={() => handleDeleteRecipe(id)}
                >
                  Usuń
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {recipe[0].recipe.title}{" "}
            <a href={`/edit-recipe/${id}`}>
              <Button className="btn-sm btn-admin-recipe-edit m-2">
                Edytuj
              </Button>
            </a>
            <Button
              className="btn-sm btn-admin-recipe-delete m-2"
              onClick={() => handleDeleteRecipe(id)}
            >
              Usuń
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 text-center mt-2">
              <img src={photoUrl} className="img-fluid" alt="product" />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mt-2 ps-5">
              <p className="fs-5">Składniki:</p>
              <ul>
                {recipe.map((element) => {
                  return (
                    <li>
                      <p>
                        {element.product.name} - {element.amount}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-12 col-lg-5 mt-2 ps-5">
              <p className="fs-5">Przepis:</p>
              <p>{recipe[0].recipe.text}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
