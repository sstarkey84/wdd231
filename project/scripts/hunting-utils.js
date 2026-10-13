export function filterHuntingData(data, species, region) {
    return data.filter(hunt => {
        const matchesSpecies = species === "all" || hunt.species === species;
        const matchesRegion = region === "all" || hunt.region === region;
        return matchesSpecies && matchesRegion;
    });
}