import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../cookies/auth-cookies";
import { Button, Modal } from "react-bootstrap";

export default function RecipesPanel() {
  return (
    <div className="content">
      <p>Przepisy - admin</p>
      <p>
        <a href="/temp-recipes-panel">Przepisy do akceptacji</a>
      </p>
      <a href="/add-recipe">Dodaj przepis</a>
      <AllRecipes />
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
      <div>Lista przpeisów</div>
      {recipes.map((element) => {
        return <Recipe id={element.id_recipe} />;
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
      <Button
        className="me-2 answer-request-btn opinion-request-btn"
        onClick={handleShow}
      >
        {recipe[0].recipe.title}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{recipe[0].recipe.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <a href={`/edit-recipe/${id}`}>
                <Button>Edytuj</Button>
              </a>
              <Button onClick={() => handleDeleteRecipe(id)}>Usuń</Button>
            </div>
            <div className="col">
              <p>Składniki</p>
              {recipe.map((element) => {
                return <p>{element.product.name}</p>;
              })}
            </div>
            <div className="col">
              <p>Przepis</p>
              <p>{recipe[0].recipe.text}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
