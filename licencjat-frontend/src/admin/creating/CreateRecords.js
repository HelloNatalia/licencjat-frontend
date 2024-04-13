import { getAuthTokenFromCookie } from "../../cookies/auth-cookies";

export default function CreateRecords() {
  return (
    <div className="content">
      <div className="container">
        <div className="container p-2 px-3">
          <p className="fs-4 m-3">Zarządzanie zawartością aplikacji</p>
          <div className="row">
            <div className="col-12 my-2">
              <a className="text-decoration-none text-black" href="/products">
                <div className="info-box p-3">
                  <p className="fs-4 my-1">
                    Produkty <i class="bi bi-arrow-right-circle ms-4"></i>
                  </p>
                </div>
              </a>
            </div>
            <div className="col-12 my-2">
              <a
                className="text-decoration-none text-black"
                href="/products-categories"
              >
                <div className="info-box p-3">
                  <p className="fs-4 my-1">
                    Kategorie produktów{" "}
                    <i class="bi bi-arrow-right-circle ms-4"></i>
                  </p>
                </div>
              </a>
            </div>
            <div className="col-12 my-2">
              <a
                className="text-decoration-none text-black"
                href="/recipes-categories"
              >
                <div className="info-box p-3">
                  <p className="fs-4 my-1">
                    Kategorie przepisów{" "}
                    <i class="bi bi-arrow-right-circle ms-4"></i>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
