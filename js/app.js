let searchInp = document.querySelector('.weather_search');
let img = document.querySelector('.weather_img');
let city = document.querySelector('.weather_city');
let temperature = document.querySelector('.weather_temp>.value');
let day = document.querySelector('.weekday');
let humidity = document.querySelector('.humidity>.value');
let wind = document.querySelector('.wind-speed>.value');
let pressure = document.querySelector('.pressure>.value');
let maxTemp = document.querySelector('.maxtemp>.value');
let minTemp = document.querySelector ('.mintemp>.value');





let weatherAPIKey = 'cd2f2860f5e9a916b11cd487ee15616f';
let weatherBaseEndPoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIKey;

let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndPoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();
    return weather;
}

searchInp.addEventListener('keydown', async (e) => {
   if(e.keyCode === 13) {
       let weather = await getWeatherByCityName(searchInp.value);
      updateCurrentWeather(weather);
   }
})

let updateCurrentWeather = (data) => {
    console.log(data);
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = dayOfWeek();
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    temperature.textContent = data.main.temp > 0 ? 
                    '+' + Math.round(data.main.temp) : 
                    Math.round(data.main.temp);
    let windDirection;
    let deg = data.wind.deg;
    if (deg > 135 && deg <= 225) {
        windDirection = 'East';
    } else if (deg > 135 && deg <= 225){
        windDirection = 'South';
    }
    else if (deg > 225 && deg <= 315){
        windDirection = 'west';
    } else {
        windDirection = 'North';
    }
    wind.textContent = windDirection + ', ' + data.wind.speed;

    maxTemp.textContent = data.main.temp_max > 0 ? 
                    '+' + Math.round(data.main.temp_max) : 
                    Math.round(data.main.temp_max);
                    
    minTemp.textContent = data.main.temp_min > 0 ? 
                    '+' + Math.round(data.main.temp_min) : 
                    Math.round(data.main.temp_min);
    
}

let dayOfWeek = () => {
    return new Date().toLocaleDateString('en-EN', {'weekday': 'long'});
}
