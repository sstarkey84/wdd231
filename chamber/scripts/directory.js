const url = "data/members.json";
const members = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();

    displayMembers(data.members);
}

getMemberData();

function displayMembers(memberList) {
    memberList.innerHTML = "";

    memberList.forEach((member) => {
        const card = document.createElement("section");

        const image = document.createElement("img");
        image.setAttribute("src", `images/${member.image}`);
        image.setAttribute("alt", `${member.name} logo`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "200");
        image.setAttribute("height", "100");

        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        members.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {
    members.classList.add("grid");
    members.classList.remove("list");
});

listButton.addEventListener("click", () => {
    members.classList.add("list");
    members.classList.remove("grid");
})

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
});

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;