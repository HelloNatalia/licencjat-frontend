import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./SpecificAccount.css";
import { useEffect, useState } from "react";

export default function SpecificAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [idArgument, setIdArgument] = useState();
  const [userData, setUserData] = useState();
  const navigation = useNavigate();

  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    setIdArgument(id);
  }, []);

  useEffect(
    function () {
      async function fetchUserData() {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:4000/auth/user-data/${idArgument}`
        );
        const data = await res.json();
        if (!res.ok) {
          navigation("/announcements");
        }
        setUserData(data);
        setIsLoading(false);
      }
      if (idArgument) fetchUserData();
    },
    [idArgument]
  );

  if (isLoading) return <div className="content">Loading ...</div>;

  return (
    <div className="content">
      {idArgument}
      <p>{userData.username}</p>
      <p>{userData.name}</p>
    </div>
  );
}
