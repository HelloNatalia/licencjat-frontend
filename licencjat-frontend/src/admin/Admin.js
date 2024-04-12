import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function Admin() {
  const navigation = useNavigate();

  const handleRedirect = (url) => {
    navigation(url);
  };

  return (
    <div className="content">
      <div className="container">
        <div className="row p-3">
          <p className="fs-3">Panel administracyjny</p>
          <div className="col-12 col-md-6 col-lg-4 p-3">
            <div
              onClick={() => handleRedirect("/recipes-panel")}
              className="module-box p-4"
            >
              <div className="module-content justify-content-center text-center">
                <img src="recipes.png" className="module-img" />
                <a href="/recipes-panel" className="ms-2">
                  Panel przepisów
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 p-3">
            <div
              onClick={() => handleRedirect("/reports")}
              className="module-box p-4"
            >
              <div className="module-content justify-content-center text-center">
                <img src="report.png" className="module-img" />
                <a href="/reports" className="ms-2">
                  Panel zgłoszeń
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 p-3">
            <div
              onClick={() => handleRedirect("/create-records")}
              className="module-box p-4"
            >
              <div className="module-content justify-content-center text-center">
                <img src="administration.png" className="module-img" />
                <a href="/create-records" className="ms-2">
                  Panel zarządzania
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
