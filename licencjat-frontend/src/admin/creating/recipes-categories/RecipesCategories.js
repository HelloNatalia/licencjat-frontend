import { useEffect, useState } from "react";

export default function RecipesCategories() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipesCategories, setRecipesCategories] = useState([]);

  useEffect(function () {
    async function fetchRecipesCategoriesList() {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:4000/recipe/recipes-categories`
      );
      const data = await res.json();
      setRecipesCategories(data);
      setIsLoading(false);
    }
    fetchRecipesCategoriesList();
  }, []);

  if (isLoading) return <div className="content">Loading ...</div>;

  return (
    <div className="content">
      <a href="/create-recipe-category">Dodaj Kategorię przepisu</a>
      <p>Kategorie przepisów: </p>
      {recipesCategories.map((element) => {
        return <p>{element.name}</p>;
      })}
    </div>
  );
}
