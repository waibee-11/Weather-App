const API_KEY = "857031bd197743ada0f35209231307";
const forecast_url = "http://api.weatherapi.com/v1/forecast.json?key=857031bd197743ada0f35209231307&q=";
const cur_url = "http://api.weatherapi.com/v1/current.json?key=857031bd197743ada0f35209231307&q="

let query = "Waterloo";
let type = "current";
const currentButton = document.getElementById('current-button');
const days7Button = document.getElementById('days-7-button');
let curButton = currentButton;
curButton.classList.add('active');


window.addEventListener("load", () => fetchWeather(query, type));

currentButton.addEventListener('click', () => {
    type = "current";
    fetchWeather(query, type);
    curButton?.classList.remove('active');
    curButton = currentButton;
    curButton.classList.add('active');
});

days7Button.addEventListener('click', () => {
    type =  "forecast";
    fetchWeather(query, type);
    curButton?.classList.remove('active');
    curButton = days7Button;
    curButton.classList.add('active');
});

async function fetchWeather(qry, type){
    window.scrollTo(0,0);
    const days7 = document.getElementById('current-location');
    days7.innerHTML = `${query}`;
    if (type == "forecast"){
        const response = await fetch(`${forecast_url}${qry}&days=7&aqi=no&alerts=no`);
        const data = await response.json();
        console.log(data);
        const forecast = data.forecast.forecastday;
        bindData(forecast, "forecast");
    }
    else if (type == "current"){
        const response = await fetch(`${cur_url}${qry}&aqi=no`);
        const data = await response.json();
        console.log(data);
        bindData(data, "current");
    }
}

function bindData(articles, type){
    if (type == "forecast"){
        const cardsContainer = document.getElementById("items-container");
        const weatherCardTemplate = document.getElementById("weather-item-template");
        cardsContainer.innerHTML = "";
        articles.forEach((article) => {
            if (!article) return;
            if (!weatherCardTemplate) return;
            const cardClone = weatherCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article, "forecast");
            cardsContainer.appendChild(cardClone);
        });
    }

    else if (type == "current"){
        const cardsContainer = document.getElementById("items-container");
        const weatherCardTemplateCur = document.getElementById("weather-item-template-current");
        cardsContainer.innerHTML = "";
        if (!articles) return;
        if (!weatherCardTemplateCur) return;
        const cardClone = weatherCardTemplateCur.content.cloneNode(true);
        fillDataInCard(cardClone, articles, "current");
        cardsContainer.appendChild(cardClone);
    }
}

function fillDataInCard(cardClone, article, type){
    if (type == "forecast"){
        const weatherImg = cardClone.querySelector('#weather-img');
        const weatherTempMax = cardClone.querySelector('#weather-temp-max');
        const weatherTempMin = cardClone.querySelector('#weather-temp-min');
        const weatherWind = cardClone.querySelector('#weather-wind');
        const weatherPrec = cardClone.querySelector('#weather-prec');
        const weatherhead = cardClone.querySelector('#weather-head');
        const curTime = cardClone.querySelector('#cur-time-id')

        weatherImg.src = article.day.condition.icon;
        const status = article.day.condition.text;
        const imgURL = article.day.condition.icon;
        if (imgURL.includes("day")){
            if (status.includes("Heavy rain")) weatherImg.src = "heavy-rain.png";
            else if (status.includes("rain")) weatherImg.src = "moderate-rain.png";

            if (status.includes("cloud")) weatherImg.src = "clouds-sun.png";
            else if (status.includes("Cloud")) weatherImg.src = "cloudy.png";
            
            if (status.includes("Sun")) weatherImg.src = "sunny.png";
            if (status.includes("Overcast")) weatherImg.src = "overcast.png"
            if (status.includes("Fog")) weatherImg.src = "fog.png";
        }
        else if (imgURL.includes("night")){
            if (status.includes("Heavy rain")) weatherImg.src = "heavy-rain.png";
            else if (status.includes("rain")) weatherImg.src = "moderate-rain-night.png";

            if (status.includes("cloud")) weatherImg.src = "clouds-night.png";
            else if (status.includes("Cloud")) weatherImg.src = "clouds-night.png";

            if (status.includes("Overcast")) weatherImg.src = "overcast.png";
            if (status.includes("Clear")) weatherImg.src = "clear-night.png";
            if (status.includes("Fog")) weatherImg.src = "fog.png";

        }
        weatherTempMax.innerHTML = `${article.day.maxtemp_c}°C`;
        weatherTempMin.innerHTML = `${article.day.mintemp_c}°C`;
        weatherWind.innerHTML = `${article.day.maxwind_kph}km/h`;
        weatherPrec.innerHTML = `${article.day.avghumidity}%`;
        weatherhead.innerHTML = article.day.condition.text;
        curTime.innerHTML = article.date;
    }

    else if (type == "current"){
        const weatherImg = cardClone.querySelector('#weather-img');
        const weatherTemp = cardClone.querySelector('#weather-temp-cur');
        const weatherWind = cardClone.querySelector('#weather-wind');
        const weatherPrec = cardClone.querySelector('#weather-prec');
        const weatherhead = cardClone.querySelector('#weather-head');
        const lastUpdated = cardClone.querySelector('#last-updated');

        weatherImg.src = article.current.condition.icon;
        const status = article.current.condition.text;
        const imgURL = article.current.condition.icon;
        if (imgURL.includes("day")){
            if (status.includes("Heavy rain")) weatherImg.src = "heavy-rain.png";
            else if (status.includes("rain")) weatherImg.src = "moderate-rain.png";

            if (status.includes("cloud")) weatherImg.src = "clouds-sun.png";
            else if (status.includes("Cloud")) weatherImg.src = "cloudy.png";
            
            if (status.includes("Sun")) weatherImg.src = "sunny.png";
            if (status.includes("Overcast")) weatherImg.src = "overcast.png"
            if (status.includes("Fog")) weatherImg.src = "fog.png";
        }
        else if (imgURL.includes("night")){
            if (status.includes("Heavy rain")) weatherImg.src = "heavy-rain.png";
            else if (status.includes("rain")) weatherImg.src = "moderate-rain-night.png";

            if (status.includes("cloud")) weatherImg.src = "clouds-night.png";
            else if (status.includes("Cloud")) weatherImg.src = "clouds-night.png";

            if (status.includes("Overcast")) weatherImg.src = "overcast.png";
            if (status.includes("Clear")) weatherImg.src = "clear-night.png";
            if (status.includes("Fog")) weatherImg.src = "fog.png";
        }

        weatherTemp.innerHTML = `${article.current.temp_c}°C`;
        weatherWind.innerHTML = `${article.current.wind_kph}km/h`;
        weatherPrec.innerHTML = `${article.current.humidity}%`;
        weatherhead.innerHTML = article.current.condition.text;
        lastUpdated.innerHTML = `${article.current.last_updated.slice(10)}`;
    }

}

let curSelectedNav = null;
function onNavItemClick(id){
    query = id;
    fetchWeather(query, type);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('navbar-button');
const searchText = document.getElementById('navbar-input');

searchButton.addEventListener('click', () => {
    query = searchText.value;
    if (!query) return;
    fetchWeather(query, type);
    curSelectedNav?.classList.remove('active');
})

function reload(){
    window.location.reload();
}
