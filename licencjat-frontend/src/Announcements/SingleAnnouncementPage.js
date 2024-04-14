import { useEffect, useState } from "react";
import { getAuthTokenFromCookie } from "../cookies/auth-cookies";
import { Images, MainInfo, PickupInfo, ProductInfo } from "./AnnouncementPage";
import { useLocation } from "react-router-dom";
import "./AnnouncementPage.css";

export default function SingleAnnouncementPage() {
  const [selected_announcement, setSelectedAnnouncement] = useState(null);
  const accessToken = getAuthTokenFromCookie();
  const [showButton, setShowButton] = useState(true);
  const [createdRequest, setCreatedRequest] = useState("");

  const [announcementId, setAnnouncementId] = useState("");

  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    if (id && id != "") setAnnouncementId(id);
    console.log("ID: ", id);
  }, []);

  useEffect(
    function () {
      async function fetchAnnouncement() {
        const res = await fetch(
          `http://localhost:4000/announcement/single-announcement/${announcementId}`
        );
        if (res.ok) {
          const data = await res.json();
          setSelectedAnnouncement(data);
          console.log("Dane: ", data);
        }
      }
      fetchAnnouncement();
    },
    [announcementId]
  );

  useEffect(
    function () {
      async function checkRequest() {
        const res = await fetch(`http://localhost:4000/request/sent-requests`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) {
          if (res.status === 401) {
            setShowButton(true);
          }
        }
        const requests = await res.json();
        let requestExists = null;
        if (Array.isArray(requests)) {
          requestExists = requests.some((request) => {
            return (
              request.announcement.id_announcement ===
              selected_announcement.id_announcement
            );
          });
        }
        if (requestExists) setShowButton(false);
      }
      if (selected_announcement && accessToken) checkRequest();
    },
    [selected_announcement, createdRequest]
  );
  if (!selected_announcement) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <div className="row px-4 pt-1 pb-4">
        <div className="col-12 col-md-6 mt-3">
          <Images selected_announcement={selected_announcement} />
        </div>
        <div className="col-12 col-md-6 mt-3">
          <MainInfo selected_announcement={selected_announcement} />
        </div>
        <div className="col-12 col-md-6 mt-3">
          {" "}
          <ProductInfo
            selected_announcement={selected_announcement}
            showButton={showButton}
            setCreatedRequest={setCreatedRequest}
          />
        </div>
        <div className="col-12 col-md-6 mt-3">
          <PickupInfo selected_announcement={selected_announcement} />
        </div>
      </div>
    </div>
  );
}
