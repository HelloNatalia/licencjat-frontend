import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../cookies/auth-cookies";
import { Button, Modal } from "react-bootstrap";

export default function TempRecipesPanel() {
  return (
    <div className="content">
      <p>Przepisy do akceptacji</p>
      <TempRecipes />
    </div>
  );
}

function TempRecipes() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const accessToken = getAuthTokenFromCookie();

  useEffect(function () {
    async function fetchRecipes() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/recipe/all-temporary`, {
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
      {recipes.length === 0 ? (
        <p>Brak nowych przepisów</p>
      ) : (
        recipes.map((element) => {
          return (
            <Recipe id={element.id_temporary_recipe} recipeData={element} />
          );
        })
      )}
    </>
  );
}

function Recipe({ id, recipeData }) {
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
      const res = await fetch(`http://localhost:4000/recipe/temporary/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
      `http://localhost:4000/recipe/delete-temporary-recipe/${id}`,
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

  const handleAcceptRecipe = async (id) => {
    const res = await fetch(
      `http://localhost:4000/recipe/accept-recipe/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
        {recipeData.title}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{recipeData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <Button onClick={() => handleAcceptRecipe(id)}>Zaakceptuj</Button>
              <Button onClick={() => handleDeleteRecipe(id)}>Usuń</Button>
            </div>
            <div className="col">
              <p>Składniki</p>
              {recipe.length > 0
                ? recipe.map((element) => {
                    return <p>{element.product.name}</p>;
                  })
                : ""}
            </div>
            <div className="col">
              <p>Przepis</p>
              <p>{recipeData.text}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
