document.addEventListener("DOMContentLoaded", function () {
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
