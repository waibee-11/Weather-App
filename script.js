const API_KEY = "857031bd197743ada0f35209231307";
const url = "https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/forecast.json?key=857031bd197743ada0f35209231307&q=";

window.addEventListener("load", () => fetchWeather("Waterloo"));

async function fetchWeather(query){
    window.scrollTo(0,0);
    const response = await fetch(`${url}${query}&days=7&aqi=no&alerts=no`);
    const data = await response.json();
    console.log(data);
    const forecast = data.forecast.forecastday;
    bindData(forecast);
    const days7 = document.getElementById('days-7');
    days7.innerHTML = `7 days forecast: ${query}`;
}

function bindData(articles){
    const cardsContainer = document.getElementById("items-container");
    const weatherCardTemplate = document.getElementById("weather-item-template");
    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
        if (!article) return;
        if (!weatherCardTemplate) return;
        const cardClone = weatherCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const weatherImg = cardClone.querySelector('#weather-img');
    const weatherTempMax = cardClone.querySelector('#weather-temp-max');
    const weatherTempMin = cardClone.querySelector('#weather-temp-min');
    const weatherWind = cardClone.querySelector('#weather-wind');
    const weatherPrec = cardClone.querySelector('#weather-prec');
    const weatherhead = cardClone.querySelector('#weather-head');
    const curTime = cardClone.querySelector('#cur-time-id')

    weatherImg.src = article.day.condition.icon;
    weatherTempMax.innerHTML = `${article.day.maxtemp_c}° C`;
    weatherTempMin.innerHTML = `${article.day.mintemp_c}° C`;
    weatherWind.innerHTML = `${article.day.maxwind_kph} km/h`;
    weatherPrec.innerHTML = `${article.day.daily_chance_of_rain}%`;
    weatherhead.innerHTML = article.day.condition.text;
    curTime.innerHTML = article.date;

}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchWeather(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('navbar-button');
const searchText = document.getElementById('navbar-input');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchWeather(query);
    curSelectedNav?.classList.remove('active');
})

function reload(){
    window.location.reload();
}
