const currentTemp = document.querySelector("#current-temp");
const weatherDescription = document.querySelector("#weather-description");
const forecast = document.querySelector("#forecast");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=38.75&lon=-121.28&units=imperial&appid=6aefcb5e7cad8d3d465ce0691a0e7317";

const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=38.75&lon=-121.28&units=imperial&appid=6aefcb5e7cad8d3d465ce0691a0e7317"

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            currentTemp.textContent = `${Math.round(data.main.temp)}°F`;
            weatherDescription.textContent = data.weather[0].description;
        }

        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

apiFetch();

async function forecastFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const tomorrow = data.list[8];

            forecast.innerHTML = `<p>Tomorrow: ${Math.round(tomorrow.main.temp)}°F</P>`;
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

forecastFetch();