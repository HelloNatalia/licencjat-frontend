import { useNavigate } from "react-router-dom";
import "./CreateAnnouncement.css";
import { getAuthTokenFromCookie } from "./cookies/auth-cookies";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import SelectComponent from "./selectComponent";
import { Button } from "react-bootstrap";

export default function CreateAnnouncement() {
  const accessToken = getAuthTokenFromCookie();
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

  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col">
            <CreateAnnouncementForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateAnnouncementForm() {
  const [pickupDates, setPickupDates] = useState(null);

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
    const newDate = {
      date: formik.values.pickup_date,
      hour: [formik.values.pickup_hour_1, formik.values.pickup_hour_2],
    };
    console.log(newDate);
    setPickupDates(...pickupDates, newDate);
  };

  return (
    <>
      <p className="fs-4 mb-1">Tworzenie ogłoszenia</p>
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

        <label className="form-label mt-3" htmlFor="photos">
          Zdjęcia*
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          className="form-control"
          hidden
          onChange={formik.handleChange}
          value={formik.values.photos}
        />

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
              type="date"
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
              type="date"
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
                <tr>
                  {pickupDates.map((element) => {
                    return (
                      <>
                        <td>{element.date}</td>
                        <td>
                          {element.hour[0]} - {element.hour[1]}
                        </td>
                      </>
                    );
                  })}
                </tr>
              </table>
            ) : (
              ""
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4 mb-2 signup-btn">
          Utwórz ogłoszenie
        </button>
      </form>
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
) {}
