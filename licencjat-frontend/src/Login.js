import { useFormik } from "formik";
import "./Login.css";
import { useState } from "react";

export default function Login() {
  return (
    <div className="content">
      <div className="container">
        <div className="row justify-content-center mt-5 p-3">
          <div className="col-12 col-md-8 col-lg-5 login-box">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [wrongDataInfo, setWrongDataInfo] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const output = await LoginApi(values.username, values.password);
      if (output === -1) setWrongDataInfo(true);
      else {
        setWrongDataInfo(false);
        // tutaj trzeba zarządzić accessTokenem
        console.log(output);
      }
    },
  });

  return (
    <>
      <p className="fs-4 mb-1">Logowanie</p>
      <form onSubmit={formik.handleSubmit}>
        <label className="form-label mt-3" htmlFor="username">
          Nazwa użytkownika
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
        />

        <label className="form-label mt-3" htmlFor="password">
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <button type="submit" className="btn btn-primary mt-4 mb-2 login-btn">
          Zaloguj
        </button>

        {wrongDataInfo ? (
          <p className="text-danger mt-2">Wpisane dane są błędne</p>
        ) : (
          ""
        )}
      </form>
    </>
  );
}

async function LoginApi(username, password) {
  const loginData = { username, password };

  try {
    const response = await fetch("http://localhost:4000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      if (response.status === 401) return -1;
      else throw new Error("Wystąpił błąd");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
