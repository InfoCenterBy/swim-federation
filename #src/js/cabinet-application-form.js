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
  const data = [
    {
      region: {
        name: "Регион 1",
        cities: [
          {
            city: {
              name: "Город А",
              schools: ["Школа 1", "Школа 2"],
            },
          },
          {
            city: {
              name: "Город Б",
              schools: ["Школа 3", "Школа 4"],
            },
          },
        ],
      },
    },
    {
      region: {
        name: "Регион 2",
        cities: [
          {
            city: {
              name: "Город В",
              schools: ["Школа 5", "Школа 6"],
            },
          },
          {
            city: {
              name: "Город Г",
              schools: ["Школа 7", "Школа 8"],
            },
          },
        ],
      },
    },
  ];

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
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.region.name;
      option.textContent = item.region.name;
      if (regionSelect) {
        regionSelect.appendChild(option);
      }
    });
  }
  populateRegions();

  function populateCities(regionName) {
    citySelect.innerHTML = '<option value="">Выберите город</option>';
    const regionData = data.find((item) => item.region.name === regionName);
    if (regionData) {
      regionData.region.cities.forEach((cityItem) => {
        const option = document.createElement("option");
        option.value = cityItem.city.name;
        option.textContent = cityItem.city.name;
        if (citySelect) {
          citySelect.appendChild(option);
        }
      });
    }
  }

  function populateSchools(regionName, cityName) {
    schoolSelect.innerHTML = '<option value="">Выберите школу</option>';
    const regionData = data.find((item) => item.region.name === regionName);
    if (regionData) {
      const cityData = regionData.region.cities.find((cityItem) => cityItem.city.name === cityName);
      if (cityData) {
        cityData.city.schools.forEach((schoolName) => {
          const option = document.createElement("option");
          option.value = schoolName;
          option.textContent = schoolName;
          if (schoolSelect) {
            schoolSelect.appendChild(option);
          }
        });
      }
    }
  }

  if (regionSelect) {
    regionSelect.addEventListener("change", function () {
      const selectedRegion = this.value;
      if (selectedRegion !== "") {
        citySelect.disabled = false;
        populateCities(selectedRegion);
        schoolSelect.disabled = true;
        schoolSelect.innerHTML = '<option value="">Выберите школу</option>';
      } else {
        citySelect.disabled = true;
        citySelect.innerHTML = '<option value="">Выберите город</option>';
        schoolSelect.disabled = true;
        schoolSelect.innerHTML = '<option value="">Выберите школу</option>';
      }
    });
  }

  if (citySelect) {
    citySelect.addEventListener("change", function () {
      const selectedCity = this.value;
      const selectedRegion = regionSelect.value;
      if (selectedCity !== "") {
        schoolSelect.disabled = false;
        populateSchools(selectedRegion, selectedCity);
      } else {
        schoolSelect.disabled = true;
        schoolSelect.innerHTML = '<option value="">Выберите школу</option>';
      }
    });
  }
});
