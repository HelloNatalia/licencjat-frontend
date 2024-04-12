import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";

export default function MapModel({ handleCoordinationChange }) {
  const [show, setShow] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMarkerClick = (position) => {
    const positionArray = position.lat + "," + position.lng;
    handleCoordinationChange(positionArray);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Błąd geolokalizacji:", error);
      }
    );
  }, []);

  return (
    <>
      <p onClick={handleShow}>Wskaż miejsce na mapie</p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wybierz miejsce na mapie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MapContainer
            center={
              userLocation
                ? userLocation
                : [52.22985192295657, 21.01171020569338]
            }
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker handleMarkerClick={handleMarkerClick} />
          </MapContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function LocationMarker({ handleMarkerClick }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      handleMarkerClick(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const marker = L.icon({
    iconUrl: "markers/blue-marker.png",
    iconSize: [38, 38],
    iconAnchor: [19, 37],
    popupAnchor: [-0, -33],
  });

  return position === null ? null : (
    <Marker position={position} icon={marker}></Marker>
  );
}
