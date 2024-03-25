import "./Menu.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";

export default function Menu() {
  const accessToken = getAuthTokenFromCookie();
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function fetchUserData() {
        try {
          const res = await fetch("http://localhost:4000/auth/user-data", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (res.status === 401) setUserData("");
          const data = await res.json();
          setUserData(data);
          console.log(userData);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      if (accessToken) {
        fetchUserData();
      } else {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  return (
    <nav id="sidebar" className="d-none d-lg-block">
      <ul className="list-unstyled sidebar">
        <hr className="mx-3 mb-1 sidebar-divider" />
        <li>
          <NavLink exact to="/" activeClassName="active">
            STRONA GŁÓWNA
          </NavLink>
        </li>
        <hr className="mx-3 my-1 sidebar-divider" />
        <li>
          <NavLink to="/announcements" activeClassName="active">
            OGŁOSZENIA
          </NavLink>
        </li>
        <li>
          <NavLink to="/requests" activeClassName="active">
            POWIADOMIENIA
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-announcements" activeClassName="active">
            MOJE OGŁOSZENIA
          </NavLink>
        </li>
        <hr className="mx-3 my-1 sidebar-divider" />
        <li>
          <NavLink to="/recipes" activeClassName="active">
            PRZEPISY
          </NavLink>
        </li>
        <li>
          <a href="#">WSKAZÓWKI</a>
        </li>
        <li>
          {!isLoading &&
            userData !== "" &&
            userData.roles.includes("admin") && (
              <NavLink to="/admin" activeClassName="active">
                PANEL ZARZĄDZANIA
              </NavLink>
            )}
        </li>
        <hr className="mx-3 my-1 sidebar-divider" />
        <hr className="mx-3 mb-1 sidebar-bottom sidebar-divider" />
        <li className=" mb-2">
          <a href="#">
            <img src="user.png" className="mx-2" alt="user" />

            {isLoading ? (
              <NavLink to="/login">KONTO</NavLink>
            ) : userData !== "" ? (
              <NavLink to="/my-account">{userData.username}</NavLink>
            ) : (
              <NavLink to="/login">KONTO</NavLink>
            )}
          </a>
        </li>
      </ul>
    </nav>
  );
}
