const select = document.querySelector('#select') // creamos una variable select
const formCityList = document.querySelector('#form-city-list') // creamos la variable formulario
const sectionWeatherResult = document.querySelector('#section-weather-result') // creamos la variable resultado



let ciudad = ''


select.addEventListener('input', (e) => {
    // console.log(e.target.value)
    ciudad = e.target.value
})
formCityList.addEventListener('submit', (e) => {
    e.preventDefault()    
    console.log(ciudad)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=37ebcd611189db128aceca19a0ca7c49&units=metric&lang=es`   
    fetch(url)
        .then(res => {
            return res.json()})
        .then(data => {            
            console.log(data)            
            sectionWeatherResult.innerHTML = `<div class="card">
            <h3>${ciudad}</h3>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" style="
            filter: drop-shadow(1px 0px 5px #000);">
            <p>Temperatura: ${data.main.temp}º</p>
            <p>Sensación Térmica: ${data.main.feels_like}º</p>
            <p>Humedad: ${data.main.humidity}%</p>
            <p>Velocidad de viento: ${data.main.pressure}km/h</p>
            <p>Presión: ${data.wind.speed} P</p>
        </div>`        
        })
})

function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("cities"); // obtenemos los valores de key cities
    if (cities) { // cities tiene contenido ?
        console.log(cities)
        cities = JSON.parse(cities);   // convertimos el str json para recorrerlo con un for
        console.log(cities)
        cities.forEach(element => { // recorremos el array cities
            const opcion = document.createElement('OPTION') // creas el option
            opcion.textContent = `${element}` // se agrega el contenido de texto
            opcion.value = `${element}` // se agrega el value
            select.appendChild(opcion) // se agrega el opcion al select      
        });
    } else { // sino tiene contenido,creamos un array vacio
        cities = [];
    }
    return cities; // devuelve el contenido parciado json de localstorage ( para volver a utilizarlo)
}

document.addEventListener('DOMContentLoaded', getCitiesFromLocalStorage)