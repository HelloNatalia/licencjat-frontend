import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapModel from "../../MapModal";
import { getAuthTokenFromCookie } from "../../cookies/auth-cookies";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function CreateAddress() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Dodaj adres
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tworzenie adresu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateAddressForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

function CreateAddressForm() {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkerSelected, setIsMarkerSelected] = useState(false);

  const handleCoordinationChange = (coordinations) => {
    formik.setFieldValue("coordinates", coordinations);
    setIsMarkerSelected(true);
  };

  const formik = useFormik({
    initialValues: {
      district: "",
      city: "",
      street: "",
      number: "",
      coordinates: "",
      postal_code: "",
    },
    onSubmit: async (values) => {
      const output = await createAddress(
        values.district,
        values.city,
        values.street,
        values.number,
        values.coordinates,
        values.postal_code
      );
      if (output === -1) {
        navigation("/login");
      } else {
        window.location.reload();
      }
    },
  });

  return (
    <>
      <div className="form-bg">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 col-lg-6">
              <label className="form-label mt-3" htmlFor="city">
                Miasto*
              </label>
              <input
                id="city"
                name="city"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </div>
            <div className="col-12 col-lg-6">
              <label className="form-label mt-3" htmlFor="district">
                Dzielnica
              </label>
              <input
                id="district"
                name="district"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.district}
              />
            </div>
            <div className="col-12 col-lg-7">
              <label className="form-label mt-3" htmlFor="street">
                Ulica*
              </label>
              <input
                id="street"
                name="street"
                type="text"
                required
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.street}
              />
            </div>
            <div className="col-12 col-lg-2">
              <label className="form-label mt-3" htmlFor="number">
                Numer*
              </label>
              <input
                id="number"
                name="number"
                type="text"
                className="form-control"
                required
                onChange={formik.handleChange}
                value={formik.values.number}
              />
            </div>
            <div className="col-12 col-lg-3">
              <label className="form-label mt-3" htmlFor="postal_code">
                Kod pocztowy*
              </label>
              <input
                id="postal_code"
                name="postal_code"
                type="text"
                className="form-control"
                required
                pattern="\d{2}-\d{3}"
                title="Wprowadź kod pocztowy w formacie XX-XXX"
                onChange={formik.handleChange}
                value={formik.values.postal_code}
              />
            </div>
            <div className="col-12 mt-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  checked={isMarkerSelected}
                  id="flexCheckChecked"
                />
                <label class="form-check-label show-map" for="flexCheckChecked">
                  <MapModel
                    handleCoordinationChange={handleCoordinationChange}
                  />
                </label>
              </div>
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary mt-4 mb-2 signup-btn"
              >
                Dodaj adres
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="row">
        <div className="col-12"></div>
      </div>
    </>
  );
}

async function createAddress(
  district,
  city,
  street,
  number,
  coordinates,
  postal_code
) {
  const requestData = {
    district,
    city,
    street,
    number,
    coordinates,
    postal_code,
  };
  const accessToken = getAuthTokenFromCookie();

  try {
    const response = await fetch("http://localhost:4000/address/create", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      if (response.status === 401) return -1;
      else throw new Error("Wystąpił błąd");
    }
  } catch (error) {
    console.error(error);
  }
}
