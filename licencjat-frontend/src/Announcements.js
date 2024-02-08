import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import "./Announcements.css";
import AnnouncementPage from "./AnnouncementPage.js";
import AnnouncementsMap from "./AnnouncementsMap.js";

const announcements_aray = [
  {
    id_announcement: 1,
    title: "Pierogi ruskie",
    id_product_category: 1,
    id_product: 2,
    coordinates: [53.42366704388721, 14.536882650570943],
  },
  {
    id_announcement: 2,
    title: "Chleb biały",
    id_product_category: 2,
    id_product: 4,
    coordinates: [53.420453223292974, 14.54080017383933],
  },
  {
    id_announcement: 3,
    title: "Makaron pełnoziarnisty Bella",
    id_product_category: 3,
    id_product: 6,
    coordinates: [53.424341688310555, 14.512939336167545],
  },
];

const selected_announcement = {
  id_announcement: 2,
  title: "Chleb biały",
  id_product_category: 2,
  id_product: 4,
};

export default function Announcements() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputProductId, setInputProductId] = useState("");
  const [inputCategoryId, setInputCategoryId] = useState("");

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const handleSelection = (id) => setSelectedAnnouncement(id);
  const handleBack = () => setSelectedAnnouncement(null);

  const [mapView, setMapView] = useState(true);
  const handleMapView = () => {
    setMapView(true);
    setSelectedAnnouncement(null);
  };
  const handleListView = () => {
    setMapView(false);
    setSelectedAnnouncement(null);
  };

  return (
    <div className="content">
      {selectedAnnouncement !== null ? (
        <AnnouncementPage handleBack={handleBack} id={selectedAnnouncement} />
      ) : (
        <>
          <Forms />
          {mapView === true ? (
            <AnnouncementsMap
              handleSelection={handleSelection}
              announcements_aray={announcements_aray}
            />
          ) : (
            <AnnouncementsList handleSelection={handleSelection} />
          )}
        </>
      )}
      <FixedButtons
        handleMapView={handleMapView}
        handleListView={handleListView}
        mapView={mapView}
      />
    </div>
  );
}

function Forms() {
  return (
    <div>
      <div className="row mt-3 mx-2">
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
        {/* Widoczne tylko dla lg i większych */}
        <div className="col-3 d-none d-lg-block">
          <Form.Select name="product_id" className="search-form">
            <option className="default-product">Produkt</option>
            <option>Makaron</option>
            <option>Chleb</option>
          </Form.Select>
        </div>
        <div className="col-3 d-none d-lg-block">
          <Form.Select name="category_id" className="search-form">
            <option className="default-category">Kategoria</option>
            <option>Nabiał</option>
            <option>Pieczywo</option>
          </Form.Select>
        </div>
      </div>
    </div>
  );
}

function FixedButtons({ handleMapView, handleListView, mapView }) {
  return (
    <>
      <div className="plus-btn d-flex justify-content-center align-items-center">
        <img src="plus-icon.png" alt="icon to add new announcement" />
      </div>
      <div className="change-view-btn d-flex justify-content-center align-items-center">
        <div
          onClick={() => handleMapView()}
          className={
            "map-half-btn d-flex justify-content-center align-items-center " +
            (mapView === true ? "active-view" : "normal")
          }
        >
          <img
            className="map-btn"
            src="map-icon-btn.png"
            alt="icon to change for map view"
          />
        </div>
        <div
          onClick={() => handleListView()}
          className={
            "list-half-btn d-flex justify-content-center align-items-center " +
            (mapView === false ? "active-view" : "normal")
          }
        >
          <img
            className="list-btn"
            src="list-icon-btn.png"
            alt="icon to change to list view"
          />
        </div>
      </div>
    </>
  );
}

function AnnouncementsList({ handleSelection }) {
  return (
    <>
      <div className="row mt-2 mx-3">
        {announcements_aray.map((element) => (
          <div className="col-12 col-xl-6 mt-3">
            <Announcement
              announcement={element}
              handleSelection={handleSelection}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function Announcement({ announcement, handleSelection }) {
  return (
    <div
      onClick={() => handleSelection(announcement.id_announcement)}
      className="announcement-element d-flex align-items-center"
    >
      <div className="col-3">
        <img src="category.png" className="img-fluid p-4" alt="category" />
      </div>
      <div className="description col-6">
        <p className="title">{announcement.title}</p>
        <p className="area">Dzielnica: XXX</p>
        <p className="date">Data ważności: YYY</p>
      </div>
      <div className="col-3 d-inline-block p-2">
        <img src="announcement-img/1.png" className="img-fluid" alt="product" />
      </div>
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
              <Form.Select name="product_id" className="search-form">
                <option className="default-product">Produkt</option>
                <option>Makaron</option>
                <option>Chleb</option>
              </Form.Select>
            </div>
            <div className="col-12 my-4">
              <Form.Label className="ms-1">Kategoria produktu:</Form.Label>
              <Form.Select name="category_id" className="search-form">
                <option className="default-category">Kategoria</option>
                <option>Nabiał</option>
                <option>Pieczywo</option>
              </Form.Select>
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
