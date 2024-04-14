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
      <div className="container p-2 px-3">
        <p className="fs-4 m-3">
          Kategorie przepisów{" "}
          <a className="btn btn-success ms-4" href="/create-recipe-category">
            Dodaj kategorię przepisów
          </a>
        </p>
        <div className="row">
          <div className="col">
            <div className="info-box p-3">
              <div class="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Nazwa</th>
                      <th scope="col">Opis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipesCategories.map((element) => {
                      return (
                        <tr>
                          <th scope="row">{element.name}</th>
                          <td>{element.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
