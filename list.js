document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/db.json");

    const data = await response.json();
    const tbody = document.querySelector("#names-list tbody");
    const petNames = data.petNames;

    petNames.forEach((pet, index) => {
      const tr = document.createElement("tr");

      const tdName = document.createElement("td");
      tdName.textContent = pet.name;
      tr.appendChild(tdName);

      const tdSexe = document.createElement("td");
      tdSexe.textContent = pet.sexe;
      tr.appendChild(tdSexe);

      const tdAnimal = document.createElement("td");
      tdAnimal.textContent = pet.animal;
      tr.appendChild(tdAnimal);

      const tdMeaning = document.createElement("td");
      tdMeaning.textContent = pet.meaning;
      tr.appendChild(tdMeaning);

      // const tdPopularity = document.createElement("td");
      // tdPopularity.textContent = pet.popularity;
      // tr.appendChild(tdPopularity);

      tbody.appendChild(tr);

      if (index % 2 !== 0) {
        tr.classList.add("impair");
      } else {
        tr.classList.add("pair");
      }
    });
  } catch (error) {
    alert(
      "Une erreur est survenue lors du chargement des données. Veuillez réessayer"
    );
  }
});
