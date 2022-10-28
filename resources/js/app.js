import '../css/app.css'


const findUserLocation = () => {

    const status = document.querySelector('.status')
    const success = (position) => {
        status.textContent = position.coords.latitude + ':' + position.coords.longitude
        console.log(position.coords);
    }

    const error = () => {
        status.textContent = "Can't access your location"
    }

    navigator.geolocation.getCurrentPosition(success, error)
}

document.querySelector('.btn-geo').addEventListener('click', findUserLocation)