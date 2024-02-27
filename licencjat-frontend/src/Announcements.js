import React, { useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import "./Announcements.css";
import AnnouncementPage from "./AnnouncementPage.js";
import AnnouncementsMap from "./AnnouncementsMap.js";
import { getDates } from "./AnnouncementsMap.js";
import SelectComponent from "./selectComponent.js";

export default function Announcements() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputProductId, setInputProductId] = useState("");
  const [inputCategoryId, setInputCategoryId] = useState("");

  const [announcements_array, setAnnouncementArray] = useState([]);

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const handleSelection = (id) => setSelectedAnnouncement(id);
  const handleBack = () => setSelectedAnnouncement(null);

  const [mapView, setMapView] = useState(true);

  const [mapCenter, setMapCenter] = useState(null);

  const handleMapView = () => {
    setMapView(true);
    setSelectedAnnouncement(null);
  };
  const handleListView = () => {
    setMapView(false);
    setSelectedAnnouncement(null);
  };

  useEffect(
    function () {
      async function fetchAnnouncements() {
        const res = await fetch(
          `http://localhost:4000/announcement?search=${inputTitle}&product_id=${inputProductId}&product_category_id=${inputCategoryId}`
        );
        console.log(
          `http://localhost:4000/announcement?search=${inputTitle}&product_id=${inputProductId}&product_category_id=${inputCategoryId}`
        );
        const data = await res.json();
        setAnnouncementArray(data);
      }
      fetchAnnouncements();
    },
    [inputTitle, inputProductId, inputCategoryId]
  );

  return (
    <div className="content">
      {selectedAnnouncement !== null ? (
        <AnnouncementPage handleBack={handleBack} id={selectedAnnouncement} />
      ) : (
        <>
          <Forms
            setInputTitle={setInputTitle}
            setInputProductId={setInputProductId}
            setInputCategoryId={setInputCategoryId}
            setMapCenter={setMapCenter}
          />
          {mapView === true ? (
            <AnnouncementsMap
              handleSelection={handleSelection}
              announcements_aray={announcements_array}
              mapCenter={mapCenter}
            />
          ) : (
            <AnnouncementsList
              handleSelection={handleSelection}
              announcements_aray={announcements_array}
            />
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

function Forms({
  setInputTitle,
  setInputProductId,
  setInputCategoryId,
  setMapCenter,
}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(function () {
    async function fetchProductsList() {
      const res = await fetch(`http://localhost:4000/product/product-list`);
      const data = await res.json();
      console.log(data);
      setProducts(data);
    }
    fetchProductsList();
  }, []);

  useEffect(function () {
    async function fetchProductsList() {
      const res = await fetch(
        `http://localhost:4000/product-category/category-list`
      );
      const data = await res.json();
      console.log(data);
      setCategories(data);
    }
    fetchProductsList();
  }, []);

  const handleSearchChange = (event) => {
    if (event.target.value.length > 3 || event.target.value.length === 0) {
      console.log(event.target.value);
      setInputTitle(event.target.value);
    }
  };

  const handleProductChange = (event) => {
    if (event.target.value === "") setInputProductId("");
    else {
      setInputProductId(event.target.value);
    }
  };

  const handleCategoryChange = (event) => {
    if (event.target.value === "") setInputCategoryId("");
    else {
      setInputCategoryId(event.target.value);
    }
  };

  if (!products) return <div>Loading ... </div>;

  return (
    <div>
      <div className="row mt-3 mx-2">
        <div className="col-9 col-md-5">
          <Form.Control
            name="title"
            type="text"
            placeholder="Wyszukaj po nazwie ..."
            className="search-form search-form-with-icon"
            onChange={handleSearchChange}
          />
        </div>
        {/* Widoczne tylko na sm i md */}
        <div className="col-3 d-md-block d-lg-none">
          <FiltersModal
            handleProductChange={handleProductChange}
            handleCategoryChange={handleCategoryChange}
            products={products}
            categories={categories}
            setMapCenter={setMapCenter}
          />
        </div>
        {/* Widoczne tylko dla lg i większych */}
        <div className="col-2 d-none d-lg-block">
          <Form.Select
            name="product_id"
            className="search-form"
            onChange={handleProductChange}
          >
            <option className="default-product" value="">
              Produkt
            </option>
            {products.map((element) => {
              return <option value={element.id_product}>{element.name}</option>;
            })}
          </Form.Select>
        </div>
        <div className="col-2 d-none d-lg-block">
          <Form.Select
            name="category_id"
            className="search-form"
            onChange={handleCategoryChange}
          >
            <option className="default-category" value="">
              Kategoria
            </option>
            {categories.map((element) => {
              return (
                <option value={element.id_product_category}>
                  {element.name}
                </option>
              );
            })}
          </Form.Select>
        </div>
        <div className="col-2 d-none d-lg-block">
          <SelectComponent setMapCenter={setMapCenter} />
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

function AnnouncementsList({ handleSelection, announcements_aray }) {
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
  const output = getDates(announcement);
  const productDate = output[1];
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
        <p className="area">Dzielnica: {announcement.district}</p>
        <p className="date">Data ważności: {productDate}</p>
      </div>
      <div className="col-3 d-inline-block p-2">
        <img src="announcement-img/1.png" className="img-fluid" alt="product" />
      </div>
    </div>
  );
}

function FiltersModal({
  handleProductChange,
  handleCategoryChange,
  products,
  categories,
  setMapCenter,
}) {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProductSelect = (event) => {
    setSelectedProduct(event.target.value);
    handleProductChange(event);
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
    handleCategoryChange(event);
  };

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
              <Form.Select
                name="product_id"
                className="search-form"
                onChange={handleProductSelect}
                value={selectedProduct}
              >
                <option className="default-product" value="">
                  Produkt
                </option>
                {products.map((element) => {
                  return (
                    <option value={element.id_product}>{element.name}</option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-12 mt-4">
              <Form.Label className="ms-1">Kategoria produktu:</Form.Label>
              <Form.Select
                name="category_id"
                className="search-form"
                onChange={handleCategorySelect}
                value={selectedCategory}
              >
                <option className="default-category" value="">
                  Kategoria
                </option>
                {categories.map((element) => {
                  return (
                    <option value={element.id_product_category}>
                      {element.name}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-12 my-4">
              <Form.Label className="ms-1">Miasto:</Form.Label>
              <SelectComponent setMapCenter={setMapCenter} />
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
