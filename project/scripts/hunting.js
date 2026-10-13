import { filterHuntingData } from "./hunting-utils.js";

async function loadHuntingData() {
    const container = document.querySelector("#hunting-cards");
    const speciesFilter = document.querySelector("#species-filter");
    const regionFilter = document.querySelector("#region-filter");
    const dialog = document.querySelector("#hunt-dialog");
    const dialogContent = document.querySelector("#dialog-content");
    const closeDialog = document.querySelector("#close-dialog");

    try {
        const response = await fetch("data/hunting.json");

        if (!response.ok) {
            throw new Error("Unable to load hunting data");
        }

        const huntingData = await response.json();
        function filterHunts() {
            const selectedSpecies = speciesFilter.value;
            const selectedRegion = regionFilter.value;

            const filteredData = filterHuntingData(
                huntingData,
                selectedSpecies,
                selectedRegion
            );

            if (filteredData.length === 0) {
                container.innerHTML = "<p>No hunting opportunities match your selections.</p>";
                return;
            }

            container.innerHTML = filteredData.map(hunt => `
            <article class="hunting-card">
            <h3>${hunt.species}</h3>
            <p><strong>Location:</strong> ${hunt.location}</p>
            <p><strong>Region:</strong> ${hunt.region}</P>
            <p><strong>Habitat:</strong> ${hunt.habitat}</p>
            <p>${hunt.description}</p>
            <button class="details-button" type="button" data-id="${hunt.id}"> View Details </button>
            </article>
            `).join("");
        }

        container.addEventListener("click", (event) => {
            const button = event.target.closest(".details-button");

            if (!button) return;

            const hunt = huntingData.find(
                item => String(item.id) === button.dataset.id
            );

            if (!hunt) return;

            dialogContent.innerHTML = `
            <h2>${hunt.species}</h2>
            <p><strong>Location:</strong> ${hunt.location}</p>
            <p><strong>Region:</strong> ${hunt.region}</P>
            <p><strong>Habitat:</strong> ${hunt.habitat}</p>
            <p>${hunt.description}</p>
            <p><a href="https://wildlife.ca.gov/Hunting" target="_blank" rel="noopener noreferrer">View Official California Hunting Regulations</a></p>
            `;

            dialog.showModal();
        });

        closeDialog.addEventListener("click", () => {
            dialog.close();
        });

        speciesFilter.addEventListener("change", () => {
            localStorage.setItem("selectedSpecies", speciesFilter.value);
            filterHunts();
        });

        regionFilter.addEventListener("change", filterHunts);

        const savedSpecies = localStorage.getItem("selectedSpecies");
        if (savedSpecies) {
            speciesFilter.value = savedSpecies;
        }

        filterHunts();



    }

    catch (error) {
        console.error("Error loading hunting data:", error);
        container.textContent = "Unable to load hunting opportunities";
    }
}

loadHuntingData();