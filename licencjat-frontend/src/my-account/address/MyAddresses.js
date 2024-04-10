import { useEffect, useState } from "react";
import CreateAddress from "./CreateAddress";
import { getAuthTokenFromCookie } from "../../cookies/auth-cookies";
import { useNavigate } from "react-router-dom";

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
    <>
      <CreateAddress />
      <div>
        {addresses && Array.isArray(addresses) ? (
          addresses.map((address) => {
            return <Address address={address} />;
          })
        ) : (
          <p>Nie masz jeszcze wpisanego adresu</p>
        )}
      </div>
    </>
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
    <div>
      <p>
        {address.city}
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteAddress(address.id_address)}
        >
          Usuń adres
        </button>
      </p>
      <p>
        {address.street} {address.number}
      </p>
    </div>
  );
}
