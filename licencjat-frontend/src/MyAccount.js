import { useNavigate } from "react-router-dom";
import "./MyAccount.css";
import { useEffect, useState } from "react";
import {
  getAuthTokenFromCookie,
  removeAuthTokenCookie,
} from "./cookies/auth-cookies";
import EditAccountForm from "./EditAccountForm";
import MyAddresses from "./my-account/address/MyAddresses";

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
      <p>{userData.username}</p>
      <p>
        {userData.name} {userData.surname}
      </p>
      <p>{userData.email}</p>
      <p>{userData.phone_number}</p>
      <EditAccountForm accountData={userData} />
      <btn className="btn btn-danger" onClick={handleDeleteAccount}>
        Usuń konto
      </btn>
      <MyAddresses />
    </div>
  );
}
