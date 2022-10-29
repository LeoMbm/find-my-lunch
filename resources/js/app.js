import '../css/app.css'

const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key') || 'yMtHBYOPegMyHXBpnzTa';

function createMap(lat, long){
  if (lat || long) {
    const map = L.map('map').setView([lat , long], 15);
    const gl = L.maplibreGL({
      attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
      style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`
    }).addTo(map);
    
    L.marker([lat , long]).addTo(map);
  } else {
    const map = L.map('map').setView([50.85045 , 4.34878], 15);
    const gl = L.maplibreGL({
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`
      }).addTo(map);
      
      L.marker([50.85045 , 4.34878]).addTo(map);
    
  }
}

const findUserLocation = () => {

    // const status = document.querySelector('.status')
    const success = (position) => {
      let coords = position.coords;
      setMapWithLocation(position);
    }

    const error = () => {
        console.log('Please enable your location');
        createMap()
    }
    navigator.geolocation.getCurrentPosition(success, error)
}

function setMapWithLocation(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  createMap(latitude, longitude)

 

 

}
window.addEventListener('load',findUserLocation);




// document.querySelector('.btn-geo').addEventListener('click', findUserLocation)

