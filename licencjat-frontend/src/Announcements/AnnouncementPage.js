import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./AnnouncementPage.css";
import { useState, useEffect } from "react";
import { getDates } from "./AnnouncementsMap";
import RequestModal from "../requests/RequestForm";
import { getAuthTokenFromCookie } from "../cookies/auth-cookies";
import RatingStars from "../RatingStars";
import { fetchPhotos } from "../FetchPhoto";

export default function AnnouncementPage({ handleBack, id }) {
  const [selected_announcement, setSelectedAnnouncement] = useState(null);
  const accessToken = getAuthTokenFromCookie();

  const [showButton, setShowButton] = useState(true);
  const [createdRequest, setCreatedRequest] = useState("");

  useEffect(
    function () {
      async function fetchAnnouncement() {
        const res = await fetch(`http://localhost:4000/announcement/${id}`);

        const data = await res.json();
        setSelectedAnnouncement(data);
      }
      fetchAnnouncement();
    },
    [id]
  );

  useEffect(
    function () {
      async function checkRequest() {
        const res = await fetch(`http://localhost:4000/request/sent-requests`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) {
          if (res.status === 401) {
            setShowButton(true);
          }
        }
        const requests = await res.json();
        let requestExists = null;
        if (Array.isArray(requests)) {
          requestExists = requests.some((request) => {
            return (
              request.announcement.id_announcement ===
              selected_announcement.id_announcement
            );
          });
        }
        if (requestExists) setShowButton(false);
      }
      if (selected_announcement && accessToken) checkRequest();
    },
    [selected_announcement, createdRequest]
  );
  if (!selected_announcement) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Buttons
        handleBack={handleBack}
        selected_announcement={selected_announcement}
      />
      <div className="row px-4 pt-1 pb-4">
        <div className="col-12 col-md-6 mt-3">
          <Images selected_announcement={selected_announcement} />
        </div>
        <div className="col-12 col-md-6 mt-3">
          <MainInfo selected_announcement={selected_announcement} />
        </div>
        <div className="col-12 col-md-6 mt-3">
          {" "}
          <ProductInfo
            selected_announcement={selected_announcement}
            showButton={showButton}
            setCreatedRequest={setCreatedRequest}
          />
        </div>
        <div className="col-12 col-md-6 mt-3">
          <PickupInfo selected_announcement={selected_announcement} />
        </div>
      </div>
    </>
  );
}

