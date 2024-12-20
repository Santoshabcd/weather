let CityInput = document.getElementById('city-input')
let searchBtn = document.getElementById('searchbtn');
let locationBtn = document.getElementById('locationbtn');
let currentWeatherCard = document.querySelectorAll('.weather-left .card')[0];
let fiveDayForecastDayCards = document.querySelector('.day-forecast');
let airCard = document.querySelectorAll('.highlights .card')[0];
let sunriseCard = document.querySelectorAll('.highlights .card')[1];
let airList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
let humidityValue = document.getElementById('humidityvalue');
let PressureValue = document.getElementById('pressurevalue');
let VisibilityValue = document.getElementById('visibilityvalue');
let WindSpeedValue = document.getElementById('windspeedvalue');
let FeelsLikeValue = document.getElementById('feelsvalue');
let hourlyFroecastValue = document.querySelector('.hourly-forecast');
const api_key = '7cda13585f230b1b84e3382e6bd0ae63';



function getWeatherDetails(name, lat, lon, country, state) {
    let FORCAST_URL_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
     WEATHER_URL_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
     AIR_PALUTION_URL_API = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
     days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
     ],
     months =[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
     ];

     fetch(AIR_PALUTION_URL_API).then(res => res.json()).then(data => {
      console.log(data);
      let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
      airCard.innerHTML = `
      <div class="card-head">
                <p>Air Quality Index</p>
                <p class="air-index aqi-${data.list[0].main.aqi}">${airList[data.list[0].main.aqi - 1]}</p>
              </div>
              <div class="air-indices">
                <i class="fa-solid fa-wind icon-larg"></i>
                <div class="item">
                  <p>PM2.5</p>
                  <h2>${pm2_5}</h2>
                </div>
                <div class="item">
                  <p>PM10</p>
                  <h2>${pm10}</h2>
                </div>
                <div class="item">
                  <p>SO2</p>
                  <h2>${so2}</h2>
                </div>
                <div class="item">
                  <p>CO</p>
                  <h2>${co}</h2>
                </div>
                <div class="item">
                  <p>NO</p>
                  <h2>${no}</h2>
                </div>
                <div class="item">
                  <p>NO2</p>
                  <h2>${no2}</h2>
                </div>
                <div class="item">
                  <p>NH3</p>
                  <h2>${nh3}</h2>
                </div>
                <div class="item">
                  <p>O3</p>
                  <h2>${o3}</h2>
                </div>
              </div>`;
     }).catch(() => {
       alert("faild to featch air polution data");
     });

     fetch(WEATHER_URL_API).then(res=>res.json()).then(data=>{
        let date = new Date();
        currentWeatherCard.innerHTML = `<div class="current-weather">
              <div class="details">
                <p>Now</p>
                <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                <p>${data.weather[0].description}</p>
              </div>
              <div class="weather-icon">
                <img
                  src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                  alt=""
                />
              </div>
            </div>
            <hr />
            <div class="card-footer">
              <p><i class="fa-regular fa-calendar-days"></i>${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
              <p><i class="fa-solid fa-location-dot"></i>${name}, ${country}</p>
            </div>`;

        let {sunrise, sunset} = data.sys,
        {timezone, visibility} = data,
        {humidity, pressure, feels_like} = data.main,
        {speed} = data.wind,
        sRiseTime = moment.utc(sunrise, 'X').add(timezone,'seconds').format('hh:mm A'),
        sSetTime = moment.utc(sunset, 'X').add(timezone,'seconds').format('hh:mm A');
        sunriseCard.innerHTML = `
        <div class="card-head">
                  <p>Sunrise & Sunset</p>
                </div>
                <div class="sunrise-sunset">
                  <div class="item">
                    <div class="icon">
                      <img src="sunrise.svg" alt="Sunrise" class="svg-icon" />
                    </div>
                    <div>
                      <p>Sunrise</p>
                      <h2>${sRiseTime}</h2>
                    </div>
                  </div>
                  <div class="item">
                    <div class="icon">
                      <img src="sunset.svg" alt="Sunrise" class="svg-icon" />
                    </div>
                    <div>
                      <p>Sunset</p>
                      <h2>${sSetTime}</h2>
                    </div>
                  </div>
                </div>`;
        humidityValue.innerHTML = `${humidity}%`;
        PressureValue.innerHTML = `${pressure}hpa`;
        VisibilityValue.innerHTML = `${visibility / 1000}km`;
        WindSpeedValue.innerHTML = `${speed}m/s`;
        FeelsLikeValue.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;

     }).catch(()=>{
        alert('faile to fetch current weather');
     });

     fetch(FORCAST_URL_API).then(res=>res.json()).then(data=>{
      console.log(data);
      let horlyForecast = data.list;
      hourlyFroecastValue.innerHTML = '';
      for(let i=0; i <= 7; i++) {
        let hrForecastDate = new Date(horlyForecast[i].dt_txt);
        let hr = hrForecastDate.getHours();
        let a = 'PM';
        if(hr < 12) a = 'AM';
        if(hr == 0) hr = 12;
        if(hr > 12) hr = hr - 12;
        hourlyFroecastValue.innerHTML += `
        <div class="card">
              <p>${hr} ${a}</p>
              <img src="https://openweathermap.org/img/wn/${horlyForecast[i].weather[0].icon}.png" alt="" />
              <p>${(horlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
            </div>`;

      }

      let uniqueForecastDay = [];
      let fiveDayForecastDay = data.list.filter(forecast =>{
        let forecastDay = new Date(forecast.dt_txt).getDate();
        if(!uniqueForecastDay.includes(forecastDay)){
          return uniqueForecastDay.push(forecastDay);
        }
      });
      console.log(fiveDayForecastDay);
      fiveDayForecastDayCards.innerHTML = ``;
      for(let i=0 ; i < fiveDayForecastDay.length ; i++){
        let date = new Date(fiveDayForecastDay[i].dt_txt);
        fiveDayForecastDayCards.innerHTML += `
        <div class="forecast-item">
                <div class="icon-wrapper">
                  <img src="https://openweathermap.org/img/wn/${fiveDayForecastDay[i].weather[0].icon}.png" alt="" />
                  <span>${(fiveDayForecastDay[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                </div>
                <p>${date.getDate()} ${months[date.getMonth()]}</p>
                <p>${days[date.getDay()]}</p>
              </div>`;
      }
    }).catch(()=>{
      alert('faile to fetch current weather');
     });
       
}

