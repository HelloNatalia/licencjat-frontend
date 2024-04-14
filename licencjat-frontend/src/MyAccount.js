import { useNavigate } from "react-router-dom";
import "./MyAccount.css";
import { useEffect, useState } from "react";
import {
  getAuthTokenFromCookie,
  removeAuthTokenCookie,
} from "./cookies/auth-cookies";
import EditAccountForm from "./EditAccountForm";
import MyAddresses from "./my-account/address/MyAddresses";
import { Ratings } from "./SpecificAccount";

export default function MyAccount() {
  const navigation = useNavigate();
  const accessToken = getAuthTokenFromCookie();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      navigation("/login");
    }
  }, [accessToken, navigation]);

  useEffect(function () {
    async function fetchUserData() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/auth/user-data`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) navigation("/login");
      }
      setUserData(data);
      setIsLoading(false);
    }
    fetchUserData();
  }, []);

  if (isLoading) return <div>Loading ...</div>;

  const handleDeleteAccount = async () => {
    const res = await fetch("http://localhost:4000/auth/delete-account", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });
    if (!res.ok) {
      if (res.status === 401) navigation("/login");
    }
    removeAuthTokenCookie();
    window.location.reload();
  };

  return (
    <div className="content">
      <div className="container p-3">
        <p className="fs-3">Moje konto</p>
        <div className="row my-3">
          <div className="col">
            <UserData
              userData={userData}
              handleDeleteAccount={handleDeleteAccount}
            />
          </div>
        </div>
        <div className="row my-3">
          <MyAddresses />
        </div>
        <div className="row my-3">
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="info-box p-3">
                  <p className="fs-4">Opinie</p>
                  <Ratings userId={userData.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserData({ userData, handleDeleteAccount }) {
  return (
    <div className="row">
      <div className="col">
        <div className="info-box p-3">
          <div className="row p-2">
            <div className="col-12 col-lg-6">
              <p className="fw-bold fs-3">{userData.username}</p>
              <p className="fs-4">
                {userData.name} {userData.surname}
              </p>
            </div>
            <div className="col-12 col-md-6 mt-2">
              <p>
                <span className="text-grey me-3">email:</span> {userData.email}
              </p>
              <p>
                <span className="text-grey me-3">numer telefonu:</span>{" "}
                {userData.phone_number}
              </p>
              <EditAccountForm accountData={userData} />
              <btn className="btn btn-danger" onClick={handleDeleteAccount}>
                Usuń konto
              </btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
