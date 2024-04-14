import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../cookies/auth-cookies";
import { Button, Modal } from "react-bootstrap";
import { fetchPhoto } from "../helpers/FetchPhoto";
import "./RecipePanel.css";

export default function TempRecipesPanel() {
  return (
    <div className="content">
      <div className="container mb-4">
        <p className="fs-4 m-3">Przepisy do akceptacji</p>
        <TempRecipes />
      </div>
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
        <p className="ms-3">Brak nowych przepisów</p>
      ) : (
        recipes.map((element) => {
          return (
            <div className="row m-1 mt-4">
              <div className="col">
                <Recipe id={element.id_temporary_recipe} recipeData={element} />
              </div>
            </div>
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

  const [photoUrl, setPhotoUrl] = useState(null);
  useEffect(() => {
    let photoNamesArray = recipeData.photos.slice(1, -1).split('","');
    photoNamesArray = photoNamesArray.map((name) => name.replace(/^"|"$/g, ""));
    fetchPhoto(photoNamesArray[0], setPhotoUrl);
  }, [recipeData]);

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
                <p>{recipeData.title}</p>

                <Button
                  onClick={() => handleAcceptRecipe(id)}
                  className="btn-sm btn-admin-recipe-accept m-2"
                >
                  Zaakceptuj
                </Button>
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
            {recipeData.title}{" "}
            <Button
              onClick={() => handleAcceptRecipe(id)}
              className="btn-sm btn-admin-recipe-accept m-2"
            >
              Zaakceptuj
            </Button>
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
              <p>{recipeData.text}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>

    // <>
    //   <Button
    //     className="me-2 answer-request-btn opinion-request-btn"
    //     onClick={handleShow}
    //   >
    //     {recipeData.title}
    //   </Button>

    //   <Modal show={show} onHide={handleClose}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>{recipeData.title}</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <div className="row">
    //         <div className="col">
    //           <Button onClick={() => handleAcceptRecipe(id)}>Zaakceptuj</Button>
    //           <Button onClick={() => handleDeleteRecipe(id)}>Usuń</Button>
    //         </div>
    //         <div className="col">
    //           <p>Składniki</p>
    //           {recipe.length > 0
    //             ? recipe.map((element) => {
    //                 return <p>{element.product.name}</p>;
    //               })
    //             : ""}
    //         </div>
    //         <div className="col">
    //           <p>Przepis</p>
    //           <p>{recipeData.text}</p>
    //         </div>
    //       </div>
    //     </Modal.Body>
    //   </Modal>
    // </>
  );
}
