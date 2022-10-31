import '../css/app.css'
import { getPlaceRestaurants, greenIcon, addressAutocomplete } from './utils';

const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key') || 'yMtHBYOPegMyHXBpnzTa';

let map;

function createMap(lat, long){
  /* Initialize variables for marker (point in map)*/
  let marker;
  let defaultMarker;

  
  if (lat || long) {
    map = L.map('map').setView([lat , long], 17);
    const gl = L.maplibreGL({
      attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
      style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`
    }).addTo(map);
    let restoAroundUser = getPlaceRestaurants(long,lat)
    restoAroundUser.then(function (result){
      displayCardForRestaurant(result)
  
      result.forEach(i => {
        let resto_name = i.properties.name || i.properties.address_line1
        let resto_address = i.properties.address_line2
        
        let resto_long  = i.geometry.coordinates[0]
        let resto_lat  = i.geometry.coordinates[1]
        marker = L.marker([resto_lat ,resto_long]).addTo(map);
        marker.bindPopup(`<b>${resto_name}</b><br>${resto_address}.`).openPopup();
        
      });
      let user_marker = L.marker([lat , long],{icon: greenIcon}).addTo(map);
      user_marker.bindPopup(`<b>You</b><br>This is your position.`).openPopup();
  
    })

    marker = L.marker([lat , long]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  } else {
    map = L.map('map').setView([50.85045 , 4.34878], 17);
    const gl = L.maplibreGL({
      attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
      style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`
    }).addTo(map);
    let restoAroundBxl = getPlaceRestaurants()
    restoAroundBxl.then(function (result){
      displayCardForRestaurant(result)
      result.forEach(i => {
      let resto_name = i.properties.name || i.properties.address_line1
      let resto_address = i.properties.address_line2
      
      let resto_long  = i.geometry.coordinates[0]
      let resto_lat  = i.geometry.coordinates[1]
      marker = L.marker([resto_lat ,resto_long]).addTo(map);
      marker.bindPopup(`<b>${resto_name}</b><br>${resto_address}.`).openPopup();
      
    });
    defaultMarker = L.marker([50.85045 , 4.34878],{icon: greenIcon}).addTo(map);
    defaultMarker.bindPopup(`<b>Current Position</b><br>Default.`).openPopup();

  })

    

      
    
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

function setMarkerOnMap(lat, long){

    let newMarker = L.marker([lat , long],{icon: greenIcon}).addTo(map);
    newMarker.bindPopup(`<b>New Position</b><br>Default.`).openPopup();
    console.log('successful');

}

function displayCardForRestaurant(array){
  let container = document.getElementById("card-container");


  array.forEach(i => {
    let resto_name = i.properties.name || i.properties.address_line1
    let resto_address = i.properties.address_line2
    
    let resto_long  = i.geometry.coordinates[0]
    let resto_lat  = i.geometry.coordinates[1]
    let article = document.createElement("article");
    article.setAttribute("class", "overflow-hidden h-4/12 w-full cursor-pointer rounded-lg shadow transition hover:shadow-lg")
    container.append(article)
    let img = document.createElement("img");
    img.setAttribute("class", "h-56 w-full object-cover")
    img.src = `https://source.unsplash.com/random?${resto_name}`
    article.append(img)
    let divCard = document.createElement("div")
    divCard.setAttribute("class", "bg-white p-4 sm:p-6")
    article.append(divCard)
    let item_name = document.createElement("p")
    item_name.setAttribute("class", "block text-xs text-gray-500")
    item_name.textContent = resto_name
    divCard.append(item_name)
    let item_address = document.createElement("h3")
    item_address.setAttribute("class", "mt-0.5 text-lg text-gray-900")
    item_address.textContent = resto_address
    divCard.append(item_address)
    let item_text = document.createElement("p")
    item_text.setAttribute("class", "mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3")
    divCard.append(item_text)
    
  });

}



addressAutocomplete(document.getElementById("autocomplete-container"), (data) => {
  console.log("Selected option: ");
  console.log(data);
  
  setMarkerOnMap(data.geometry.coordinates[1],data.geometry.coordinates[0])
  let restoAroundSearch = getPlaceRestaurants(data.geometry.coordinates[0],data.geometry.coordinates[1])
  restoAroundSearch.then(function (result){
    displayCardForRestaurant(result)
    result.forEach(i => {
    let resto_name = i.properties.name || i.properties.address_line1
    let resto_address = i.properties.address_line2
    
    let resto_long  = i.geometry.coordinates[0]
    let resto_lat  = i.geometry.coordinates[1]
    let marker = L.marker([resto_lat ,resto_long]).addTo(map);
    marker.bindPopup(`<b>${resto_name}</b><br>${resto_address}.`).openPopup();
    
  });


})

  
}, {
	placeholder: "Enter an address here"
});

window.addEventListener('load',findUserLocation);




// document.querySelector('.btn-geo').addEventListener('click', findUserLocation)

