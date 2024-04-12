import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../../cookies/auth-cookies";
import { useEffect, useState } from "react";
import "./Report.css";

export default function Reports() {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAuthTokenFromCookie();
  const navigation = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(function () {
    async function getReports() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/report/reports`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        if (res.status === 401) navigation("/login");
      }
      const data = await res.json();
      setReports(data);
      setIsLoading(false);
    }

    getReports();
  }, []);

  const handleDeleteReport = async (id) => {
    console.log(id);
    const res = await fetch(`http://localhost:4000/report/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });
    if (!res.ok) {
      if (res.status === 401) navigation("/login");
    }
    window.location.reload();
  };

  const handleAcceptReport = async (id) => {
    const res = await fetch(`http://localhost:4000/report/accept/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PATCH",
    });
    if (!res.ok) {
      if (res.status === 401) navigation("/login");
    }
    window.location.reload();
  };

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="content">
      <div className="container mb-3">
        <p className="fs-4 m-3">Zgłoszenia użytkowników</p>
        <div className="new-reports-div">
          <p className="fs-5">Nowe:</p>
          {reports.length > 0 ? (
            reports.map((element) => {
              if (element.status === "created") {
                return (
                  <NewReport
                    report={element}
                    handleDeleteReport={handleDeleteReport}
                    handleAcceptReport={handleAcceptReport}
                  />
                );
              }
            })
          ) : (
            <p>Nie ma nowych zgłoszeń</p>
          )}
        </div>
        <div className="accepted-reports mt-5">
          <p className="fs-5">Zaakceptowane (zablokowani użytkownicy):</p>
          {reports.length > 0 ? (
            reports.map((element) => {
              if (element.status === "accepted") {
                return (
                  <AcceptedReport
                    report={element}
                    handleDeleteReport={handleDeleteReport}
                  />
                );
              }
            })
          ) : (
            <p>Nie zaakceptowano jeszcze żadnego zgłoszenia</p>
          )}
        </div>
      </div>
    </div>
  );
}

function NewReport({ report, handleDeleteReport, handleAcceptReport }) {
  return (
    <div className="row my-3">
      <div className="col">
        <div className="report-box">
          <div className="row p-3">
            <div className="col-12 col-md-6">
              <p>
                <span className="text-grey">Zgłoszona osoba: </span>{" "}
                <a
                  className="text-decoration-none text-black fw-bold"
                  href={`/account?id=${report.user_reported.id}`}
                >
                  {report.user_reported.username}
                </a>
              </p>
              <p>
                <span className="text-grey">Treść zgłoszenia: </span>{" "}
                {report.text}
              </p>
            </div>
            <div className="col-12 col-md-6 p-3">
              <div className="d-flex">
                <span className="report-admin-buttons me-3 mt-1">
                  <button
                    onClick={() => handleDeleteReport(report.id_report)}
                    className="btn btn-warning me-3 text-white"
                  >
                    Odrzuć
                  </button>

                  <button
                    onClick={() => handleAcceptReport(report.id_report)}
                    className="btn btn-danger "
                  >
                    Blokuj
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AcceptedReport({ report, handleDeleteReport }) {
  return (
    <div className="row">
      <div className="col">
        <div className="report-box">
          <div className="row p-3">
            <div className="col-12 col-md-6">
              <p>
                <span className="text-grey">Zgłoszona osoba: </span>{" "}
                <a
                  className="text-decoration-none text-black fw-bold"
                  href={`/account?id=${report.user_reported.id}`}
                >
                  {report.user_reported.username}
                </a>
              </p>
              <p>
                <span className="text-grey">Treść zgłoszenia: </span>{" "}
                {report.text}
              </p>
            </div>
            <div className="col-12 col-md-6 p-3">
              <div className="d-flex">
                <span className="report-admin-buttons me-3 mt-1">
                  <button
                    onClick={() => handleDeleteReport(report.id_report)}
                    className="btn btn-warning me-3 text-white"
                  >
                    Odrzuć
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
