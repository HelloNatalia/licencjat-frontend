import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// https://github.com/PaulLeCam/react-leaflet/issues/1052
import "./AnnouncementsMap.css";

import { CategoryMarker } from "./icons-declaration.js";

export default function AnnouncementsMap({
  handleSelection,
  announcements_aray,
}) {
  return (
    <div className="row">
      <div className="col map-col m-4">
        <MapContainer
          center={[53.412554539511184, 14.527779834142521]}
          zoom={13}
          scrollWheelZoom={true}
          className="map-area"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {announcements_aray.map((element) => {
            return (
              <Marker
                icon={CategoryMarker(element.id_product_category)}
                position={element.coordinates}
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

function LargeTooltip({ element }) {
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
            <p className="map-tooltip-user-name">Anna</p>
          </div>
          <p className="exp-date">
            Data ważności: <span>15.02.2024</span>
          </p>
          <p className="map-tooltip-days-left">Zostało 7 dni</p>
        </div>
        <img
          className="ms-4 map-tooltip-product-img"
          src="announcement-img/rect.png"
          alt="produkt"
        />
      </div>
    </div>
  );
}

function SmallTooltip({ element }) {
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
          <p className="map-tooltip-user-name">Anna</p>
        </div>

        <p className="exp-date">
          Data ważności: <span>15.02.2024</span>
        </p>
        <p className="map-tooltip-days-left">Zostało 7 dni</p>
      </div>
      <div className="text-center mt-3">
        <img
          className="map-tooltip-product-img d-block"
          src="announcement-img/rect.png"
          alt="produkt"
        />
      </div>
    </div>
  );
}
