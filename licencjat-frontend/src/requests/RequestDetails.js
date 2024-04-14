import { useEffect, useState } from "react";
import { fetchPhoto } from "../helpers/FetchPhoto";
import { Button, Modal } from "react-bootstrap";
import RatingStars from "../RatingStars";
import { getDates } from "../Announcements/AnnouncementsMap";
import "./Requests.css";

export default function SeeDetails({
  announcement,
  announcement_user,
  request,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const link = "https://www.google.com/maps?q=" + announcement.coordinates;

  const [photoUrl, setPhotoUrl] = useState(null);
  let photoNamesArray = announcement.photos.slice(1, -1).split('","');
  photoNamesArray = photoNamesArray.map((name) => name.replace(/^"|"$/g, ""));
  useEffect(() => {
    fetchPhoto(photoNamesArray[0], setPhotoUrl);
  }, []);

  console.log(request);

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
                  <img src={photoUrl} alt="produkt" className="details-img" />
                </div>
                <div className="col-12">
                  <div className="my-3 outlined-box">
                    <div className="mt-2 d-flex justify-content-center pe-4">
                      <img className="user-img" src="user.png" alt="user" />
                      <p className="ms-2 mt-3">
                        <b>{announcement_user.username}</b>
                      </p>
                    </div>

                    <div className="d-flex pe-4 justify-content-center">
                      {/* <p className="ms-1 stars">(15 ocen)</p> */}
                      <RatingStars userId={announcement_user.id} />
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

                      <p className="mt-2 ms-3">{getDates(request)[1]}</p>
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
