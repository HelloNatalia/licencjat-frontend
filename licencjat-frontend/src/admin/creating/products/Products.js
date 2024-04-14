import { useEffect, useState } from "react";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(function () {
    async function fetchProductsList() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/product/product-list`);
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    }
    fetchProductsList();
  }, []);

  if (isLoading) return <div className="content">Loading ...</div>;

  return (
    <div className="content">
      <div className="container p-2 px-3">
        <p className="fs-4 m-3">
          Produkty{" "}
          <a className="btn btn-success ms-4" href="/create-product">
            Dodaj produkt
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
                      <th scope="col">Kategoria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((element) => {
                      return (
                        <tr>
                          <th scope="row">{element.name}</th>
                          <td>{element.description}</td>
                          <td>{element.product_category.name}</td>
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
