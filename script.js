const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=3b05c3a983d51a235e692f9ea18bfece'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios.get(URL).then(res => {
		const temp = res.data.main.temp
		const hum = res.data.main.humidity
		const status = Object.assign({}, ...res.data.weather)
        
		weather.textContent = status.main
		cityName.textContent = res.data.name
		temperature.textContent = Math.floor(temp) + `°C`
		humidity.textContent = Math.floor(hum) + '%'
        
        warning.textContent = ''
        input.value = ''

		let idWeather = status.id
		console.log(idWeather)

		if (idWeather >= 200 && idWeather <= 232) {
			photo.setAttribute('src', './img/thunderstorm.png')
		} else if (idWeather >= 300 && idWeather <= 321) {
			photo.setAttribute('src', './img/drizzle.png')
		} else if (idWeather >= 500 && idWeather <= 531) {
			photo.setAttribute('src', './img/rain.png')
		} else if (idWeather >= 600 && idWeather <= 622) {
			photo.setAttribute('src', './img/ice.png')
		} else if (idWeather >= 701 && idWeather <= 781) {
			photo.setAttribute('src', './img/fog.png')
		} else if (idWeather === 800) {
			photo.setAttribute('src', './img/sun.png')
		} else if (idWeather >= 801 && idWeather <= 804) {
			photo.setAttribute('src', './img/cloud.png')
		}
	})
    .catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta!')
}

const submitByEnter = (e) => {
    if(e.key === 'Enter'){
        getWeather()
    }
}
button.addEventListener('click', getWeather)
input.addEventListener('keyup', submitByEnter)


