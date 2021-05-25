const progress = document.getElementById('progress')
const indicador = document.getElementById('indicador')
const key = "0dba67889a785f40b2d56836dcea7bdf";
const circle_termometro = document.getElementById('circle_termometro')
const btn_search = document.getElementById('btn_search')
const template_information = document.getElementById('template_information').content
const conte_information = document.getElementById('conte_information')
const fragment = document.createDocumentFragment();
const temp_number = document.getElementById('temp_number')
const form = document.querySelector('form')

btn_search.addEventListener('click', (e) => {
    e.preventDefault()
    GetDatosApi()
    form.reset()
})

/******************Obteniendo Datos De La Api :S**********************/
const GetDatosApi = async () => {
    const input_text = document.getElementById('input_text').value
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${input_text}&appid=0dba67889a785f40b2d56836dcea7bdf&lang=es`;

    try {

        const data = await fetch(url)
        const results = await data.json()
        const temperatura = Math.round(results.main.temp - 273.15)
        const icon_img = results.weather[0].icon
        /**********transformando los datos de temperatura de kelvin a celcius**************/
        let temp1 = Math.round(results.main.temp_min - 273.15)
        let temp2 = Math.round(results.main.temp_max - 273.1)

        /*************guardando los datos recibidos en un objeto********************* */
        const ObjeDatos = {
            name: results.name,
            temp_max: temp1,
            temp_min: temp2,
            humidity: results.main.humidity,
            icon: `http://openweathermap.org/img/wn/${icon_img}.png`,
            description: results.weather[0].description
        }

        /*******funcion para animar el termometro :S***************** */
        termometro(temperatura)
        /********funcion para agregar datos */
        AddDatos(ObjeDatos)

    } catch (error) {
        swal("Ocurrio Un Error!", "No Pudimos Encontrar Los Datos!", "error");
    }
}

/******funcion para agregar datos al html :S */
const AddDatos = (index) => {
    conte_information.innerHTML = ''
    template_information.querySelector('.temp_min').textContent = `Temperaturas : ${index.temp_min}°c / `
    template_information.querySelector('.temp_max').textContent = index.temp_max + '°c'
    template_information.querySelector('.icon').setAttribute('src', index.icon)
    template_information.querySelector('.description').textContent = `Description : ${index.description}`
    template_information.querySelector('.humidity').textContent = `Humidity : ${index.humidity}%`
    template_information.querySelector('.nombre').textContent = `Pais : ${index.name}`
    const clone = template_information.cloneNode(true)
    fragment.appendChild(clone)
    conte_information.appendChild(fragment)
}

/******funcion para animar el termometro :S */
const termometro = (index) => {
    temp_number.textContent = `${index}°c`
    if (index >= 26) {
        progress.style.height = `${index}%`
        indicador.style.backgroundColor = `rgb(255, 62, 62)`
        circle_termometro.style.backgroundColor = `rgb(245, 16, 16)`
        progress.style.backgroundColor = `rgb(245, 16, 16)`
    } else {
        progress.style.height = `${index}%`
        indicador.style.backgroundColor = `rgb(153, 187, 250)`
        circle_termometro.style.backgroundColor = `rgb(36, 118, 241)`
        progress.style.backgroundColor = `rgb(36, 118, 241)`
    }
}

