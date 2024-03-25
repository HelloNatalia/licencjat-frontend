import "../CreateTempRecipe.css";
import { useFormik } from "formik";
import "../Signup.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthTokenFromCookie } from "../cookies/auth-cookies";
import { Form } from "react-bootstrap";
import React from "react";
import Select from "react-select";

export default function EditRecipe() {
  const { id } = useParams("id");
  console.log("ID z URL: ", id);
  const navigation = useNavigate();
  const accessToken = getAuthTokenFromCookie();

  useEffect(() => {
    if (accessToken === null) {
      navigation("/login");
    }
  }, [accessToken, navigation]);

  return (
    <div className="content">
      <CreateRecipeForm id={id} />
    </div>
  );
}

function CreateRecipeForm({ id }) {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductsIds, setSelectedProductsId] = useState([]);
  const [selectedProductsNames, setSelectedProductsNames] = useState([]);
  const [productsOptions, setProductsOptions] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [recipeData, setRecipeData] = useState();
  const [recipeProductData, setRecipeProductData] = useState();
  const accessToken = getAuthTokenFromCookie();
  const navigation = useNavigate();

  useEffect(function () {
    async function checkUser() {
      const res = await fetch(`http://localhost:4000/auth/is-admin`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        if (res.status === 401) navigation("/login");
      }
    }
    async function getRecipeData() {
      const res = await fetch(
        `http://localhost:4000/recipe/only-recipe/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        // navigation("/announcements");
        console.log("Dane zwykle przepisu!");
      }
      const data = await res.json();
      console.log(data);
      setRecipeData(data);
      setSelectedCategory(data.recipe_category.id_recipe_category);
    }
    async function getRecipeProductData() {
      const res = await fetch(`http://localhost:4000/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        // navigation("/announcements");
        console.log("Dane produktów przepisu!");
      }
      const data = await res.json();
      console.log(data);
      const newArrayId = [];
      const newArrayName = [];
      if (data && data.length > 0) {
        data.map((element) => {
          newArrayId.push(element.product.id_product);
          newArrayName.push(element.product.name);
        });
        setSelectedProductsId(newArrayId);
        setSelectedProductsNames(newArrayName);
      } else setRecipeProductData([]);
    }
    setIsLoading(true);
    checkUser();
    getRecipeData();
    getRecipeProductData();
    setIsLoading(false);
  }, []);

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
      id_recipe_category: "",
      list_id_products: "",
    },
    onSubmit: async (values) => {
      const output = await CreateRecipeAdmin(
        values.title,
        values.text,
        values.id_recipe_category,
        values.list_id_products
      );
      if (output) navigation("/recipes");
    },
  });

  useEffect(() => {
    if (recipeData) {
      console.log(recipeData);
      formik.setValues({
        title: recipeData.title,
        text: recipeData.text,
        id_recipe_category: "",
        list_id_products: "",
      });
    }
  }, [recipeData]);

  if (isLoading) return <div className="content">Loading ...</div>;

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

        <label className="form-label mt-3" htmlFor="id_recipe_category">
          Kategoria
        </label>
        <Select
          options={categories}
          id="id_recipe_category"
          onChange={handleSelectCategory}
          value={selectedCategory}
        />

        <Select options={productsOptions} onChange={handleAddProductId} />

        {Array.isArray(selectedProductsNames) &&
        selectedProductsNames.length > 0
          ? selectedProductsNames.map((element, index) => {
              return <p key={index}>{element}</p>;
            })
          : ""}

        <button type="submit" className="btn btn-primary mt-4 mb-2 signup-btn">
          Zatwierdź zmiany
        </button>
      </form>
    </>
  );
}

async function CreateRecipeAdmin(
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
    const response = await fetch("http://localhost:4000/recipe/edit-recipe", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

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
