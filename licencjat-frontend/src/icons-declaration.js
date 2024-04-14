import L from "leaflet";

export function CategoryMarker(category_id) {
  switch (category_id) {
    case "b50911cb-569d-489d-befa-eed78def1d8f":
      return orangeMarker;
    case "bd45d7a1-5811-4b85-8d5a-77839faca224":
      return lightGreenMarker;
    case "ccda8028-94c5-46b2-ae5f-f1c0e162c0b8":
      return brownMarker;
    case "d305da6e-e2ed-4a4a-b57f-739c8688592d":
      return lightBlueMarker;
    case "4fcd1ea2-785c-4d17-abee-83d0304c8161":
      return lightPinkMarker;
    case "e9701efc-fd60-4fb4-bde8-fca56286e83d":
      return lightYellowMarker;
    case "17103275-544e-46c2-80e7-4be554a674b1":
      return pinkMarker;
    case "fb751a95-5662-4e3e-9e75-982d1830fecf":
      return blueMarker;
    case "0e8a8a52-73df-4032-ad59-cdcd6a47da3b":
      return seaMarker;
    case "614f1d72-b876-4e64-bb86-94c943150b2b":
      return lightRedMarker;
    case "9e73cb18-9501-4272-bb54-83fe393228bd":
      return violetMarker;
    case "2b8bab7e-a3ce-43be-8dc0-00bb32413d2d":
      return organicMarker;
    default:
      return orangeMarker;
  }
}

const orangeMarker = L.icon({
  iconUrl: "markers/orange-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const lightGreenMarker = L.icon({
  iconUrl: "markers/light-green-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const brownMarker = L.icon({
  iconUrl: "markers/brown-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const lightBlueMarker = L.icon({
  iconUrl: "markers/light-blue-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const lightPinkMarker = L.icon({
  iconUrl: "markers/light-pink-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const lightYellowMarker = L.icon({
  iconUrl: "markers/light-yellow-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const pinkMarker = L.icon({
  iconUrl: "markers/pink-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const blueMarker = L.icon({
  iconUrl: "markers/blue-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const seaMarker = L.icon({
  iconUrl: "markers/sea-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const lightRedMarker = L.icon({
  iconUrl: "markers/light-red-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const violetMarker = L.icon({
  iconUrl: "markers/violet-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

const organicMarker = L.icon({
  iconUrl: "markers/organic-icon.png",
  // shadowUrl: "leaf-shadow.png",
  iconSize: [38, 38], // size of the icon
  // shadowSize: [50, 64],
  iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],
  popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
});

export function getCategoryPhotoName(category_id) {
  switch (category_id) {
    case "b50911cb-569d-489d-befa-eed78def1d8f":
      return "pieczywo-cat.png";
    case "bd45d7a1-5811-4b85-8d5a-77839faca224":
      return "owoce-cat.png";
    case "ccda8028-94c5-46b2-ae5f-f1c0e162c0b8":
      return "mieso-cat.png";
    case "d305da6e-e2ed-4a4a-b57f-739c8688592d":
      return "ryby-cat.png";
    case "4fcd1ea2-785c-4d17-abee-83d0304c8161":
      return "nabial-cat.png";
    case "e9701efc-fd60-4fb4-bde8-fca56286e83d":
      return "tluszcz-cat.png";
    case "17103275-544e-46c2-80e7-4be554a674b1":
      return "cukier-cat.png";
    case "fb751a95-5662-4e3e-9e75-982d1830fecf":
      return "napoje-cat.png";
    case "0e8a8a52-73df-4032-ad59-cdcd6a47da3b":
      return "mrozone-cat.png";
    case "614f1d72-b876-4e64-bb86-94c943150b2b":
      return "przetwory-cat.png";
    case "9e73cb18-9501-4272-bb54-83fe393228bd":
      return "dietetyczne-cat.png";
    case "2b8bab7e-a3ce-43be-8dc0-00bb32413d2d":
      return "organiczne-cat.png";
    default:
      return "pieczywo-cat.png";
  }
}

// const greenMarker = L.icon({
//   iconUrl: "markers/green-marker.png",
//   // shadowUrl: "leaf-shadow.png",
//   iconSize: [38, 38], // size of the icon
//   // shadowSize: [50, 64],
//   iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
//   // shadowAnchor: [4, 62],
//   popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
// });

// const greenMarker = L.icon({
//   iconUrl: "markers/green-marker.png",
//   // shadowUrl: "leaf-shadow.png",
//   iconSize: [38, 38], // size of the icon
//   // shadowSize: [50, 64],
//   iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
//   // shadowAnchor: [4, 62],
//   popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
// });

// const greenMarker = L.icon({
//   iconUrl: "markers/green-marker.png",
//   // shadowUrl: "leaf-shadow.png",
//   iconSize: [38, 38], // size of the icon
//   // shadowSize: [50, 64],
//   iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
//   // shadowAnchor: [4, 62],
//   popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
// });

// const greenMarker = L.icon({
//   iconUrl: "markers/green-marker.png",
//   // shadowUrl: "leaf-shadow.png",
//   iconSize: [38, 38], // size of the icon
//   // shadowSize: [50, 64],
//   iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
//   // shadowAnchor: [4, 62],
//   popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
// });

// const greenMarker = L.icon({
//   iconUrl: "markers/green-marker.png",
//   // shadowUrl: "leaf-shadow.png",
//   iconSize: [38, 38], // size of the icon
//   // shadowSize: [50, 64],
//   iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
//   // shadowAnchor: [4, 62],
//   popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
// });

// const greenMarker = L.icon({
//   iconUrl: "markers/green-marker.png",
//   // shadowUrl: "leaf-shadow.png",
//   iconSize: [38, 38], // size of the icon
//   // shadowSize: [50, 64],
//   iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
//   // shadowAnchor: [4, 62],
//   popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
// });

// const greenMarker = L.icon({
//   iconUrl: "markers/green-marker.png",
//   // shadowUrl: "leaf-shadow.png",
//   iconSize: [38, 38], // size of the icon
//   // shadowSize: [50, 64],
//   iconAnchor: [19, 37], // point of the icon which will correspond to marker's location
//   // shadowAnchor: [4, 62],
//   popupAnchor: [-0, -33], // point from which the popup should open relative to the iconAnchor
// });
