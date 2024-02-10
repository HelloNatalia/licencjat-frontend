import "./MyAnnouncements.css";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

export default function MyAnnouncements() {
  return (
    <div className="content">
      <Announcements />
    </div>
  );
}

function Announcements() {
  return (
    <div className="row mx-3">
      <div className="col-12 mt-4">
        <p className="page-title ms-4 mb-1">Zarządzaj swoimi ogłoszeniami</p>
      </div>
      <div className="col-12 mt-3">
        <Announcement />
      </div>
      <div className="col-12 mt-3">
        <Announcement />
      </div>
    </div>
  );
}

function Announcement() {
  return (
    <div className="row mx-3">
      <div className="col-12 mt-3">
        <div className="announcement-box d-flex">
          <div className="request-img d-none d-md-block me-3">
            <img src="announcement-img/1.png" aria-label="announcement" />
          </div>
          <div>
            <p>Makaron pełnoziarnisty &#183; 15.02.2024</p>
            <div>
              <Button className=" me-2 answer-request-btn opinion-request-btn">
                EDYTUJ
              </Button>
              <DeleteQuestion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteQuestion() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="me-2 answer-request-btn negative-request-btn"
        variant="primary"
        onClick={handleShow}
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
