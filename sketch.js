// making a map
const mymap = L.map("issMap").setView([0, 0], 0);

// mkaing the tiles
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// making the icon for the marker
const issIcon = L.icon({
  iconUrl: "iss200.png",
  iconSize: [80, 62],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
marker
  .bindPopup("<b>Hello world!</b><br> I am The Internationl Space Station")
  .openPopup();

// API Location
const url = "https://api.wheretheiss.at/v1/satellites/25544";

// mkaing a function fro the data
async function getISS() {
  // geting the dat a
  const response = await fetch(url);
  const data = await response.json();
  const { latitude, longitude, altitude, velocity } = data;
  let zoomNum = true;
  //const zoom = altitude / 100;

  // placing the marker
  marker.setLatLng([latitude, longitude]);
  // changing the view
  if (zoomNum) {
    mymap.setView([latitude, longitude], 4);
    zoomNum = false;
  }

  // mkaing a circle
  // adding a circel on my iss
  const circle = L.circle([latitude, longitude], {
    color: "yellow",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(mymap);

  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("lon").textContent = longitude.toFixed(2);
  document.getElementById("alt").textContent = altitude.toFixed(2);
  document.getElementById("vel").textContent = velocity.toFixed(2);
}

// excuting the function
setInterval(getISS, 1000);
