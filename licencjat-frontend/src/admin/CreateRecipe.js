import "../recipes/create-recipe/CreateTempRecipe.css";
import { useFormik } from "formik";
import "../account/signup/Signup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../cookies/auth-cookies";
import { Form } from "react-bootstrap";
import React from "react";
import Select from "react-select";

export default function CreateRecipe() {
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
  const [photoFiles, setPhotoFiles] = useState([]);
  const [selectedProductOption, setSelectedProductOption] = useState();
  const [listAmount, setListAmount] = useState([]);
  const [requiredMessage, setRequiredMessage] = useState(false);

  const handlePhotosChange = (event) => {
    const files = event.target.files;

    if (files.length > 2) {
      // obsługa gdy plików jest więcej niż 2
      return;
    }

    const updatedPhotoFiles = [...photoFiles];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      if (fileExtension !== "png" && fileExtension !== "jpg") {
        // obsługa gdy zły format pliku
        return;
      }
      const uniqueFileName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}.${fileExtension}`;
      const modifiedFile = new File([file], uniqueFileName, {
        type: file.type,
      });
      updatedPhotoFiles.push(modifiedFile);
      setSelectedPhotos([...selectedPhotos, uniqueFileName]);
    }
    setPhotoFiles(updatedPhotoFiles);
  };

  const handleDeleteImage = (index) => {
    const updatedList = [...selectedPhotos];
    const updatedFiles = [...photoFiles];
    updatedList.splice(index, 1);
    updatedFiles.splice(index, 1);
    setSelectedPhotos(updatedList);
    setPhotoFiles(updatedFiles);
  };

  const handleAddProductAndAmount = (option, amount) => {
    if (!option || !amount) return;
    if (!selectedProductsIds.includes(option.value)) {
      setSelectedProductsId([...selectedProductsIds, option.value]);
      setSelectedProductsNames([...selectedProductsNames, option.label]);
      // Dodanie amount
      const amountObj = { id: option.value, amount: amount };
      setListAmount([...listAmount, amountObj]);
    }
  };

  const handleAddProductId = (option) => {
    if (option) setSelectedProductOption(option);
  };

  const handleSelectCategory = (option) => {
    setSelectedCategory(option.value);
  };

  const handleDeleteProduct = (index) => {
    const updateListId = [...selectedProductsIds];
    const updateListName = [...selectedProductsNames];
    updateListId.splice(index, 1);
    updateListName.splice(index, 1);
    setSelectedProductsId(updateListId);
    setSelectedProductsNames(updateListName);
  };

  useEffect(() => {
    formik.setFieldValue("list_amount", listAmount);
  }, [listAmount]);

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
      list_amount: "",
      amount: "",
    },
    onSubmit: async (values) => {
      if (
        values.photos.length < 1 ||
        !values.id_recipe_category ||
        values.list_id_products.length < 1 ||
        values.list_amount.length < 1
      ) {
        setRequiredMessage(true);
      } else {
        const output = await CreateRecipeAdmin(
          values.title,
          values.text,
          values.photos,
          values.id_recipe_category,
          values.list_id_products,
          values.list_amount
        );
        if (output && uploadPhotos(photoFiles)) navigation("/recipes");
      }
    },
  });
  //   if (isLoading) return <div className="content">Loading ...</div>;

  return (
    <div className="p-3">
      {requiredMessage ? (
        <div class="alert alert-danger" role="alert">
          Nie wpisano wszystkich wymaganych
        </div>
      ) : (
        ""
      )}
      <div className="container form-box p-2 px-3">
        <p className="fs-4 mb-1">Tworzenie przepisu</p>
        <form onSubmit={formik.handleSubmit}>
          <label className="form-label mt-3" htmlFor="title">
            Tytuł*
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
            Przepis*
          </label>
          <textarea
            id="text"
            name="text"
            type="text"
            rows="5"
            className="form-control"
            required="required"
            onChange={formik.handleChange}
            value={formik.values.text}
          />

          <div className="img-box p-3 mt-4">
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
            Kategoria*
          </label>
          <Select
            options={categories}
            id="id_recipe_category"
            onChange={handleSelectCategory}
            placeholder="Wybierz ..."
          />

          <div className="products-box p-3 mt-4">
            <label className="form-label mt-1" htmlFor="id_products">
              Produkty*
            </label>
            <div className="row m-0 p-0">
              <div className="col-12 col-md-6 m-0">
                <Select
                  options={productsOptions}
                  onChange={handleAddProductId}
                  id="id_products"
                  placeholder="Wybierz ..."
                />
              </div>
              <div className="col-4 m-0">
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  className="form-control"
                  required="required"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                  placeholder="ilość (np. 1/2 szklanki)"
                />
              </div>
              <div className="col-2 m-0">
                <button
                  type="button"
                  onClick={() =>
                    handleAddProductAndAmount(
                      selectedProductOption,
                      formik.values.amount
                    )
                  }
                  className="btn btn-success"
                >
                  +
                </button>
              </div>
            </div>

            <table className="product-table mt-2">
              {Array.isArray(selectedProductsNames) &&
              selectedProductsNames.length > 0
                ? selectedProductsNames.map((element, index) => {
                    let amount = listAmount.find(
                      (amount_el) => amount_el.id === selectedProductsIds[index]
                    );
                    if (!amount) amount = { amount: "nie przypisano" };
                    return (
                      <tr className="">
                        <td className="px-2 py-1" key={index}>
                          {element} - {amount.amount}
                        </td>
                        <td className="px-2 py-1">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteProduct(index)}
                          >
                            -
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </table>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-4 mb-2 signup-btn"
          >
            Utwórz przepis
          </button>
        </form>
      </div>
    </div>
  );
}

async function CreateRecipeAdmin(
  title,
  text,
  photos,
  id_recipe_category,
  list_id_products,
  list_amount
) {
  const recipeData = {
    title,
    text,
    photos,
    id_recipe_category,
    list_id_products,
    list_amount,
  };

  const accessToken = getAuthTokenFromCookie();

  try {
    const response = await fetch("http://localhost:4000/recipe/create-recipe", {
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

async function uploadPhotos(photos) {
  const formData = new FormData();

  for (let i = 0; i < photos.length; i++) {
    formData.append("photos", photos[i]);
  }

  try {
    const accessToken = getAuthTokenFromCookie();
    const response = await fetch("http://localhost:4000/file/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error("Błąd podczas przesyłania zdjęć:", response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
