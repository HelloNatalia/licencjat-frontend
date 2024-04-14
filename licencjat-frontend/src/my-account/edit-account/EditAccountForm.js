import "./EditAccountForm.css";
import { useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getAuthTokenFromCookie } from "../../cookies/auth-cookies";
import { useNavigate } from "react-router-dom";

export default function EditAccountForm({ accountData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="btn btn-warning me-3 edit-account-button"
        variant="primary"
        onClick={handleShow}
      >
        Edytuj
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj dane konta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm accountData={accountData} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

function EditForm({ accountData, handleClose }) {
  const navigation = useNavigate();
  const [loginMessage, setLoginMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: accountData.username,
      name: accountData.name,
      surname: accountData.surname,
      email: accountData.email,
      phone_number: accountData.phone_number,
      password_hash: "",
    },
    onSubmit: async (values) => {
      const output = await sendRequest(
        values.username,
        values.password_hash,
        values.name,
        values.surname,
        values.email,
        values.phone_number
      );
      if (output === -1) {
        navigation("/login");
      } else if (output === -2) {
        setLoginMessage("Nazwa użytkownika jest już zajęta");
      } else {
        setLoginMessage("");
        window.location.reload();
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label className="form-label mt-3" htmlFor="username">
          Nazwa użytkownika*
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="form-control"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {loginMessage !== "" ? (
          <p className="text-danger">{loginMessage}</p>
        ) : (
          ""
        )}

        <label className="form-label mt-3" htmlFor="name">
          Imię*
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label className="form-label mt-3" htmlFor="surname">
          Nazwisko*
        </label>
        <input
          id="surname"
          name="surname"
          type="text"
          className="form-control"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.surname}
        />

        <label className="form-label mt-3" htmlFor="email">
          E-mail*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label className="form-label mt-3" htmlFor="phone_number">
          Numer telefonu*
        </label>
        <input
          id="phone_number"
          name="phone_number"
          type="number"
          className="form-control"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.phone_number}
        />

        <label className="form-label mt-3" htmlFor="password_hash">
          Hasło* (weryfikacja tożsamości)
        </label>
        <input
          id="password_hash"
          name="password_hash"
          type="password"
          className="form-control"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.password_hash}
        />

        <button type="submit" className="btn btn-primary mt-4 mb-2 signup-btn">
          Zatwierdź zmiany
        </button>
      </form>
    </>
  );
}

async function sendRequest(
  username,
  password_hash,
  name,
  surname,
  email,
  phone_number
) {
  const requestData = {
    username,
    password_hash,
    name,
    surname,
    email,
    phone_number,
  };
  const accessToken = getAuthTokenFromCookie();

  try {
    const response = await fetch("http://localhost:4000/auth/edit-account", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      if (response.status === 409) return -2;
      else if (response.status === 401) return -1;
      else throw new Error("Wystąpił błąd");
    }

    return true;
  } catch (error) {
    console.error(error);
  }
}
