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
            const day1 = data.list[8];
            const day2 = data.list[16];
            const day3 = data.list[24];

            const today = new Date();

            const day1Name = new Date(today);
            day1Name.setDate(today.getDate() + 1);

            const day2Name = new Date(today);
            day2Name.setDate(today.getDate() + 2);

            const day3Name = new Date(today);
            day3Name.setDate(today.getDate() + 3);

            const options = { weekday: "long" };


            forecast.innerHTML = `
            <p>${day1Name.toLocaleDateString("en-US", options)}: ${Math.round(day1.main.temp)}°F</P>
            <p>${day2Name.toLocaleDateString("en-US", options)}: ${Math.round(day2.main.temp)}°F</P>
            <p>${day3Name.toLocaleDateString("en-US", options)}: ${Math.round(day3.main.temp)}°F</p>
            `;
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

const spotlightCards = document.querySelector("#spotlight-cards");

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (response.ok) {
            const data = await response.json();
            const qualifiedMembers = data.members.filter(
                member => member.membership === 2 || member.membership === 3
            );
            qualifiedMembers.sort(() => Math.random() - 0.5);
            const selectedMembers = qualifiedMembers.slice(0, 3);
            displaySpotlights(selectedMembers);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function displaySpotlights(members) {
    spotlightCards.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("section");

        card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} logo" width="200" height"100" loading="lazy">
        <p>${member.address}</p>
        <P>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership: ${member.membership === 3 ? "Gold" : "Silver"}</p>`;

        spotlightCards.appendChild(card);
    });
}

getSpotlights();