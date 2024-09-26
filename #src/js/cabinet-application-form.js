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

// проверка на заполненость полей
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".cabinet__form");
  const button = document.querySelector(".step-next-button");
  const requiredInputs = form.querySelectorAll("input[required], select[required]");

  function checkFormCompletion() {
    let allFilled = true;
    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
      }
    });

    if (allFilled) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
  }

  requiredInputs.forEach((input) => {
    input.addEventListener("input", checkFormCompletion);
  });

  checkFormCompletion();
});

// проверка селектов для 4 пункта
const region = document.getElementById("region");
const city = document.getElementById("city");
const school = document.getElementById("school");

region.addEventListener("change", function () {
  if (region.value !== "") {
    city.disabled = false;
  }
});

city.addEventListener("change", function () {
  if (city.value !== "") {
    school.disabled = false;
  }
});