function getCityCoordinates() {
    let cityName = CityInput.value.trim();
    CityInput.value = '';
    if(!cityName) return;
    let GIOCODING_API_URL=`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GIOCODING_API_URL).then(res=>res.json()).then(data=>{
      if (data.length === 0) {
        alert('City not found. Please enter a valid city name.');
        return;
    }
    let { name, lat, lon, country, state } = data[0];
    getWeatherDetails(name, lat, lon, country, state);

    }).catch(()=>{
        alert( `fail to featch city coordinates: ${cityName}` );
    });
}

function getUserCoorinates(){
  navigator.geolocation.getCurrentPosition(position => {
    let {latitude, longitude} = position.coords;
    console.log(latitude, longitude);
    let GIOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
    fetch(GIOCODING_API_URL).then(res => res.json()).then(data => {
      console.log(data);
      let {name, state, country} = data[0];
      getWeatherDetails(name, latitude, longitude, country, state);
    }).catch(()=>{
      alert('failde to fetch currect location coordinates')
    })
  },error => {
    if(error.code == error.PERMISSION_DENIED){
      alert('Geolacation permission is denaide, Please reset Ur location permission to grant access.')
    }
  })
}

searchBtn.addEventListener("click",getCityCoordinates);
locationBtn.addEventListener("click", getUserCoorinates);
CityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates()); //); //
