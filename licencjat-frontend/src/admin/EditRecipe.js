import "../recipes/create-recipe/CreateTempRecipe.css";
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
  const [selectedProductOption, setSelectedProductOption] = useState();
  const navigation = useNavigate();
  const [listAmount, setListAmount] = useState([]);
  const [requiredMessage, setRequiredMessage] = useState(false);

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
      }
      const data = await res.json();
      console.log(data);
      const newArrayId = [];
      const newArrayName = [];
      const arrayAmount = [];
      if (data && data.length > 0) {
        data.map((element) => {
          newArrayId.push(element.product.id_product);
          newArrayName.push(element.product.name);
          arrayAmount.push({
            id: element.product.id_product,
            amount: element.amount,
          });
        });
        setSelectedProductsId(newArrayId);
        setSelectedProductsNames(newArrayName);
        setListAmount(arrayAmount);
      } else setRecipeProductData([]);
    }
    setIsLoading(true);
    checkUser();
    getRecipeData();
    getRecipeProductData();
    setIsLoading(false);
  }, []);

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
      list_amount: "",
      amount: "",
    },
    onSubmit: async (values) => {
      if (
        !values.id_recipe_category ||
        values.list_id_products.length < 1 ||
        values.list_amount.length < 1
      ) {
        setRequiredMessage(true);
      } else {
        const output = await EditRecipeAdmin(
          recipeData.id_recipe,
          values.title,
          values.text,
          values.id_recipe_category,
          values.list_id_products,
          values.list_amount
        );
        if (output) navigation("/recipes-panel");
      }
    },
  });

  useEffect(() => {
    if (recipeData) {
      console.log(recipeData);
      formik.setValues({
        title: recipeData.title,
        text: recipeData.text,
        id_recipe_category: recipeData.id_recipe_category,
        list_id_products: selectedProductsIds,
        list_amount: listAmount,
      });
    }
  }, [recipeData]);

  if (isLoading) return <div className="content">Loading ...</div>;

  console.log("Listy");
  console.log(formik.values.id_recipe_category);
  console.log(formik.values.list_amount);
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
        <p className="fs-4 mb-1">Edycja przepisu</p>
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
            className="form-control"
            required="required"
            onChange={formik.handleChange}
            value={formik.values.text}
          />

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
            Zatwierdź zmiany
          </button>
        </form>
      </div>
    </div>
  );
}

async function EditRecipeAdmin(
  id,
  title,
  text,
  id_recipe_category,
  list_id_products,
  list_amount
) {
  const photos = "";
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
    const response = await fetch(
      `http://localhost:4000/recipe/edit-recipe/${id}`,
      {
        method: "PATCH",
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
