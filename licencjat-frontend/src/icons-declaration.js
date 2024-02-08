import L from "leaflet";

export function CategoryMarker(category_id) {
  switch (category_id) {
    case 1:
      return blueMarker;
    case 2:
      return greenMarker;
    default:
      return blueMarker;
  }
}

const blueMarker = L.icon({
  iconUrl: "markers/blue-marker.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const greenMarker = L.icon({
  iconUrl: "markers/green-marker.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});
