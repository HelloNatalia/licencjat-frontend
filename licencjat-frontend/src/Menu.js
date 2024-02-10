import "./Menu.css";
import { NavLink } from "react-router-dom";

export default function Menu() {
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
        <hr className="mx-3 my-1 sidebar-divider" />
        <hr className="mx-3 mb-1 sidebar-bottom sidebar-divider" />
        <li className=" mb-2">
          <a href="#">
            <img src="user.png" className="mx-2" alt="user" />
            KONTO
          </a>
        </li>
      </ul>
    </nav>
  );
}
