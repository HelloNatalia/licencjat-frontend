import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import "./Announcements.css";

const announcements_aray = [
  {
    id_announcement: 1,
    title: "Pierogi ruskie",
    id_product_category: 1,
    id_product: 2,
  },
  {
    id_announcement: 2,
    title: "Chleb biały",
    id_product_category: 2,
    id_product: 4,
  },
  {
    id_announcement: 3,
    title: "Makaron pełnoziarnisty Bella",
    id_product_category: 3,
    id_product: 6,
  },
];

export default function Announcements() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputProductId, setInputProductId] = useState("");
  const [inputCategoryId, setInputCategoryId] = useState("");

  return (
    <div className="content">
      <Forms />
      <AnnouncementsList />
    </div>
  );
}

function Forms() {
  return (
    <div>
      <div className="row mt-2 mx-2">
        <div className="col-9 col-md-6">
          <Form.Control
            name="title"
            type="text"
            placeholder="Wyszukaj po nazwie ..."
            className="search-form search-form-with-icon"
          />
        </div>
        {/* Widoczne tylko na sm i md */}
        <div className="col-3 d-md-block d-lg-none">
          <FiltersModal />
        </div>
        <div className="col-3 d-none d-lg-block">
          <Form.Control
            name="product_id"
            type="text"
            placeholder="Produkt"
            className="search-form"
          />
        </div>
        <div className="col-3 d-none d-lg-block">
          <Form.Control
            name="category_id"
            type="text"
            placeholder="Kategoria"
            className="search-form"
          />
        </div>
      </div>
    </div>
  );
}

function AnnouncementsList({ announcements }) {
  return (
    <>
      <Announcement announcement={announcements_aray[0]} />
      <Announcement announcement={announcements_aray[1]} />
      <Announcement announcement={announcements_aray[2]} />
    </>
  );
}

function Map() {}

function Announcement({ announcement }) {
  return (
    <div>
      <img src="logo192.png" />
      <p>{announcement.title}</p>
    </div>
  );
}

function FiltersModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="form-btn" variant="primary" onClick={handleShow}>
        Filtruj
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtruj ogłoszenia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <Form.Label className="ms-1">Typ produktu:</Form.Label>
              <Form.Control
                name="product_id"
                type="text"
                placeholder="Produkt"
                className="search-form"
              />
            </div>
            <div className="col-12 my-4">
              <Form.Label className="ms-1">Kategoria produktu:</Form.Label>
              <Form.Control
                name="category_id"
                type="text"
                placeholder="Kategoria"
                className="search-form"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="form-btn" onClick={handleClose}>
            Zastosuj
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
