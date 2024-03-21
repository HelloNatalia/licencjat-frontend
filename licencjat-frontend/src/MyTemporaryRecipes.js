import { useEffect, useState } from "react";
import "./MyTemporaryRecipes.css";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import { useNavigate } from "react-router-dom";

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
      {Array.isArray(recipes) && recipes.length > 0
        ? recipes.map((element) => {
            return <p>{element.title}</p>;
          })
        : "Pusto"}
    </div>
  );
}
