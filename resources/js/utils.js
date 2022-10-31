
async function getPlaceRestaurants(long, lat){
    const apiKeyGeo = "284a2a00975a44d3898454f392083147"
    let longitude = long || 4.34878
    let latitude = lat || 50.85045
    let data;
    const req = await fetch(`https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.fast_food&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=100&apiKey=${apiKeyGeo}`)
    let res = await req.json()
    data = res.features
    
    return data
  
  
  }

const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
module.exports = { getPlaceRestaurants, greenIcon }