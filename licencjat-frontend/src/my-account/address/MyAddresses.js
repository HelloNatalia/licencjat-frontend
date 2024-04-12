import { useEffect, useState } from "react";
import CreateAddress from "./CreateAddress";
import { getAuthTokenFromCookie } from "../../cookies/auth-cookies";
import { useNavigate } from "react-router-dom";
import "./Addresses.css";

export default function MyAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAuthTokenFromCookie();
  const navigation = useNavigate();

  useEffect(function () {
    async function fetchRecipes() {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:4000/address/get-user-addresses`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!res.ok) {
        navigation("/");
      }

      const data = await res.json();
      setIsLoading(false);

      setAddresses(data);
    }
    fetchRecipes();
  }, []);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="col">
      <div className="info-box p-3">
        <div className="row">
          <p className="fs-4">
            Adresy{" "}
            <span className="ms-3">
              <CreateAddress />
            </span>
          </p>
        </div>
        <div className="row px-3">
          {addresses && Array.isArray(addresses) ? (
            addresses.map((address) => {
              return <Address address={address} />;
            })
          ) : (
            <p>Nie masz jeszcze wpisanego adresu</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Address({ address }) {
  const accessToken = getAuthTokenFromCookie();

  const handleDeleteAddress = async (id) => {
    const res = await fetch(
      `http://localhost:4000/address/delete-user-address/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
      }
    );
    if (!res.ok) {
      console.error("Failed deleting address");
    }
    window.location.reload();
  };
  return (
    <div className="col-12 col-md-6 col-lg-3 my-2">
      <div className="address-box p-2 text-center">
        <p>
          {address.street} {address.number}
        </p>
        <p>
          {address.postal_code} {address.city}
        </p>
        <p>
          {address.district ? (
            `(${address.district})`
          ) : (
            <span className="text-transparent">dzielnica</span>
          )}
        </p>
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteAddress(address.id_address)}
        >
          <i class="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
}
