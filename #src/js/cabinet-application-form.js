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

  const data1 = {
    "Брестская область": {
      Брест: ["Школа 1", "Школа 2"],
      Брест2: ["Школа 3", "Школа 4"],
      city3: ["Школа 5", "Школа 6"],
      city4: ["Школа 7", "Школа 8"],
    },
    "Гомельская область": {
      Гомель: ["Школа 9", "Школа 10"],
      city6: ["Школа 11", "Школа 12"],
      city7: ["Школа 13", "Школа 14"],
      city8: ["Школа 15", "Школа 16"],
    },
  };

  const regionSelect = document.getElementById("region");
  const citySelect = document.getElementById("city");
  const schoolSelect = document.getElementById("school");

  if (citySelect) {
    citySelect.disabled = true;
  }
  if (schoolSelect) {
    schoolSelect.disabled = true;
  }

  function populateRegions() {
    if (regionSelect) {
      Object.keys(data1).forEach((regionName) => {
        const option = document.createElement("option");
        option.value = regionName;
        option.textContent = regionName;
        regionSelect.appendChild(option);
      });
    }
  }
  populateRegions();

  function populateCities(regionName) {
    if (citySelect) {
      citySelect.innerHTML = '<option value="all">Выберите город</option>';
      const cities = data1[regionName];
      if (cities) {
        Object.keys(cities).forEach((cityName) => {
          const option = document.createElement("option");
          option.value = cityName;
          option.textContent = cityName;
          citySelect.appendChild(option);
        });
      }
    }
  }

  function populateSchools(regionName, cityName) {
    if (schoolSelect) {
      schoolSelect.innerHTML = '<option value="all">Выберите школу</option>';
      const cities = data1[regionName];
      if (cities) {
        const schools = cities[cityName];
        if (schools) {
          schools.forEach((schoolName) => {
            const option = document.createElement("option");
            option.value = schoolName;
            option.textContent = schoolName;
            schoolSelect.appendChild(option);
          });
        }
      }
    }
  }

  if (regionSelect) {
    regionSelect.addEventListener("change", function () {
      const selectedRegion = this.value;
      if (selectedRegion !== "") {
        citySelect.disabled = false;
        populateCities(selectedRegion);
        if (schoolSelect) {
          schoolSelect.disabled = true;
          schoolSelect.innerHTML = '<option value="">Выберите школу</option>';
        }
      } else {
        citySelect.disabled = true;
        citySelect.innerHTML = '<option value="">Выберите город</option>';
        if (schoolSelect) {
          schoolSelect.disabled = true;
          schoolSelect.innerHTML = '<option value="">Выберите школу</option>';
        }
      }
    });
  }

  if (citySelect) {
    citySelect.addEventListener("change", function () {
      const selectedCity = this.value;
      const selectedRegion = regionSelect.value;
      if (selectedCity !== "") {
        if (schoolSelect) {
          schoolSelect.disabled = false;
          populateSchools(selectedRegion, selectedCity);
        }
      } else {
        schoolSelect.disabled = true;
        schoolSelect.innerHTML = '<option value="">Выберите школу</option>';
      }
    });
  }
});

const statsData = {
  yesterday: { registered: 900, paidFull: 300, paidPartial: 200, unpaid: 400 },
  today: { registered: 1808, paidFull: 488, paidPartial: 379, unpaid: 941 },
  week: { registered: 5000, paidFull: 1500, paidPartial: 1000, unpaid: 2500 },
  month: { registered: 20000, paidFull: 8000, paidPartial: 5000, unpaid: 7000 },
  year: { registered: 240000, paidFull: 100000, paidPartial: 70000, unpaid: 70000 },
  custom: { registered: 0, paidFull: 0, paidPartial: 0, unpaid: 0 },
};

// Инициализация Datepicker
const datepicker = flatpickr("#custom-period", {
  mode: "range", // Режим выбора диапазона
  dateFormat: "d.m.Y", // Формат даты (например, 25.11.2024)
  locale: "ru", // Локализация на русский язык
  onClose: (selectedDates) => {
    if (selectedDates.length === 2) {
      // Пример: Обновляем данные по выбранному периоду
      console.log(`Выбран период: с ${selectedDates[0]} по ${selectedDates[1]}`);
      updateStats("custom"); // Здесь можно обновить статистику по данным выбранного периода
    }
  },
});

// Обновление статистики
function updateStats(period) {
  const { registered, paidFull, paidPartial, unpaid } = statsData[period];

  document.getElementById("registered").textContent = registered;
  document.getElementById("paid-full").textContent = paidFull;
  document.getElementById("paid-partial").textContent = paidPartial;
  document.getElementById("unpaid").textContent = unpaid;
}

// Обработка выбора периода
document.querySelectorAll("input[name='period']").forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const period = event.target.value;

    if (period === "custom") {
      document.getElementById("datepicker-container").style.display = "block";
    } else {
      document.getElementById("datepicker-container").style.display = "none";
      updateStats(period);
    }
  });
});

// Инициализация с текущим выбранным значением
document.addEventListener("DOMContentLoaded", () => {
  const selectedPeriod = document.querySelector("input[name='period']:checked").value;
  updateStats(selectedPeriod);
});
