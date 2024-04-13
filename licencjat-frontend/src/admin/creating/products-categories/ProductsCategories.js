import { useEffect, useState } from "react";

export default function ProductsCategories() {
  const [isLoading, setIsLoading] = useState(true);
  const [productsCategories, setProductsCategories] = useState([]);

  useEffect(function () {
    async function fetchProductsCategoriesList() {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:4000/product-category/category-list`
      );
      const data = await res.json();
      setProductsCategories(data);
      setIsLoading(false);
    }
    fetchProductsCategoriesList();
  }, []);

  if (isLoading) return <div className="content">Loading ...</div>;

  return (
    <div className="content">
      <div className="container p-2 px-3">
        <p className="fs-4 m-3">
          Kategorie produktów{" "}
          <a className="btn btn-success ms-4" href="/create-product-category">
            Dodaj kategorię produktów
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
                    {productsCategories.map((element) => {
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