function Buttons({ handleBack, selected_announcement }) {
  return (
    <>
      <div className="row d-flex mt-3 ms-2">
        <div className="col-5 col-md-3 mb-2">
          <Button className="back-btn btn-sm" onClick={() => handleBack()}>
            <i class="bi bi-caret-left"></i> POWRÓT
          </Button>
        </div>
        <div className="col">
          <div className="d-flex">
            <div className="btn btn-sm category-info px-3">
              {selected_announcement.product_category.name}
            </div>
            <div className="btn btn-sm product-info px-3 ms-2">
              {selected_announcement.product.name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Images({ selected_announcement }) {
  const [photoUrl, setPhotoUrl] = useState([]);
  let photoNamesArray = selected_announcement.photos.slice(1, -1).split('","');

  photoNamesArray = photoNamesArray.map((name) => name.replace(/^"|"$/g, ""));
  useEffect(() => {
    if (Array.isArray(photoNamesArray)) {
      fetchPhotos(photoNamesArray, setPhotoUrl);
    }
  }, []);
  return (
    <div className="img-box box">
      {photoUrl && Array.isArray(photoUrl) && photoUrl.length > 0
        ? photoUrl
            .slice(0, 2)
            .map((url, index) => <img key={index} src={url} />)
        : null}
    </div>
  );
}

export function MainInfo({ selected_announcement }) {
  return (
    <div className="box main-info justify-content-center py-3">
      <p className="announcement-title">{selected_announcement.title}</p>
      <a
        href={`/account?id=${selected_announcement.user.id}`}
        className="text-decoration-none text-black d-flex user justify-content-center align-items-center"
      >
        <div className="d-flex align-items-center">
          <img src="user.png" />
          <p className="fw-bold mt-3">{selected_announcement.user.username}</p>
        </div>

        <RatingStars userId={selected_announcement.user.id} />
      </a>
    </div>
  );
}

export function ProductInfo({
  selected_announcement,
  showButton,
  setCreatedRequest,
}) {
  const output = getDates(selected_announcement);
  const productDate = output[1];
  const [myAnnouncement, setMyAnnouncement] = useState(false);

  // check-if-your-announcement/:id
  const accessToken = getAuthTokenFromCookie();
  console.log("SPRAWDZAM: ");
  useEffect(function () {
    async function checkIfYourAnnouncement() {
      const res = await fetch(
        `http://localhost:4000/announcement/check-if-your-announcement/${selected_announcement.id_announcement}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        setMyAnnouncement(false);
        console.log("NIE MOJE");
      }

      const data = await res.json();
      if (data == false) {
        setMyAnnouncement(false);
        console.log("NIE MOJE");
      } else if (data == true) {
        setMyAnnouncement(true);
        console.log("MOJE");
      }
    }
    checkIfYourAnnouncement();
  }, []);

  return (
    <>
      <div className="box px-4 pt-4 pb-2">
        <div className="row">
          <div className="col-12">
            <div className="outlined-box description-product mb-3">
              {selected_announcement.description}
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12 d-flex">
            <img className="date-icon" src="date_icon.png" />
            <p className="ms-3 mt-2">
              Data ważności: <span className="fw-bold">{productDate}</span>
            </p>
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div className="col text-center">
            <a href="#">
              {myAnnouncement ? (
                <Button className="btn btn-primary pickup-btn disabled">
                  TO TWOJE OGŁOSZENIE
                </Button>
              ) : showButton ? (
                <RequestModal
                  announcement={selected_announcement}
                  setCreatedRequest={setCreatedRequest}
                />
              ) : (
                <Button className="btn btn-primary pickup-btn disabled">
                  PROŚBA ZOSTAŁA WYSŁANA
                </Button>
              )}
              {/* {showButton ? (
                <RequestModal
                  announcement={selected_announcement}
                  setCreatedRequest={setCreatedRequest}
                />
              ) : (
                <Button className="btn btn-primary pickup-btn disabled">
                  PROŚBA ZOSTAŁA WYSŁANA
                </Button>
              )} */}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function PickupInfo({ selected_announcement }) {
  const datesAndHours = JSON.parse(selected_announcement.available_dates);
  console.log(datesAndHours);

  return (
    <>
      <div className="box px-4 pt-4 pb-4">
        <div className="row">
          <div className="col-12">
            <div className="outlined-box pickup-details pb-2">
              <p className="fs-5">Gdzie odebrać?</p>
              <div className="d-flex localization">
                <img className="localization-icon" src="area.png" />
                <p className="mt-2 ms-3">
                  Dzielnica:{" "}
                  <span className="fw-bold ms-1">
                    {selected_announcement.district}
                  </span>
                </p>
              </div>
              <div className="d-flex localization mt-2">
                <img className="localization-icon" src="street.png" />
                <p className="mt-2 ms-3">
                  Ulica:{" "}
                  <span className="fw-bold ms-1">
                    {selected_announcement.street}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <div className="outlined-box pickup-details pb-2">
              <p className="fs-5">Kiedy odebrać?</p>
              {datesAndHours.map((element) => {
                return (
                  <div className="d-flex datetime mt-2">
                    <img className="datetime-icon" src="calendar.png" />
                    <p className="mt-2 ms-3">{element.date}</p>
                    <p className="hours mt-1">
                      {element.hours[0]} - {element.hours[1]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
