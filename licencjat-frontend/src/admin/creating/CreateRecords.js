import { getAuthTokenFromCookie } from "../../cookies/auth-cookies";

export default function CreateRecords() {
  return (
    <div className="content">
      <p>
        <a href="/products">Produkty</a>
      </p>
      <p>
        <a href="/products-categories">Kategorie produktów</a>
      </p>
      <p>
        <a href="/recipes-categories">Kategorie przepisów</a>
      </p>
    </div>
  );
}
