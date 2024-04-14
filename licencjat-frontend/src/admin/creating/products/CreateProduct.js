import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../../../cookies/auth-cookies";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function CreateProduct() {
  return (
    <div className="content">
      <div className="container p-4">
        <CreateProductForm />
      </div>
    </div>
  );
}

function CreateProductForm() {
  const navigation = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(function () {
    async function fetchProductCategoriesList() {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:4000/product-category/category-list`
      );
      const data = await res.json();
      console.log(data);
      const newArray = [];
      if (data.length !== 0) {
        data.map((element) => {
          newArray.push({
            value: element.id_product_category,
            label: element.name,
          });
        });
      }
      setCategories(newArray);
      setIsLoading(false);
    }
    fetchProductCategoriesList();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      product_category: "",
    },
    onSubmit: async (values) => {
      const output = await sendProduct(
        values.name,
        values.description,
        values.product_category
      );
      if (output === -1) {
        navigation("/login");
      } else {
        navigation("/products");
      }
    },
  });

  const handleSelectCategory = (option) => {
    setSelectedCategory(option.value);
  };

  useEffect(() => {
    formik.setFieldValue("product_category", selectedCategory);
  }, [selectedCategory]);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="p-2 px-3 form-box">
      <p className="fs-4 m-3">Tworzenie produktu</p>
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
              <div className="col-12">
                <label className="form-label mt-3" htmlFor="product_category">
                  Kategoria
                </label>
                <Select
                  options={categories}
                  id="product_category"
                  onChange={handleSelectCategory}
                  placeholder="Wybierz ..."
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

async function sendProduct(name, description, product_category) {
  const requestData = {
    name,
    description,
    product_category_id: product_category,
  };
  const accessToken = getAuthTokenFromCookie();

  try {
    const response = await fetch("http://localhost:4000/product/create", {
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
