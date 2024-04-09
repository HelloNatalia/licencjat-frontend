import "./MyAnnouncements.css";
import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import { getDates } from "./AnnouncementsMap";

export default function MyAnnouncements() {
  const navigation = useNavigate();
  const accessToken = getAuthTokenFromCookie();
  const [myAnnouncements, setMyAnnouncements] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // http://localhost:4000/announcement/my-announcements

  useEffect(function () {
    async function fetchMyAnnouncements() {
      const res = await fetch(
        `http://localhost:4000/announcement/my-announcements`,
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
      const filteredData = data.filter((record) => {
        return record.status == "available";
      });
      setMyAnnouncements(filteredData);
      setIsLoading(false);
    }
    fetchMyAnnouncements();
  }, []);

  if (isLoading === true) return <div>Loading ...</div>;

  return (
    <div className="content pb-3">
      <Announcements myAnnouncements={myAnnouncements} />
    </div>
  );
}

function Announcements({ myAnnouncements }) {
  return (
    <div className="row mx-3">
      <div className="col-12 mt-4">
        <p className="page-title ms-4 mb-1">Zarządzaj swoimi ogłoszeniami</p>
      </div>
      {myAnnouncements.map((element) => {
        return (
          <div className="col-12 mt-3">
            <Announcement announcement={element} />
          </div>
        );
      })}
    </div>
  );
}

function Announcement({ announcement }) {
  return (
    <div className="row mx-3">
      <div className="col-12 mt-3">
        <div className="announcement-box d-flex">
          <div className="request-img d-none d-md-block me-3">
            <img src="announcement-img/1.png" aria-label="announcement" />
          </div>
          <div>
            <p>
              {announcement.title} &#183; {announcement.date.split("T")[0]}
            </p>
            <div>
              <a
                href={`edit-announcement/${announcement.id_announcement}`}
                className="btn btn-primary me-2 answer-request-btn opinion-request-btn"
              >
                EDYTUJ
              </a>
              <DeleteQuestion id_announcement={announcement.id_announcement} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteQuestion({ id_announcement }) {
  const [show, setShow] = useState(false);
  const accessToken = getAuthTokenFromCookie();
  const navigation = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // http://localhost:4000/announcement/1adfef-bb9d-48a8-a1d0-efbe54537675

  const handleDeleteAnnouncement = async (id) => {
    const res = await fetch(`http://localhost:4000/announcement/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      if (res.status === 401) navigation("/login");
    }
    window.location.reload();
  };

  return (
    <>
      <Button
        className="me-2 answer-request-btn negative-request-btn"
        variant="primary"
        onClick={() => handleDeleteAnnouncement(id_announcement)}
      >
        USUŃ
      </Button>

      <Modal
        className="modal-content-question"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <p className="modal-title mb-0">Makaron pełnoziarnisty</p>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <p className="fs-4">Czy na pewno chcesz usunąć to ogłoszenie?</p>
            </div>
            <div className="col-12 text-center">
              <Button className=" me-4 answer-request-btn positive-request-btn">
                TAK, usuń
              </Button>
              <Button
                onClick={() => handleClose()}
                className=" me-2 answer-request-btn negative-request-btn"
              >
                NIE
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
