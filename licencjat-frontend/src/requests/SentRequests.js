import { useEffect, useState } from "react";
import { getAuthTokenFromCookie } from "../cookies/auth-cookies";
import { useNavigate } from "react-router-dom";
import { getDates } from "../Announcements/AnnouncementsMap";
import { Button } from "react-bootstrap";
import RatingModal from "../Rating";
import SeeDetails from "./RequestDetails";
import { fetchPhoto } from "../FetchPhoto";
import "./Requests.css";

export default function SentRequests() {
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

      if (data.length > 0) {
        // Definicja kolejności statusów
        const statusOrder = {
          accepted: 1,
          sent: 2,
          received: 3,
          reviewed: 4,
        };
        // Funkcja porównująca dla sortowania
        const compareStatus = (a, b) => {
          return statusOrder[a.status] - statusOrder[b.status];
        };
        // Sortowanie danych na podstawie statusów
        data.sort(compareStatus);
      }
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
          <b>
            <a
              className="text-decoration-none text-black"
              href={`/account?id=${announcement_user.id}`}
            >
              {announcement_user.username}
            </a>
          </b>
          .
        </span>
      );
      break;
    case "accepted":
      message = (
        <span>
          <b>
            <a
              className="text-decoration-none text-black"
              href={`/account?id=${announcement_user.id}`}
            >
              {announcement_user.username}
            </a>
          </b>{" "}
          zaakceptował/a Twoją prośbę.
        </span>
      );
      break;
    case "received":
    case "reviewed":
      message = (
        <span>
          Odebrano produkt od użytkownika{" "}
          <b>
            <a
              className="text-decoration-none text-black"
              href={`/account?id=${announcement_user.id}`}
            >
              {announcement_user.username}
            </a>
          </b>
          .
        </span>
      );
      break;
    default:
      break;
  }

  const date = getDates(announcement)[1];

  const [photoUrl, setPhotoUrl] = useState(null);
  let photoNamesArray = announcement.photos.slice(1, -1).split('","');
  photoNamesArray = photoNamesArray.map((name) => name.replace(/^"|"$/g, ""));
  useEffect(() => {
    fetchPhoto(photoNamesArray[0], setPhotoUrl);
  }, []);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className={"request-box d-flex"}>
      <div className="request-img d-none d-md-block me-3">
        <a href={`/announcement-page?id=${announcement.id_announcement}`}>
          <img src={photoUrl} alt="announcement" />
        </a>
      </div>
      <div>
        <div className="title-line d-flex">
          <a
            className="text-decoration-none text-black"
            href={`/announcement-page?id=${announcement.id_announcement}`}
          >
            <p>
              {announcement.title} &#183; {date}
            </p>
          </a>

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
