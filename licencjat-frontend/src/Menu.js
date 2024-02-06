import "./Menu.css";

export default function Menu() {
  return (
    <nav id="sidebar" className="d-none d-lg-block">
      <ul className="list-unstyled sidebar">
        <hr className="mx-3 mb-1 sidebar-divider" />
        <li>
          <a href="#">STRONA GŁÓWNA</a>
        </li>
        <hr className="mx-3 my-1 sidebar-divider" />
        <li>
          <a href="#">OGŁOSZENIA</a>
        </li>
        <li>
          <a href="#">POWIADOMIENIA</a>
        </li>
        <li>
          <a href="#">MOJE OGŁOSZENIA</a>
        </li>
        <hr className="mx-3 my-1 sidebar-divider" />
        <li>
          <a href="#">PRZEPISY</a>
        </li>
        <li>
          <a href="#">WSKAZÓWKI</a>
        </li>
        <hr className="mx-3 my-1 sidebar-divider" />
        <hr className="mx-3 mb-1 sidebar-bottom sidebar-divider" />
        <li className=" mb-2">
          <a href="#">
            <img src="user.png" className="mx-2" />
            KONTO
          </a>
        </li>
      </ul>
    </nav>
  );
}
