import '../css/app.css'
import { getPlaceRestaurants, greenIcon } from './utils';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key') || 'yMtHBYOPegMyHXBpnzTa';

let map;

function createMap(lat, long){
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

function addressAutocomplete(containerElement, callback, options) {
  // create input element
  var inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("class", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
  inputElement.setAttribute("placeholder", options.placeholder);
  containerElement.appendChild(inputElement);

  // add input field clear button
  var clearButton = document.createElement("div");
  clearButton.classList.add("clear-button");
  clearButton.setAttribute("class","clear-button btn-location flex absolute inset-y-0 right-0 items-center pr-3");
  addIcon(clearButton);
  clearButton.addEventListener("click", (e) => {
    e.stopPropagation();
    inputElement.value = '';
    callback(null);
    clearButton.classList.remove("visible");
    closeDropDownList();
  });
  containerElement.appendChild(clearButton);

  /* Current autocomplete items data (GeoJSON.Feature) */
  var currentItems;

  /* Active request promise reject function. To be able to cancel the promise when a new request comes */
  var currentPromiseReject;

  /* Focused item in the autocomplete list. This variable is used to navigate with buttons */
  var focusedItemIndex;

  /* Execute a function when someone writes in the text field: */
  inputElement.addEventListener("input", function(e) {
    var currentValue = this.value;

    /* Close any already open dropdown list */
    closeDropDownList();

    // Cancel previous request promise
    if (currentPromiseReject) {
      currentPromiseReject({
        canceled: true
      });
    }

    if (!currentValue) {
      clearButton.classList.remove("visible");
      return false;
    }

    // Show clearButton when there is a text
    clearButton.classList.add("visible");

    /* Create a new promise and send geocoding request */
    var promise = new Promise((resolve, reject) => {
      currentPromiseReject = reject;

      var apiKey = "284a2a00975a44d3898454f392083147";
      var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentValue)}&lang=fr&filter=countrycode:be&limit=5&apiKey=${apiKey}`;
      
      if (options.type) {
      	url += `&type=${options.type}`;
      }

      fetch(url)
        .then(response => {
          // check if the call was successful
          if (response.ok) {
            response.json().then(data => resolve(data));
          } else {
            response.json().then(data => reject(data));
          }
        });
    });

    promise.then((data) => {
      currentItems = data.features;

      /*create a DIV element that will contain the items (values):*/
      var autocompleteItemsElement = document.createElement("div");
      autocompleteItemsElement.setAttribute("class", "autocomplete-items");
      containerElement.appendChild(autocompleteItemsElement);

      /* For each item in the results */
      data.features.forEach((feature, index) => {
        /* Create a DIV element for each element: */
        var itemElement = document.createElement("DIV");
        /* Set formatted address as item value */
        itemElement.innerHTML = feature.properties.formatted;

        /* Set the value for the autocomplete text field and notify: */
        itemElement.addEventListener("click", function(e) {
          inputElement.value = currentItems[index].properties.formatted;

          callback(currentItems[index]);

          /* Close the list of autocompleted values: */
          closeDropDownList();
        });

        autocompleteItemsElement.appendChild(itemElement);
      });
    }, (err) => {
      if (!err.canceled) {
        console.log(err);
      }
    });
  });

  /* Add support for keyboard navigation */
  inputElement.addEventListener("keydown", function(e) {
    var autocompleteItemsElement = containerElement.querySelector(".autocomplete-items");
    if (autocompleteItemsElement) {
      var itemElements = autocompleteItemsElement.getElementsByTagName("div");
      if (e.key == 40) {
        
        e.preventDefault();
        /*If the arrow DOWN key is pressed, increase the focusedItemIndex variable:*/
        focusedItemIndex = focusedItemIndex !== itemElements.length - 1 ? focusedItemIndex + 1 : 0;
        /*and and make the current item more visible:*/
        setActive(itemElements, focusedItemIndex);
      } else if (e.key == 38) {
        e.preventDefault();

        /*If the arrow UP key is pressed, decrease the focusedItemIndex variable:*/
        focusedItemIndex = focusedItemIndex !== 0 ? focusedItemIndex - 1 : focusedItemIndex = (itemElements.length - 1);
        /*and and make the current item more visible:*/
        setActive(itemElements, focusedItemIndex);
      } else if (e.key == 13) {
        /* If the ENTER key is pressed and value as selected, close the list*/
        e.preventDefault();
        if (focusedItemIndex > -1) {
          closeDropDownList();
        }
      }
    } else {
      if (e.key == 40) {
        /* Open dropdown list again */
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        inputElement.dispatchEvent(event);
      }
    }
  });

  function setActive(items, index) {
    if (!items || !items.length) return false;

    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove("autocomplete-active");
    }

    /* Add class "autocomplete-active" to the active element*/
    items[index].classList.add("autocomplete-active");

    // Change input value and notify
    inputElement.value = currentItems[index].properties.formatted;
    callback(currentItems[index]);
  }

  function closeDropDownList() {
    var autocompleteItemsElement = containerElement.querySelector(".autocomplete-items");
    if (autocompleteItemsElement) {
      containerElement.removeChild(autocompleteItemsElement);
    }

    focusedItemIndex = -1;
  }

  function addIcon(buttonElement) {
    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svgElement.setAttribute('viewBox', "0 0 24 24");
    svgElement.setAttribute('height', "24");

    var iconElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    iconElement.setAttribute("d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
    iconElement.setAttribute('fill', 'currentColor');
    svgElement.appendChild(iconElement);
    buttonElement.appendChild(svgElement);
  }
  
    /* Close the autocomplete dropdown when the document is clicked. 
  	Skip, when a user clicks on the input field */
  document.addEventListener("click", function(e) {
    if (e.target !== inputElement) {
      closeDropDownList();
    } else if (!containerElement.querySelector(".autocomplete-items")) {
      // open dropdown list again
      var event = document.createEvent('Event');
      event.initEvent('input', true, true);
      inputElement.dispatchEvent(event);
    }
  });

}

addressAutocomplete(document.getElementById("autocomplete-container"), (data) => {
  console.log("Selected option: ");
  console.log(data);
}, {
	placeholder: "Enter an address here"
});

window.addEventListener('load',findUserLocation);




// document.querySelector('.btn-geo').addEventListener('click', findUserLocation)

