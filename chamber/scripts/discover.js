import { places } from "../data/places.mjs";

const cards = document.querySelector("#discover-cards");

places.forEach((place) => {
    const card = document.createElement("section");
    const title = document.createElement("h2");
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const address = document.createElement("address");
    const description = document.createElement("p");
    const button = document.createElement("button");

    title.textContent = place.name;

    image.src = `images/${place.image}`;
    image.alt = place.name;
    image.loading = "lazy";
    image.width = 300;
    image.height = 200;

    figure.appendChild(image);

    address.textContent = place.address;
    description.textContent = place.description;
    button.textContent = "Learn More";

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    cards.appendChild(card);
});

const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome!  Let us know if you have any questions.";
}

else {
    const difference = now - Number(lastVisit);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days < 1) {
        visitMessage.textContent = "Back so soon!  Awesome!";
    }
    else if (days === 1) {
        visitMessage.textContent = "You last visited 1 day ago."
    }
    else {
        visitMessage.textContent = `You last visited ${days} ago.`;
    }
}

localStorage.setItem("lastVisit", now);

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
});