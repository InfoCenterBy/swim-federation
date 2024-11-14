document.addEventListener("DOMContentLoaded", function () {
  const yearSelect = document.querySelectorAll("#year-select");
  const startYear = 1940;
  const currentYear = new Date().getFullYear();

  yearSelect.forEach((select) => {
    for (let year = currentYear; year >= startYear; year--) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select.appendChild(option);
    }
  });

  const daySelect = document.querySelectorAll("#day-select");

  daySelect.forEach((select) => {
    for (let day = 1; day <= 31; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day;
      select.appendChild(option);
    }
  });

  // проверка селектов для 4 пункта
  const region = document.getElementById("region");
  const city = document.getElementById("city");
  const school = document.getElementById("school");

  if (region) {
    region.addEventListener("change", function () {
      if (region.value !== "") {
        city.disabled = false;
      }
    });
  }

  if (city) {
    city.addEventListener("change", function () {
      if (city.value !== "") {
        school.disabled = false;
      }
    });
  }
});
