import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./SpecificAccount.css";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import { GenerateRatingStars } from "./RatingStars";
import RatingStars from "./RatingStars";

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
      <div className="container">
        <div className="row mt-3 mb-2">
          <div className="col">
            <div className="info-box">
              <div className="row p-3">
                <div className="col">
                  <div className="report-user-button-div-sm d-md-none">
                    <ReportModal userReported={userData.id} />
                  </div>
                  <div className="d-flex">
                    <p className="fw-bold fs-3 mt-2">{userData.username} </p>
                    <RatingStars userId={userData.id} />
                    <div className="report-user-button-div d-none d-md-block">
                      <ReportModal userReported={userData.id} />
                    </div>
                  </div>

                  <p>
                    <span className="text-grey">Imię:</span> {userData.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col">
            <div className="info-box">
              <div className="row p-3">
                <div className="col">
                  <p className="fs-5">Opinie</p>
                </div>
              </div>
              <Ratings userId={userData.id} />
            </div>
          </div>
        </div>
      </div>
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
        <i class="bi bi-flag-fill"></i>
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
      <button
        className="mt-3 btn btn-success green-button"
        onClick={handleSendReport}
      >
        Wyślij zgłoszenie
      </button>
    </>
  );
}

export function Ratings({ userId }) {
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="row p-3 pt-0">
      {ratings.map((element) => {
        return (
          <div className="col-12 col-md-4 col-lg-3">
            <div className="rating-box p-2">
              <p>
                <i class="bi bi-person-circle me-2"></i>
                {element.user_created.username}
                <span className="ms-3 text-stars">
                  <GenerateRatingStars rating={element.score} /> (
                  {element.score})
                </span>
              </p>
              <p>{element.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
