import "./CreateTempRecipe.css";
import { useFormik } from "formik";
import "./Signup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import { Form } from "react-bootstrap";
import React from "react";
import Select from "react-select";

export default function CreateTempRecipe() {
  const navigation = useNavigate();
  const accessToken = getAuthTokenFromCookie();

  useEffect(() => {
    if (accessToken === null) {
      navigation("/login");
    }
  }, [accessToken, navigation]);

  return (
    <div className="content">
      <CreateRecipeForm />
    </div>
  );
}

function CreateRecipeForm() {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductsIds, setSelectedProductsId] = useState([]);
  const [selectedProductsNames, setSelectedProductsNames] = useState([]);
  const [productsOptions, setProductsOptions] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const navigation = useNavigate();

  const handlePhotosChange = (event) => {
    const files = event.target.files;

    if (files.length > 2) {
      // obsługa gdy plików jest więcej niż 2
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      if (fileExtension !== "png" && fileExtension !== "jpg") {
        // obsługa gdy zły format pliku
        return;
      }
      setSelectedPhotos([...selectedPhotos, fileName]);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedList = [...selectedPhotos];
    updatedList.splice(index, 1);
    setSelectedPhotos(updatedList);
  };

  const handleAddProductId = (option) => {
    setSelectedProductsId([...selectedProductsIds, option.value]);
    setSelectedProductsNames([...selectedProductsNames, option.label]);
    console.log("lista id: ", selectedProductsIds);
    console.log("Lista nazw: ", selectedProductsNames);
  };

  const handleSelectCategory = (option) => {
    setSelectedCategory(option.value);
  };

  useEffect(() => {
    formik.setFieldValue("photos", selectedPhotos);
  }, [selectedPhotos]);

  useEffect(() => {
    formik.setFieldValue("list_id_products", selectedProductsIds);
  }, [selectedProductsIds]);

  useEffect(() => {
    formik.setFieldValue("id_recipe_category", selectedCategory);
  }, [selectedCategory]);

  useEffect(function () {
    async function fetchCategoriesList() {
      const res = await fetch(
        `http://localhost:4000/recipe/recipes-categories`
      );
      const data = await res.json();
      const newArray = [];
      if (data.length !== 0) {
        data.map((element) => {
          newArray.push({
            value: element.id_recipe_category,
            label: element.name,
          });
        });
      }
      setCategories(newArray);
    }
    async function fetchProductsList() {
      const res = await fetch(`http://localhost:4000/product/product-list`);
      const data = await res.json();
      const newArray = [];
      if (data.length !== 0) {
        data.map((element) => {
          newArray.push({ value: element.id_product, label: element.name });
        });
      }
      setProductsOptions(newArray);
    }
    fetchCategoriesList();
    fetchProductsList();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      photos: "",
      id_recipe_category: "",
      list_id_products: "",
    },
    onSubmit: async (values) => {
      const output = await CreateRecipe(
        values.title,
        values.text,
        values.photos,
        values.id_recipe_category,
        values.list_id_products
      );
      if (output) navigation("/recipes");
    },
  });
  //   if (isLoading) return <div className="content">Loading ...</div>;

  return (
    <>
      <p className="fs-4 mb-1">Tworzenie przepisu</p>
      <form onSubmit={formik.handleSubmit}>
        <label className="form-label mt-3" htmlFor="title">
          Tytuł
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="form-control"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.title}
        />

        <label className="form-label mt-3" htmlFor="text">
          Przepis
        </label>
        <input
          id="text"
          name="text"
          type="text"
          className="form-control"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.text}
        />

        <div className="img-box p-3">
          <label className="form-label" htmlFor="photos">
            Zdjęcia*
          </label>
          <input
            id="photos"
            name="photos"
            type="file"
            className="form-control"
            onChange={handlePhotosChange}
            multiple
            // value={formik.values.photos}
          />
          <p className="mt-3">
            Wybrane zdjęcia:{" "}
            {selectedPhotos.length > 0
              ? selectedPhotos.map((element, index) => {
                  return (
                    <p>
                      {element}{" "}
                      <button
                        className="btn bg-danger"
                        onClick={() => handleDeleteImage(index)}
                      >
                        -
                      </button>
                    </p>
                  );
                })
              : "Brak zdjęć"}
          </p>
        </div>

        <label className="form-label mt-3" htmlFor="id_recipe_category">
          Kategoria
        </label>
        <Select
          options={categories}
          id="id_recipe_category"
          onChange={handleSelectCategory}
        />

        <Select options={productsOptions} onChange={handleAddProductId} />

        {Array.isArray(selectedProductsNames) &&
        selectedProductsNames.length > 0
          ? selectedProductsNames.map((element, index) => {
              return <p key={index}>{element}</p>;
            })
          : ""}

        <button type="submit" className="btn btn-primary mt-4 mb-2 signup-btn">
          Utwórz przepis
        </button>
      </form>
    </>
  );
}

async function CreateRecipe(
  title,
  text,
  photos,
  id_recipe_category,
  list_id_products
) {
  const recipeData = {
    title,
    text,
    photos,
    id_recipe_category,
    list_id_products,
  };

  const accessToken = getAuthTokenFromCookie();

  try {
    const response = await fetch(
      "http://localhost:4000/recipe/create-temporary-recipe",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      }
    );

    if (!response.ok) {
      // Tutaj uzyskać zwrot od api jeżeli coś nie gra
      if (response.status === 404) return "not found";
      else throw new Error("Wystąpił błąd");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
