const yearSelect = document.getElementById("year-select");
const startYear = 1940;
const currentYear = new Date().getFullYear();

for (let year = currentYear; year >= startYear; year--) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

const daySelect = document.getElementById("day-select");

for (let day = 1; day <= 31; day++) {
  const option = document.createElement("option");
  option.value = day;
  option.textContent = day;
  daySelect.appendChild(option);
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".cabinet__form");
  const button = document.querySelector(".step-next-button");
  const requiredInputs = form.querySelectorAll("input[required], select[required]");

  // Проверяем, заполнены ли все обязательные поля
  function checkFormCompletion() {
    let allFilled = true;
    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
      }
    });

    // Активируем кнопку, если все поля заполнены
    if (allFilled) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
  }

  // Добавляем обработчик события на изменение значений в полях
  requiredInputs.forEach((input) => {
    input.addEventListener("input", checkFormCompletion);
  });

  // Запускаем проверку при загрузке страницы
  checkFormCompletion();
});
