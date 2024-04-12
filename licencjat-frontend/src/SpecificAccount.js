import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./SpecificAccount.css";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";

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
      <ReportModal userReported={userData.id} />
      <Ratings userId={userData.id} />
    </div>
  );
}

function ReportModal({ userReported }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="pickup-btn" variant="primary" onClick={handleShow}>
        Zgłoś użytkownika
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Zgłoszenie użytkownika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReportForm handleClose={handleClose} userReported={userReported} />
        </Modal.Body>
      </Modal>
    </>
  );
}

function ReportForm({ userReported }) {
  const [reportText, setReportText] = useState();
  const navigation = useNavigate();

  const handleChangeText = (event) => {
    setReportText(event.target.value);
  };

  const handleSendReport = async () => {
    const accessToken = getAuthTokenFromCookie();
    const reportData = {
      user_report: userReported,
      text: reportText,
    };
    try {
      const response = await fetch("http://localhost:4000/report/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        if (response.status === 404) return "not found";
        if (response.status === 401) navigation("/login");
        else throw new Error("Wystąpił błąd");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <>
      <label for="report-text" class="form-label">
        Treść zgłoszenia:
      </label>
      <textarea
        id="report-text"
        rows="4"
        cols="50"
        className="form-control"
        onChange={handleChangeText}
        required
      />
      <button className="mt-3 btn btn-primary" onClick={handleSendReport}>
        Wyślij zgłoszenie
      </button>
    </>
  );
}

function Ratings({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState([]);

  useEffect(function () {
    async function fetchUserRatings() {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:4000/rating/user-ratings/${userId}`
      );
      const data = await res.json();
      setRatings(data);
      setIsLoading(false);
    }
    fetchUserRatings();
  }, []);

  return (
    <div className="bg-light">
      <p>Opinie</p>
      {ratings.map((element) => {
        return (
          <div>
            <p>{element.score}</p>
            <p>{element.text}</p>
          </div>
        );
      })}
    </div>
  );
}
