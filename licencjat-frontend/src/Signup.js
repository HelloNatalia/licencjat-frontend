import { useFormik } from "formik";
import "./Signup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";

export default function Signup() {
  const navigation = useNavigate();
  const accessToken = getAuthTokenFromCookie();

  useEffect(() => {
    if (accessToken !== null) {
      navigation("/announcements");
    }
  }, [accessToken, navigation]);

  return (
    <div className="content">
      <div className="container">
        <div className="row justify-content-center mt-3 mb-3 p-3">
          <div className="col-12 col-lg-7 signup-box">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [loginMessage, setLoginMessage] = useState("");
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      surname: "",
      email: "",
      phone_number: "",
    },
    onSubmit: async (values) => {
      const output = await SignupApi(
        values.username,
        values.password,
        values.name,
        values.surname,
        values.email,
        values.phone_number
      );

      if (output === "conflict") {
        setLoginMessage("Nazwa użytkownika jest już zajęta");
      } else {
        setLoginMessage("");
        navigation("/login");
      }
    },
  });

  return (
    <>
      <p className="fs-4 mb-1">Zakładanie konta</p>
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

        <label className="form-label mt-3" htmlFor="password">
          Hasło*
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-control"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

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

        <button type="submit" className="btn btn-primary mt-4 mb-2 signup-btn">
          Załóż konto
        </button>
      </form>
    </>
  );
}

async function SignupApi(
  username,
  password,
  name,
  surname,
  email,
  phone_number
) {
  const signupData = {
    username,
    password_hash: password,
    name,
    surname,
    email,
    phone_number,
  };

  try {
    const response = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      // Tutaj uzyskać zwrot od api jeżeli coś nie gra
      if (response.status === 409) return "conflict";
      else throw new Error("Wystąpił błąd");
    }

    // const data = await response.json();
    // return data;
    return true;
  } catch (error) {
    console.error(error);
  }
}
