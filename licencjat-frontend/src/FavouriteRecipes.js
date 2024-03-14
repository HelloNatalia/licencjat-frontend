import { useEffect, useState } from "react";
import "./FavouriteRecipes.css";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import { useNavigate } from "react-router-dom";

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
      console.log(data);
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
      {favourites.map((element) => {
        return (
          <div>
            <p>{element.recipe.title} </p>
            <btn
              className="btn btn-danger"
              onClick={() => handleRemoveFavourite(element.recipe.id_recipe)}
            >
              Usuń z ulubionych
            </btn>
          </div>
        );
      })}
    </div>
  );
}
