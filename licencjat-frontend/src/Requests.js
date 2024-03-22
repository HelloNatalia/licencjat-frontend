import { useEffect, useState } from "react";
import "./Requests.css";
import { Button, Modal } from "react-bootstrap";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import { useNavigate } from "react-router-dom";
import { getDates } from "./AnnouncementsMap";
import RatingModal from "./Rating";

export default function Requests() {
  const [selectedRequestsType, setSelectedRequestsType] = useState("received");
  const handleRequestsTypeChange = (type) => setSelectedRequestsType(type);

  return (
    <div className="content">
      <RequestsButton
        selectedRequestsType={selectedRequestsType}
        handleRequestsTypeChange={handleRequestsTypeChange}
      />
      {selectedRequestsType === "received" ? (
        <ReceivedRequests />
      ) : (
        <SentRequests />
      )}
    </div>
  );
}

function RequestsButton({ selectedRequestsType, handleRequestsTypeChange }) {
  return (
    <div className="row mt-3 ms-0 ms-md-2">
      <div className="col-6 col-sm-4 col-md-3">
        <Button
          className={
            "request-btn " +
            (selectedRequestsType === "sent" ? "request-btn-nonactive" : "")
          }
          onClick={() => handleRequestsTypeChange("received")}
        >
          OTRZYMANE
        </Button>
      </div>
      <div className="col-6 col-sm-4 col-md-3">
        <Button
          className={
            "request-btn " +
            (selectedRequestsType === "received" ? "request-btn-nonactive" : "")
          }
          onClick={() => handleRequestsTypeChange("sent")}
        >
          WYSŁANE
        </Button>
      </div>
    </div>
  );
}

function ReceivedRequests() {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const accessToken = getAuthTokenFromCookie();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(function () {
    async function fetchReceivedRequests() {
      const res = await fetch(
        `http://localhost:4000/request/received-requests`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        if (res.status === 401) navigation("/login");
      }
      const data = await res.json();
      setReceivedRequests(data);
      setIsLoading(false);
    }
    fetchReceivedRequests();
  }, []);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="row mx-3">
      <div className="col-12 mt-3">
        <ReceivedMessage
          message={
            <span>
              Użytkownik <b>Anna12</b> usunął Twoją rezerwację dotyczącą{" "}
              <b>Makaron pełnoziarnisty</b>
            </span>
          }
        />
      </div>

      {receivedRequests.map((element) => {
        const announcement = element.announcement;
        const request_user = element.id_user_request;
        return (
          <div className="col-12 mt-3">
            <ReceivedRequest
              status={element.status}
              announcement={announcement}
              request_user={request_user}
              request={element}
            />
          </div>
        );
      })}
    </div>
  );
}

function SentRequests() {
  const [sentRequests, setSentRequests] = useState([]);
  const accessToken = getAuthTokenFromCookie();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(function () {
    async function fetchSentRequests() {
      const res = await fetch(`http://localhost:4000/request/sent-requests`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        if (res.status === 401) navigation("/login");
      }
      const data = await res.json();
      setSentRequests(data);
      setIsLoading(false);
    }
    fetchSentRequests();
  }, []);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="row mx-3">
      {sentRequests.map((element) => {
        const announcement = element.announcement;
        const announcement_user = element.id_user_announcement;
        return (
          <div className="col-12 mt-3">
            <SentRequest
              status={element.status}
              announcement={announcement}
              announcement_user={announcement_user}
              request={element}
            />
          </div>
        );
      })}
    </div>
  );
}

