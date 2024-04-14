import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// https://github.com/PaulLeCam/react-leaflet/issues/1052
import "./AnnouncementsMap.css";
import { useState, useEffect } from "react";
import { fetchPhoto } from "../helpers/FetchPhoto.js";

import { CategoryMarker } from "../helpers/icons-declaration.js";

export default function AnnouncementsMap({
  handleSelection,
  announcements_aray,
  mapCenter,
}) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (mapCenter !== null) {
      console.log(mapCenter);
      setUserLocation(mapCenter.value);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Błąd geolokalizacji:", error);
        }
      );
    }
  }, [mapCenter]);

  return (
    <div className="row p-4">
      <div className="col map-col">
        <MapContainer
          center={
            userLocation
              ? userLocation
              : [51.685555094635546, 18.984997985743345]
          }
          zoom={13}
          scrollWheelZoom={true}
          className="map-area"
        >
          <MapComponent userLocation={userLocation} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {announcements_aray.map((element) => {
            const coordinatesArray = element.coordinates.split(",");
            return (
              <Marker
                icon={CategoryMarker(
                  element.product_category.id_product_category
                )}
                position={coordinatesArray}
                eventHandlers={{
                  click: (e) => {
                    handleSelection(element.id_announcement);
                  },
                }}
              >
                <Tooltip className="map-tooltip">
                  <LargeTooltip element={element} />
                  <SmallTooltip element={element} />
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

function MapComponent({ userLocation }) {
  const map = useMap();

  useEffect(() => {
    // Jeśli lokalizacja użytkownika jest dostępna, ustawia środek mapy
    if (userLocation) {
      map.setView(userLocation, 13);
    }
  }, [map, userLocation]);

  return null;
}

function LargeTooltip({ element }) {
  const output = getDates(element);
  const dayDifference = output[0];
  const productDate = output[1];

  const [photoUrl, setPhotoUrl] = useState(null);
  let photoNamesArray = element.photos.slice(1, -1).split('","');
  photoNamesArray = photoNamesArray.map((name) => name.replace(/^"|"$/g, ""));
  useEffect(() => {
    fetchPhoto(photoNamesArray[0], setPhotoUrl);
  }, []);

  return (
    <div className="d-none d-lg-block">
      <div className="d-flex">
        <div>
          <p className="title">{element.title}</p>
          <div className="d-flex align-items-center">
            <img
              className="map-tooltip-user-img"
              src="user.png"
              alt="użytkownik"
            />
            <p className="map-tooltip-user-name">{element.user.username}</p>
          </div>
          <p className="exp-date">
            Data ważności: <span>{productDate}</span>
          </p>
          <p className="map-tooltip-days-left">Zostało {dayDifference} dni</p>
        </div>
        <img
          className="ms-4 map-tooltip-product-img"
          src={photoUrl}
          alt="produkt"
        />
      </div>
    </div>
  );
}

function SmallTooltip({ element }) {
  const output = getDates(element);
  const dayDifference = output[0];
  const productDate = output[1];

  const [photoUrl, setPhotoUrl] = useState(null);
  let photoNamesArray = element.photos.slice(1, -1).split('","');
  photoNamesArray = photoNamesArray.map((name) => name.replace(/^"|"$/g, ""));
  useEffect(() => {
    fetchPhoto(photoNamesArray[0], setPhotoUrl);
  }, []);

  return (
    <div className="d-md-block d-lg-none">
      <div className="text-center">
        <p className="title-sm d-block">{element.title}</p>
        <div className="d-flex justify-content-center align-items-center">
          <img
            className="map-tooltip-user-img"
            src="user.png"
            alt="użytkownik"
          />
          <p className="map-tooltip-user-name">{element.user.username}</p>
        </div>

        <p className="exp-date">
          Data ważności: <span>{productDate}</span>
        </p>
        <p className="map-tooltip-days-left">Zostało {dayDifference} dni</p>
      </div>
      <div className="text-center mt-3">
        <img
          className="map-tooltip-product-img d-block"
          src={photoUrl}
          alt="produkt"
        />
      </div>
    </div>
  );
}

export function getDates(element) {
  const date = new Date(element.date);
  const today = new Date();
  const differenceInMs = date - today;
  const dayDifference = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const productDate = `${day}-${month < 10 ? "0" : ""}${month}-${year}`;

  return [dayDifference, productDate];
}
