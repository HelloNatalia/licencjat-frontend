import { getAuthTokenFromCookie } from "../../cookies/auth-cookies";

export default function CreateRecords() {
  return (
    <div className="content">
      <div className="container">
        <div className="container p-2 px-3">
          <p className="fs-4 m-3">Zarządzanie zawartością aplikacji</p>
        </div>
      </div>
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