function ReceivedRequest({ status, announcement, request_user, request }) {
  const navigation = useNavigate();
  const accessToken = getAuthTokenFromCookie();
  const [isLoading, setIsLoading] = useState(true);
  const [canRate, setCanRate] = useState(true);

  useEffect(function () {
    async function checkIfCanRate() {
      const postData = { user_to_rate: request_user.id };
      const res = await fetch(
        `http://localhost:4000/rating/check-if-can-rate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      if (!res.ok) {
        if (res.status === 401) navigation("/login");
      }
      const data = await res.json();
      console.log("Zwrócono: ", data);
      setCanRate(data.can_rate);
      setIsLoading(false);
    }
    checkIfCanRate();
  }, []);

  const handleChangeStatus = async (type) => {
    const status = { status: type };

    const res = await fetch(
      `http://localhost:4000/request/change-status/${request.id_request}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      }
    );
    console.log(res.status);
    if (!res.ok) {
      if (res.status === 401) navigation("/login");
      else {
        throw new Error("Something went wrong");
      }
    }
    window.location.reload();
  };

  const handleDelete = async () => {
    const accessToken = getAuthTokenFromCookie();
    const res = await fetch(
      `http://localhost:4000/request/${request.id_request}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.status);
    if (!res.ok) {
      if (res.status === 401) navigation("/login");
      else {
        throw new Error("Something went wrong");
      }
    }
    window.location.reload();
  };

  var message = "";
  switch (status) {
    case "sent":
      message = (
        <span>
          Użytkownik <b>{request_user.username}</b> chce zarezerwować Twój
          produkt.
        </span>
      );
      break;
    case "accepted":
      message = (
        <span>
          Twój produkt jest zarezerwowany dla <b>{request_user.username}</b>.
        </span>
      );
      break;
    case "received":
    case "reviewed":
      message = (
        <span>
          Oddano produkt użytkownikowi <b>{request_user.username}</b>.
        </span>
      );
      break;
    default:
      break;
  }

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="request-box d-flex">
      <div className="request-img d-none d-md-block me-3">
        <img src="announcement-img/1.png" alt="announcement" />
      </div>
      <div>
        <div className="d-flex">
          <p>
            {announcement.title} &#183; {getDates(announcement)[1]}
          </p>
          {status === "accepted" && (
            <div className="booked-icon">
              <i class="bi bi-check-circle text-success"></i>
            </div>
          )}
          {(status === "received" || status === "reviewed") && (
            <div className="booked-icon">
              <i class="bi bi-check-circle-fill text-success"></i>
            </div>
          )}
        </div>

        <p>{message}</p>
        <div>
          {status === "sent" && (
            <>
              <Button
                onClick={() => handleChangeStatus("accepted")}
                className=" me-2 answer-request-btn positive-request-btn"
              >
                ZAREZERWUJ
              </Button>
              <Button
                onClick={handleDelete}
                className="answer-request-btn negative-request-btn"
              >
                ODRZUĆ
              </Button>
            </>
          )}
          {status === "accepted" && (
            <>
              <Button
                onClick={() => handleChangeStatus("received")}
                className=" me-2 answer-request-btn positive-request-btn"
              >
                OZNACZ JAKO ODEBRANE
              </Button>
              <Button
                onClick={handleDelete}
                className="answer-request-btn negative-request-btn"
              >
                USUŃ REZERWACJĘ
              </Button>
            </>
          )}
          {status === "received" && canRate === true && (
            <>
              <RatingModal
                userRated={request_user.id}
                requestId={request.id_request}
              />
            </>
          )}
          {status === "received" && canRate === false && (
            <>
              <Button className=" me-2 answer-request-btn reviewed-request-btn">
                WYSTAWIONO OPINIĘ
              </Button>
            </>
          )}
          {status === "reviewed" && (
            <>
              <Button className=" me-2 answer-request-btn reviewed-request-btn">
                WYSTAWIONO OPINIĘ
              </Button>
            </>
          )}
          <p className="pickup-data d-inline">
            Data odbioru: {getDates(request)[1]} &#183; {request.hour}
          </p>
        </div>
      </div>
    </div>
  );
}

function SentRequest({ status, announcement, announcement_user, request }) {
  const navigation = useNavigate();

  const accessToken = getAuthTokenFromCookie();
  const [isLoading, setIsLoading] = useState(true);
  const [canRate, setCanRate] = useState(true);

  useEffect(function () {
    async function checkIfCanRate() {
      const postData = { user_to_rate: announcement_user.id };
      const res = await fetch(
        `http://localhost:4000/rating/check-if-can-rate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      if (!res.ok) {
        if (res.status === 401) navigation("/login");
      }
      const data = await res.json();
      console.log("Zwrócono: ", data);
      setCanRate(data.can_rate);
      setIsLoading(false);
    }
    checkIfCanRate();
  }, []);

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:4000/request/${request.id_request}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.status);
    if (!res.ok) {
      if (res.status === 401) navigation("/login");
      else {
        throw new Error("Something went wrong");
      }
    }
    window.location.reload();
  };
  var message = "";
  switch (status) {
    case "sent":
      message = (
        <span>
          Prośba została wysłana do użytkownika{" "}
          <b>{announcement_user.username}</b>.
        </span>
      );
      break;
    case "accepted":
      message = (
        <span>
          <b>{announcement_user.username}</b> zaakceptował/a Twoją prośbę.
        </span>
      );
      break;
    case "received":
    case "reviewed":
      message = (
        <span>
          Odebrano produkt od użytkownika <b>{announcement_user.username}</b>.
        </span>
      );
      break;
    default:
      break;
  }

  const date = getDates(announcement)[1];

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className={"request-box d-flex"}>
      <div className="request-img d-none d-md-block me-3">
        <img src="announcement-img/1.png" alt="announcement" />
      </div>
      <div>
        <div className="title-line d-flex">
          <p>
            {announcement.title} &#183; {date}
          </p>

          {status === "accepted" && (
            <div className="booked-icon">
              <i class="bi-check-circle text-success"></i>
            </div>
          )}
          {(status === "received" || status === "reviewed") && (
            <div className="booked-icon">
              <i class="bi bi-check-circle-fill text-success"></i>
            </div>
          )}
        </div>

        <p>{message}</p>
        <div>
          {status === "sent" && (
            <>
              <Button
                onClick={handleDelete}
                className="me-2 answer-request-btn negative-request-btn"
              >
                ANULUJ PROŚBĘ
              </Button>
            </>
          )}
          {status === "accepted" && (
            <>
              <SeeDetails
                announcement={announcement}
                announcement_user={announcement_user}
                request={request}
              />
              <Button
                onClick={handleDelete}
                className="answer-request-btn negative-request-btn"
              >
                ANULUJ REZERWACJĘ
              </Button>
            </>
          )}
          {status === "received" && canRate === true && (
            <>
              <RatingModal
                userRated={announcement_user.id}
                requestId={request.id_request}
              />
            </>
          )}
          {status === "received" && canRate === false && (
            <>
              <Button className=" me-2 answer-request-btn reviewed-request-btn">
                WYSTAWIONO OPINIĘ
              </Button>
            </>
          )}
          {status === "reviewed" && (
            <>
              <Button className=" me-2 answer-request-btn reviewed-request-btn">
                WYSTAWIONO OPINIĘ
              </Button>
            </>
          )}
          <p className="pickup-data d-inline">
            Data odbioru: {getDates(request)[1]} &#183; {request.hour}
          </p>
        </div>
      </div>
    </div>
  );
}

