import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../../cookies/auth-cookies";
import { useEffect, useState } from "react";

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
      {reports.length > 0
        ? reports.map((element) => {
            return (
              <div>
                <p>{element.text}</p>
                <p>{element.status}</p>
                <button
                  onClick={() => handleDeleteReport(element.id_report)}
                  className="btn btn-danger"
                >
                  Odrzuć
                </button>
                <button
                  onClick={() => handleAcceptReport(element.id_report)}
                  className="btn btn-warning"
                >
                  Blokuj
                </button>
              </div>
            );
          })
        : "Nie mażadnych zgłoszeń"}
    </div>
  );
}
