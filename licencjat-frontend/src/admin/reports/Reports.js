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

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="content">
      {reports.length > 0
        ? reports.map((element) => {
            return <div>{element.text}</div>;
          })
        : "Nie mażadnych zgłoszeń"}
    </div>
  );
}
