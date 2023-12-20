//api key 69722a1796e4d0bb7f77adef5eb74909
//api website: https://openweathermap.org/


const apikey = "69722a1796e4d0bb7f77adef5eb74909";
const main = document.getElementById('main')
const input = document.querySelector('.input-box')
const search = document.querySelector('.search-box')
const btn = document.querySelector('.get-data')


const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

// async function getWeatherData(city) {
//   const resp = await fetch(url(city), {origin: "cors"})
//   const respData = await resp.json()
//   // console.log(respData)

//   addWeatherToPage(respData);
// }


async function getWeatherData(city) {
  try {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();
    addWeatherToPage(respData);
    
  } catch (error) {
    main.innerHTML = `<div class="error-message">Error fetching weather data. Please try again.</div>`;
  }
}



function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> 
        ${temp}°C 
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/></h2>
        <small>${data.weather[0].main}</small>
        <div class="more-info">
        <p>Humidity : <span>${humidity}%</span></p>
        <p>Wind speed : <span>${+Math.trunc(windSpeed * 3.16)}km/h</span></p>
        </div>
    `;

  main.innerHTML = "";
  main.appendChild(weather);
}

//converting from kelvin to celsius

function KtoC(K) {
  return Math.floor(K - 273.15);
}


//getting the value from the input box

btn.addEventListener('click', () => {
  const entered_city = input.value    //when we are using addeventlistener we should use new_name.target.value to get the value. 

  if (entered_city) {
    getWeatherData(entered_city);
  } else {
    main.innerHTML = `<div class = "please-type">type something duh</div>`;
  }
});

