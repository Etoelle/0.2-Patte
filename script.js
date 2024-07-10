const form = document.querySelector("form");
const nameResult = document.getElementById("name-result");
const nameGenerated = document.getElementById("name-generated");
const nameSignification = document.getElementById("name-signification");
const namePopularity = document.getElementById("name-popularity");

// ! Radio animal sélectionné si click sur image chien ou chat
document.querySelectorAll(".img-container a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const animal = this.querySelector("img").alt.toLowerCase();
    localStorage.setItem("selectedAnimal", animal);
  });

  const selectedAnimal = localStorage.getItem("selectedAnimal");
  if (selectedAnimal) {
    const radio = document.querySelector(
      `input[name="animal"][value="${selectedAnimal}"]`
    );
    radio.checked = true;
  }

  // ! Formulaire récup + résultat
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const selectedAnimal = document.querySelector(
      'input[name="animal"]:checked'
    ).value;
    const selectedSexe = document.querySelector(
      'input[name="sexe"]:checked'
    ).value;

    try {
      const response = await fetch("/db.json");
      const data = await response.json();

      const filteredNames = data.petNames.filter((item) => {
        const matchesAnimal =
          selectedAnimal === "tout" || item.animal === selectedAnimal;
        const matchesSexe =
          selectedSexe === "all" || item.sexe === selectedSexe;
        return matchesAnimal && matchesSexe;
      });

      console.log("Noms filtrés:", filteredNames);

      const randomName =
        filteredNames[Math.floor(Math.random() * filteredNames.length)];
      nameGenerated.textContent = randomName.name;
      nameSignification.textContent = `Signification : ${randomName.meaning} `;
      namePopularity.textContent = `Popularité : ${randomName.popularity} `;
    } catch (error) {
      nameGenerated.textContent =
        "Aucun nom ne correspond aux critères sélectionnés.";
      nameSignification.textContent = "";
      namePopularity.textContent = "";
    }
  });
});
