import { useState } from "react";
import "./Requests.css";
import { Button, Modal } from "react-bootstrap";

export default function Requests() {
  const [selectedRequestsType, setSelectedRequestsType] = useState("received");
  const handleRequestsTypeChange = (type) => setSelectedRequestsType(type);

  return (
    <div className="content">
      <RequestsButton
        selectedRequestsType={selectedRequestsType}
        handleRequestsTypeChange={handleRequestsTypeChange}
      />
      {selectedRequestsType == "received" ? (
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
      <div className="col-12 mt-3">
        <ReceivedRequest status={"sent"} />
      </div>
      <div className="col-12 mt-3">
        <ReceivedRequest status={"accepted"} />
      </div>
      <div className="col-12 mt-3">
        <ReceivedRequest status={"collected"} />
      </div>
      <div className="col-12 mt-3">
        <ReceivedRequest status={"reviewed"} />
      </div>
    </div>
  );
}

function SentRequests() {
  return (
    <div className="row mx-3">
      <div className="col-12 mt-3">
        <SentRequest status={"sent"} />
      </div>
      <div className="col-12 mt-3">
        <SentRequest status={"accepted"} />
      </div>
      <div className="col-12 mt-3">
        <SentRequest status={"collected"} />
      </div>
      <div className="col-12 mt-3">
        <SentRequest status={"reviewed"} />
      </div>
    </div>
  );
}

function ReceivedRequest({ status }) {
  var message = "";
  switch (status) {
    case "sent":
      message = (
        <span>
          Użytkownik <b>Anna12</b> chce zarezerwować Twój produkt.
        </span>
      );
      break;
    case "accepted":
      message = (
        <span>
          Twój produkt jest zarezerwowany dla <b>Anna12</b>.
        </span>
      );
      break;
    case "collected":
    case "reviewed":
      message = (
        <span>
          Oddano produkt użytkownikowi <b>Anna12</b>.
        </span>
      );
      break;
    default:
      break;
  }

  return (
    <div className="request-box d-flex">
      <div className="request-img d-none d-md-block me-3">
        <img src="announcement-img/1.png" />
      </div>
      <div>
        <div className="d-flex">
          <p>Makaron pełnoziarnisty &#183; 15.02.2024</p>
          {status === "accepted" && (
            <div className="booked-icon">
              <i class="bi bi-check-circle text-success"></i>
            </div>
          )}
          {(status === "collected" || status === "reviewed") && (
            <div className="booked-icon">
              <i class="bi bi-check-circle-fill text-success"></i>
            </div>
          )}
        </div>

        <p>{message}</p>
        <div>
          {status === "sent" && (
            <>
              <Button className=" me-2 answer-request-btn positive-request-btn">
                ZAREZERWUJ
              </Button>
              <Button className="answer-request-btn negative-request-btn">
                ODRZUĆ
              </Button>
            </>
          )}
          {status === "accepted" && (
            <>
              <Button className=" me-2 answer-request-btn positive-request-btn">
                OZNACZ JAKO ODEBRANE
              </Button>
              <Button className="answer-request-btn negative-request-btn">
                USUŃ REZERWACJĘ
              </Button>
            </>
          )}
          {status === "collected" && (
            <>
              <Button className=" me-2 answer-request-btn opinion-request-btn">
                WYSTAW OPINIĘ UŻYTKOWNIKOWI
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
        </div>
      </div>
    </div>
  );
}

function SentRequest({ status }) {
  var message = "";
  switch (status) {
    case "sent":
      message = (
        <span>
          Prośba została wysłana do użytkownika <b>Anna12</b>.
        </span>
      );
      break;
    case "accepted":
      message = (
        <span>
          <b>Anna12</b> zaakceptował/a Twoją prośbę.
        </span>
      );
      break;
    case "collected":
    case "reviewed":
      message = (
        <span>
          Odebrano produkt od użytkownika <b>Anna12</b>.
        </span>
      );
      break;
    default:
      break;
  }

  return (
    <div className={"request-box d-flex"}>
      <div className="request-img d-none d-md-block me-3">
        <img src="announcement-img/1.png" />
      </div>
      <div>
        <div className="title-line d-flex">
          <p>Makaron pełnoziarnisty &#183; 15.02.2024</p>
          {status === "accepted" && (
            <div className="booked-icon">
              <i class="bi-check-circle text-success"></i>
            </div>
          )}
          {(status === "collected" || status === "reviewed") && (
            <div className="booked-icon">
              <i class="bi bi-check-circle-fill text-success"></i>
            </div>
          )}
        </div>

        <p>{message}</p>
        <div>
          {status === "sent" && (
            <>
              <Button className="me-2 answer-request-btn negative-request-btn">
                ANULUJ PROŚBĘ
              </Button>
            </>
          )}
          {status === "accepted" && (
            <>
              <SeeDetails />
              <Button className="answer-request-btn negative-request-btn">
                ANULUJ REZERWACJĘ
              </Button>
            </>
          )}
          {status === "collected" && (
            <>
              <Button className=" me-2 answer-request-btn opinion-request-btn">
                WYSTAW OPINIĘ UŻYTKOWNIKOWI
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

function SeeDetails() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <p className="modal-title mb-0">Makaron pełnoziarnisty</p>
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
                        <b>Anna12</b>
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
                        <b>123 456 789</b>
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
                      <span className="ms-2 modal-date">15.02.2024</span>
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

                      <p className="mt-2 ms-3">10.12 Niedziela</p>
                      <p className="hours mt-1">11:00 - 12:00</p>
                    </div>
                    <div className="d-flex datetime mt-2">
                      <img
                        className="datetime-icon"
                        src="calendar.png"
                        alt="ikona kalendarza"
                      />

                      <p className="mt-2 ms-3">10.12 Niedziela</p>
                      <p className="hours mt-1">11:00 - 12:00</p>
                    </div>
                    <div className="d-flex datetime mt-2">
                      <img
                        className="datetime-icon"
                        src="calendar.png"
                        alt="ikona kalendarza"
                      />

                      <p className="mt-2 ms-3">10.12 Niedziela</p>
                      <p className="hours mt-1">11:00 - 12:00</p>
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
                        <span className="fw-bold ms-1">Pomorzany</span>
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
                          Powstańców Wielkopolskich
                        </span>
                      </p>
                    </div>
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
