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

  // проверка на заполненость полей

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
});

// проверка на возраст
// legal representative

// const birthMonthSelect = document.getElementById("month-select");
// const birthDaySelect = document.querySelector(".birth-day-select");
// const birthYearSelect = document.querySelector(".birth-year-select");
// const personalFields = document.getElementById("personal-fields");
// console.log(personalFields);

// const representativeFields = document.getElementById("representative-fields");
// console.log(representativeFields);

// // Предположим, что кнопка "Следующий шаг" имеет id 'next-step-btn'
// const nextStepBtn = document.getElementById("next-step-age-check");

// nextStepBtn.addEventListener("click", function () {
//   const day = birthDaySelect.value;
//   const month = birthMonthSelect.value;
//   const year = birthYearSelect.value;
//   console.log(day);
//   console.log(month);
//   console.log(year);

//   const birthDate = new Date(`${year}-${month}-${day}`);
//   console.log(birthDate);

//   const today = new Date();
//   console.log(today);

//   // Проверка возраста
//   const ageDiff = today - birthDate;
//   console.log(ageDiff);

//   const ageInYears = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
//   console.log(ageInYears);

//   // if (ageInYears < 16) {
//   //   // Показываем поля для представителей
//   //   document.getElementById("representative-fields").style.display = "block";
//   //   document.getElementById("personal-fields").style.display = "none";
//   // } else {
//   //   // Показываем обычные поля
//   //   document.getElementById("representative-fields").style.display = "none";
//   //   document.getElementById("personal-fields").style.display = "block";
//   // }
//   if (ageInYears < 16) {
//     // Удаляем блок с личными данными
//     if (personalFields) {
//       personalFields.remove();
//     }
//   } else {
//     // Удаляем блок с данными представителей
//     if (representativeFields) {
//       representativeFields.remove();
//     }
//   }
// });
