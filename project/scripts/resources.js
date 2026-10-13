const speciesSelect = document.querySelector("#species");
const savedSpecies = localStorage.getItem("huntingInterest");

if (speciesSelect && savedSpecies) {
    speciesSelect.value = savedSpecies;
}