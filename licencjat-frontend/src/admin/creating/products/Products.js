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
      <a href="/create-product">Dodaj Produkt</a>
      <p>Produkty: </p>
      {products.map((element) => {
        return <p>{element.name}</p>;
      })}
    </div>
  );
}
