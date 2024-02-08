import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./AnnouncementPage.css";

const selected_announcement = {
  id_announcement: 2,
  title: "Chleb biały",
  id_product_category: 2,
  id_product: 4,
};

export default function AnnouncementPage({ handleBack, id }) {
  return (
    <>
      <Buttons handleBack={handleBack} />
      <div className="row px-4 pt-1 pb-4">
        <div className="col-12 col-md-6 mt-3">
          <Images />
        </div>
        <div className="col-12 col-md-6 mt-3">
          <MainInfo />
        </div>
        <div className="col-12 col-md-6 mt-3">
          {" "}
          <ProductInfo />
        </div>
        <div className="col-12 col-md-6 mt-3">
          <PickupInfo />
        </div>
      </div>
    </>
  );
}

function Buttons({ handleBack }) {
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
            <div className="btn btn-sm category-info px-3">NAZWA KATEGORII</div>
            <div className="btn btn-sm product-info px-3 ms-2">PRODUKT</div>
          </div>
        </div>
      </div>
    </>
  );
}

function Images() {
  return (
    <div className="img-box box">
      <img src="announcement-img/1.png" />
    </div>
  );
}

function MainInfo() {
  return (
    <div className="box main-info justify-content-center py-3">
      <p className="announcement-title">{selected_announcement.title}</p>
      <div className="d-flex user justify-content-center align-items-center">
        <div className="d-flex align-items-center">
          <img src="user.png" />
          <p className="fw-bold mt-3">Aneta</p>
        </div>

        <div className="d-flex mt-3 ms-3">
          <div className="mb-3">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </div>
          <p className="ms-1 stars d-none d-sm-block">(15 ocen)</p>
        </div>
      </div>
    </div>
  );
}

function ProductInfo() {
  return (
    <>
      <div className="box px-4 pt-4 pb-2">
        <div className="row">
          <div className="col-12">
            <div className="outlined-box description-product mb-3">
              Oddam nieotwarty makaron, 400g
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12 d-flex">
            <img className="date-icon" src="date_icon.png" />
            <p className="ms-3 mt-2">
              Data ważności: <span className="fw-bold">15.12.2023r.</span>
            </p>
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div className="col text-center">
            <a href="#">
              <Button className="pickup-btn">CHCĘ ODEBRAĆ</Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function PickupInfo() {
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
                  Dzielnica: <span className="fw-bold ms-1">Pomorzany</span>
                </p>
              </div>
              <div className="d-flex localization mt-2">
                <img className="localization-icon" src="street.png" />
                <p className="mt-2 ms-3">
                  Ulica:{" "}
                  <span className="fw-bold ms-1">
                    Powstańców Wielkopolskich
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
              <div className="d-flex datetime mt-2">
                <img className="datetime-icon" src="calendar.png" />
                <p className="mt-2 ms-3">10.12 Niedziela</p>
                <p className="hours mt-1">11:00 - 12:00</p>
              </div>
              <div className="d-flex datetime mt-2">
                <img className="datetime-icon" src="calendar.png" />
                <p className="mt-2 ms-3">10.12 Niedziela</p>
                <p className="hours mt-1">11:00 - 12:00</p>
              </div>
              <div className="d-flex datetime mt-2">
                <img className="datetime-icon" src="calendar.png" />
                <p className="mt-2 ms-3">10.12 Niedziela</p>
                <p className="hours mt-1">11:00 - 12:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
<div className="d-flex ">
  <img className="area-icon" src="area.png" />
  <p className="mt-2">10.12 Niedziela</p>
  <p className="hours">11:00 - 12:00</p>
</div>;
