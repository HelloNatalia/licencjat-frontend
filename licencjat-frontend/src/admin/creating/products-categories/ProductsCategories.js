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
      <a href="/create-product-category">Dodaj Kategorię produktu</a>
      <p>Kategorie produktów: </p>
      {productsCategories.map((element) => {
        return <p>{element.name}</p>;
      })}
    </div>
  );
}
