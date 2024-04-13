import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../../../cookies/auth-cookies";
import { useState } from "react";

export default function CreateRecipeCategory() {
  return (
    <div className="content">
      <div className="container p-4">
        <CreateRecipeCategoryForm />
      </div>
    </div>
  );
}

function CreateRecipeCategoryForm() {
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values) => {
      const output = await sendRecipeCategory(values.name, values.description);
      if (output === -1) {
        navigation("/login");
      } else {
        navigation("/recipes-categories");
      }
    },
  });

  return (
    <div className="p-2 px-3 form-box">
      <p className="fs-4 m-3">Tworzenie kategorii przepisów</p>
      <div className="row">
        <div className="col">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <label className="form-label mt-3" htmlFor="name">
                  Nazwa
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  required="required"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label mt-3" htmlFor="description">
                  Opis
                </label>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-success mt-4 mb-2 form-pickup-btn"
                >
                  Utwórz
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

async function sendRecipeCategory(name, description) {
  const requestData = {
    name,
    description,
  };
  const accessToken = getAuthTokenFromCookie();

  try {
    const response = await fetch(
      "http://localhost:4000/recipe/create-recipe-category",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      if (response.status === 401) return -1;
      else throw new Error("Wystąpił błąd");
    }
  } catch (error) {
    console.error(error);
  }
}