function ReceivedMessage({ message }) {
  return (
    <div className="message-box d-flex">
      <p className="mb-0">{message}</p>
      <p className="mb-0 close-btn">
        <i class="bi bi-x-lg"></i>
      </p>
    </div>
  );
}

function SeeDetails({ announcement, announcement_user, request }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const link = "https://www.google.com/maps?q=" + announcement.coordinates;

  return (
    <>
      <Button
        className="me-2 answer-request-btn positive-request-btn"
        variant="primary"
        onClick={handleShow}
      >
        ZOBACZ SZCZEGÓŁY
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <p className="modal-title mb-0">{announcement.title}</p>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-lg-6 pe-3">
              <div className="row">
                <div className="col-12 modal-img-box text-center">
                  <img src="announcement-img/1.png" alt="produkt" />
                </div>
                <div className="col-12">
                  <div className="my-3 outlined-box">
                    <div className="mt-2 d-flex justify-content-center pe-4">
                      <img className="user-img" src="user.png" alt="user" />
                      <p className="ms-2 mt-3">
                        <b>{announcement_user.username}</b>
                      </p>
                    </div>
                    <div className="d-flex mt-3 ms-3 pe-4 justify-content-center">
                      <div className="mb-3">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                      </div>
                      <p className="ms-1 stars">(15 ocen)</p>
                    </div>
                    <div className="my-3 d-flex justify-content-center pe-4">
                      <i class="bi bi-telephone-fill me-2"></i>
                      <p>
                        <b>{announcement_user.phone_number}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ps-3 col-12 col-lg-6">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3 outlined-box text-center">
                    <p className="mt-2">
                      Data ważności:{" "}
                      <span className="ms-2 modal-date">
                        {announcement.date.split("T")[0]}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="outlined-box pickup-details pb-2">
                    <p className="fs-5">Kiedy odebrać?</p>
                    <div className="d-flex datetime mt-2">
                      <img
                        className="datetime-icon"
                        src="calendar.png"
                        alt="ikona kalendarza"
                      />

                      <p className="mt-2 ms-3">{request.date.split("T")[0]}</p>
                      <p className="hours mt-1">{request.hour}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mt-3 outlined-box pickup-details pb-2">
                    <p className="fs-5">Gdzie odebrać?</p>
                    <div className="d-flex localization">
                      <img
                        className="localization-icon"
                        src="area.png"
                        alt="ikona lokalizacji"
                      />
                      <p className="mt-2 ms-3">
                        Dzielnica:{" "}
                        <span className="fw-bold ms-1">
                          {announcement.district}, {announcement.city}
                        </span>
                      </p>
                    </div>
                    <div className="d-flex localization mt-2">
                      <img
                        className="localization-icon"
                        src="street.png"
                        alt="ikona lokalizacji"
                      />
                      <p className="mt-2 ms-3">
                        Ulica:{" "}
                        <span className="fw-bold ms-1">
                          {announcement.street} {announcement.number}
                        </span>
                      </p>
                    </div>
                    <a href={link} target="_blank">
                      <p>Pokaż na mapie</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
