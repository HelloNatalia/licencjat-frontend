import { useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import { useNavigate } from "react-router-dom";

export default function RequestModal({ announcement, setCreatedRequest }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="pickup-btn" variant="primary" onClick={handleShow}>
        CHCĘ ODEBRAĆ
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wybierz datę i godzinę odbioru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RequestForm
            announcement={announcement}
            handleClose={handleClose}
            setCreatedRequest={setCreatedRequest}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

function RequestForm({ announcement, handleClose, setCreatedRequest }) {
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    onSubmit: async (values) => {
      const { id_announcement, user } = announcement;
      const { id } = user;

      const output = await sendRequest(
        id_announcement,
        id,
        values.date,
        values.time
      );
      if (output === -1) {
        navigation("/login");
      } else if (output === -2) {
        navigation("/blocked");
      } else {
        setCreatedRequest(id_announcement);
        handleClose();
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6">
            <label className="form-label mt-3" htmlFor="date">
              Data
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              name="date"
              required="required"
              min={getCurrentDate()}
              onChange={formik.handleChange}
              value={formik.values.date}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label mt-3" htmlFor="time">
              Godzina
            </label>
            <input
              type="time"
              id="time"
              className="form-control"
              name="time"
              required="required"
              onChange={formik.handleChange}
              value={formik.values.time}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              type="submit"
              className="btn btn-primary mt-4 mb-2 form-pickup-btn"
            >
              Wyślij prośbę
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

async function sendRequest(id_announcement, id, date, time) {
  const requestData = {
    announcement: id_announcement,
    announcement_user: id,
    date,
    hour: time,
  };
  const accessToken = getAuthTokenFromCookie();

  try {
    const response = await fetch("http://localhost:4000/request/create", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      if (response.status === 401) return -1;
      if (response.status === 403) return -2;
      else throw new Error("Wystąpił błąd");
    }
  } catch (error) {
    console.error(error);
  }
}
