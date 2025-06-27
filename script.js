let cityName = document.querySelector(".weather_city");
let w_DateTime = document.querySelector(".weather_date_time");
let w_Forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let  citySearch = document.querySelector(".weather_search");

const getTimeDate = (dt) => {
  const currDate = new Date(dt * 1000);
  console.log(currDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

 return new Intl.DateTimeFormat("en-US", options).format(currDate);
};

const setDynamicBackground = () => {
  const hour = new Date().getHours();
  document.body.style.background = hour < 18
    ? 'linear-gradient(to right,rgb(31, 93, 73),rgb(21, 76, 131))' // Day
    : 'linear-gradient(to right, #141e30, #243b55)'; // Night
};


const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};
let city = "New delhi";

//serach functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityName = document.querySelector(".city_name");

  console.log(cityName.value);
  city = cityName.value;

  getWeatherData();

  cityName.value = "";

})


const getWeatherData = async () => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=529704d331d90e8df7df5c36eac68e6a
`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerText = `${name}, ${getCountryName(sys.country)}`;

    w_DateTime.innerText = getTimeDate(dt);


    w_Forecast.innerText = weather[0].main;
     w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

    w_temperature.innerText = `${main.temp}°`;
    w_maxTem.innerText = `Max:${main.temp_max.toFixed()}°`;
    w_minTem.innerText = `Min:${main.temp_min.toFixed()}°`;

    w_feelsLike.innerText = `${main.feels_like}°`;
    w_humidity.innerText = `${main.humidity}%`;
    w_wind.innerText = `${wind.speed}km/s`;
    w_pressure.innerText = `${main.pressure} hPa `;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load",setDynamicBackground(), getWeatherData());
document.body.addEventListener("click",setDynamicBackground(), getWeatherData());
