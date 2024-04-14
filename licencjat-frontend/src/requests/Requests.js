import { useEffect, useState } from "react";
import "./Requests.css";
import { Button, Modal } from "react-bootstrap";
import { getAuthTokenFromCookie } from "../cookies/auth-cookies";
import { useNavigate } from "react-router-dom";
import { getDates } from "../Announcements/AnnouncementsMap";
import RatingModal from "../Rating";
import { fetchPhoto } from "../FetchPhoto";
import RatingStars from "../RatingStars";
import SeeDetails from "./RequestDetails";
import SentRequests from "./SentRequests";
import ReceivedRequests from "./ReceivedRequests";

export default function Requests() {
  const [selectedRequestsType, setSelectedRequestsType] = useState("received");
  const handleRequestsTypeChange = (type) => setSelectedRequestsType(type);

  return (
    <div className="content mb-3">
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
