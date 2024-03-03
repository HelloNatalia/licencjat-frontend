import { useNavigate } from "react-router-dom";
import "./CreateAnnouncement.css";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import MapModel from "./MapModal";

export default function CreateAnnouncement() {
  const accessToken = getAuthTokenFromCookie();
  const [products, setProducts] = useState([]);
  const navigation = useNavigate();

  useEffect(function () {
    async function checkUser() {
      const res = await fetch(`http://localhost:4000/auth/is-loggedin`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        if (res.status === 401) navigation("/login");
      }
    }
    checkUser();
  }, []);

  useEffect(function () {
    async function fetchProductsList() {
      const res = await fetch(`http://localhost:4000/product/product-list`);
      const data = await res.json();
      console.log(data);
      setProducts(data);
    }
    fetchProductsList();
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col">
            <CreateAnnouncementForm products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateAnnouncementForm({ products }) {
  const [pickupDates, setPickupDates] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      district: "",
      city: "",
      street: "",
      number: "",
      coordinates: "",
      available_dates: "",
      product_category: "",
      product: "",
      photos: "",
      date: "",
      pickup_date: "",
      pickup_hour_1: "",
      pickup_hour_2: "",
    },
    onSubmit: async (values) => {
      const output = await Create(
        values.title,
        values.description,
        values.district,
        values.city,
        values.street,
        values.number,
        values.coordinates,
        values.available_dates,
        values.product_category,
        values.product,
        values.photos,
        values.date
      );
    },
  });

  const handleAddDate = () => {
    if (
      formik.values.pickup_date &&
      formik.values.pickup_hour_1 &&
      formik.values.pickup_hour_2
    ) {
      const formattedDate = formik.values.pickup_date
        .split("-")
        .reverse()
        .join(".");
      const newDate = {
        date: formattedDate,
        hours: [formik.values.pickup_hour_1, formik.values.pickup_hour_2],
      };
      if (pickupDates.length === 0) {
        setPickupDates([newDate]);
      } else {
        setPickupDates([...pickupDates, newDate]);
      }
    }
  };

  useEffect(() => {
    const formattedToJsonString = JSON.stringify(pickupDates);
    formik.setFieldValue("available_dates", formattedToJsonString);
  }, [pickupDates]);

  const handleSelectProduct = (event) => {
    formik.handleChange(event);
    if (event.target.value) {
      console.log("event: " + event.target.value);
      const selectedProduct = products.find(
        (element) => element.id_product === event.target.value
      );
      if (selectedProduct) {
        const id_product_category =
          selectedProduct.product_category.id_product_category;
        formik.setFieldValue("product_category", id_product_category);
      }
    }
  };

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

  useEffect(() => {
    formik.setFieldValue("photos", selectedPhotos);
  }, [selectedPhotos]);

  const handleCoordinationChange = (coordinations) => {
    formik.setFieldValue("coordinates", coordinations);
  };

  return (
    <>
      <div className="form-bg">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12">
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
            </div>
            <div className="col-12">
              <label className="form-label mt-3" htmlFor="description">
                Opis*
              </label>
              <input
                id="description"
                name="description"
                type="textarea"
                className="form-control"
                required="required"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>
            <div className="col-12 col-lg-6">
              <label className="form-label mt-3" htmlFor="city">
                Miasto*
              </label>
              <input
                id="city"
                name="city"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </div>
            <div className="col-12 col-lg-6">
              <label className="form-label mt-3" htmlFor="district">
                Dzielnica
              </label>
              <input
                id="district"
                name="district"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.district}
              />
            </div>
            <div className="col-12 col-lg-8">
              <label className="form-label mt-3" htmlFor="street">
                Ulica*
              </label>
              <input
                id="street"
                name="street"
                type="text"
                required
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.street}
              />
            </div>
            <div className="col-12 col-lg-4">
              <label className="form-label mt-3" htmlFor="number">
                Numer*
              </label>
              <input
                id="number"
                name="number"
                type="text"
                className="form-control"
                required
                onChange={formik.handleChange}
                value={formik.values.number}
              />
            </div>
            <div className="col-12 mt-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id={
                    formik.values.coordinates
                      ? "flexCheckChecked"
                      : "flexCheckDefault"
                  }
                />
                <label class="form-check-label show-map" for="flexCheckDefault">
                  <MapModel
                    handleCoordinationChange={handleCoordinationChange}
                  />
                </label>
              </div>
            </div>

            <div className="col-12 mt-3">
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
              </div>
            </div>

            <div className="col-12">
              <label className="form-label mt-3" htmlFor="date">
                Data ważności produktu*
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-control"
                required
                onChange={formik.handleChange}
                value={formik.values.date}
              />
            </div>
          </div>
        </form>
      </div>
      <p className="fs-4 mb-1">Tworzenie ogłoszenia</p>

      <label className="form-label mt-3" htmlFor="pickup_date">
        Możliwa data i godzina odbioru
      </label>
      <div className="row">
        <div className="col-12 col-md-6">
          <input
            id="pickup_date"
            name="pickup_date"
            type="date"
            className="form-control"
            required
            onChange={formik.handleChange}
            value={formik.values.pickup_date}
          />
        </div>
        <div className="col-6 col-md-3">
          <input
            id="pickup_hour_1"
            name="pickup_hour_1"
            type="time"
            className="form-control"
            required
            onChange={formik.handleChange}
            value={formik.values.pickup_hour_1}
          />
        </div>
        <div className="col-6 col-md-3">
          <input
            id="pickup_hour_2"
            name="pickup_hour_2"
            type="time"
            className="form-control"
            required
            onChange={formik.handleChange}
            value={formik.values.pickup_hour_2}
          />
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <Button onClick={handleAddDate}>
              Zatwierdź możliwą datę odbioru
            </Button>
          </div>
        </div>
        <div className="col-12">
          <p>Wybrane daty odbioru</p>
          {pickupDates !== null ? (
            <table>
              <tr>
                <th>Data</th>
                <th>Godzina</th>
              </tr>

              {pickupDates.map((element) => {
                return (
                  <tr>
                    <td>{element.date}</td>
                    <td>
                      {element.hours[0]} - {element.hours[1]}
                    </td>
                  </tr>
                );
              })}
            </table>
          ) : (
            ""
          )}
        </div>
        <div className="col-12">
          <label className="form-label mt-3" htmlFor="product">
            Produkt*
          </label>
          <Form.Select
            id="product"
            name="product"
            className=""
            onChange={handleSelectProduct}
            value={formik.values.product}
          >
            <option className="default-product" value="">
              Produkt
            </option>
            {products.map((element) => {
              return <option value={element.id_product}>{element.name}</option>;
            })}
          </Form.Select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-4 mb-2 signup-btn">
        Utwórz ogłoszenie
      </button>
    </>
  );
}

async function Create(
  title,
  description,
  district,
  city,
  street,
  number,
  coordinates,
  available_dates,
  product_category,
  product,
  photos,
  date
) {
  const announcementData = {
    title,
    description,
    district,
    city,
    street,
    number,
    coordinates,
    available_dates,
    product_category,
    product,
    photos,
    date,
  };

  try {
    const accessToken = getAuthTokenFromCookie();
    const response = await fetch("http://localhost:4000/announcement/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(announcementData),
    });

    if (!response.ok) {
      // Tutaj uzyskać zwrot od api jeżeli coś nie gra
      // if (response.status === 409) return "conflict";
      // else throw new Error("Wystąpił błąd");
    }

    // const data = await response.json();
    // return data;
    return true;
  } catch (error) {
    console.error(error);
  }
}
