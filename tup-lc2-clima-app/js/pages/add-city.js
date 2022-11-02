const formulario = document.querySelector('#form-city-list') // se crea la variable formulario
const resultado = document.querySelector('#section-weather-result') // se crea la variable resultado 
const textoIngreso = document.querySelector('#text') // se crea la variable para ingresar un texto 
const form = document.querySelector('#form-reset') // se creo para resetear el formulario



texto = {
    ciudad: ''
}

textoIngreso.addEventListener('input', (e) => {     
    //console.log(e.target.value)
    texto.ciudad = e.target.value
    console.log(texto)
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault()   
    form.reset()
    textoIngreso.focus()         
    var { ciudad } = texto
    ciudad = ciudad.toUpperCase() // Mayuscula
    city = ciudad.trim()
    if ( city.length === 0){
        return
    }        
    console.log(city.length)    
    console.log(ciudad)    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37ebcd611189db128aceca19a0ca7c49&units=metric&lang=es`    
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            if (data.message === 'city not found') {
                // console.log('ciudad no encontrada')
                resultado.innerHTML = `<p class="danger">Error: La ciudad ingresada no se encuentra en la API o seprodujo un error al consultar</p>`
                setTimeout(() => {
                    resultado.innerHTML = ''
                }, 3000);
            }
            else {
                let bandera = 1                
                const ciudades = getCitiesFromLocalStorage()
                ciudades.forEach(element => {
                    if ( element === ciudad ){
                        resultado.innerHTML = `<p class="amarillo">La ciudad ingresada ya se encuentra almacenada</p>`
                        setTimeout(() => {
                            resultado.innerHTML = ''
                        }, 3000);
                        bandera = 0
                    }                                      
                });
                if ( bandera === 1){
                    addNewCityToLocalStorage(ciudad)
                    resultado.innerHTML = `<p class="todoOk">Ciudad agregada con exito</p>`
                    setTimeout(() => {
                        resultado.innerHTML = ''
                    }, 3000);
                }                
            }
        })
        .catch(err => console.log(err))
})


function addNewCityToLocalStorage(newCity) {
    let cities = getCitiesFromLocalStorage();
    cities.push(newCity);
    localStorage.setItem("cities", JSON.stringify(cities));
}

function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("cities");
    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

document.addEventListener('DOMContentLoaded', getCitiesFromLocalStorage, textoIngreso.focus())

