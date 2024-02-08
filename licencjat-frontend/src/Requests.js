import { useState } from "react";
import "./Requests.css";
import { Button } from "react-bootstrap";

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
              <Button className=" me-2 answer-request-btn positive-request-btn">
                ZOBACZ SZCZEGÓŁY
              </Button>
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
