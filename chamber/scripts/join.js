document.querySelector("#timestamp").value = new Date().toISOString();

const membershipLevels = ["np", "bronze", "silver", "gold"];

membershipLevels.forEach(level => {
    const link = document.querySelector(`#${level}-link`);
    const dialog = document.querySelector(`#${level}-dialog`);
    const closeButton = dialog.querySelector(".close-dialog");

    link.addEventListener("click", event => {
        event.preventDefault();
        dialog.showModal();
    });
    closeButton.onclick = () => {
        dialog.close();
    };
});

