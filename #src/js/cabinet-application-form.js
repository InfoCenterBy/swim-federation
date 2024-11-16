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
  // const data = [
  //   {
  //     region: "Регион 1",
  //     cities: [
  //       {
  //         city: {
  //           name: "Город А",
  //           schools: ["Школа 1", "Школа 2"],
  //         },
  //       },
  //       {
  //         city: "Город Б",
  //         schools: ["Школа 3", "Школа 4"],
  //       },
  //     ],
  //   },
  //   {
  //     region: "Регион 2",
  //     cities: [
  //       {
  //         city: "Город В",
  //         schools: ["Школа 5", "Школа 6"],
  //       },
  //       {
  //         city: "Город Г",
  //         schools: ["Школа 7", "Школа 8"],
  //       },
  //     ],
  //   },
  // ];

  // const region = document.getElementById("region");
  // const city = document.getElementById("city");
  // const school = document.getElementById("school");

  // if (region) {
  //   region.addEventListener("change", function () {
  //     if (region.value !== "") {
  //       city.disabled = false;
  //     }
  //   });
  // }

  // if (city) {
  //   city.addEventListener("change", function () {
  //     if (city.value !== "") {
  //       school.disabled = false;
  //     }
  //   });
  // }

  // function populateRegions() {
  //   data.forEach((item) => {
  //     const option = document.createElement("option");
  //     option.value = item.region;
  //     option.textContent = item.region;
  //     region.appendChild(option);
  //   });
  // }

  // populateRegions();
  // function populateCities(regionName) {
  //   city.innerHTML = '<option value="">Выберите город</option>';
  //   const region = data.find((item) => item.region === regionName);
  //   if (region) {
  //     region.cities.forEach((cityItem) => {
  //       const option = document.createElement("option");
  //       option.value = cityItem.city;
  //       option.textContent = cityItem.city;
  //       city.appendChild(option);
  //     });
  //   }
  // }

  // function populateSchools(regionName, cityName) {
  //   school.innerHTML = '<option value="">Выберите школу</option>';
  //   const region = data.find((item) => item.region === regionName);
  //   if (region) {
  //     const city = region.cities.find((cityItem) => cityItem.city === cityName);
  //     if (city) {
  //       city.schools.forEach((schoolName) => {
  //         const option = document.createElement("option");
  //         option.value = schoolName;
  //         option.textContent = schoolName;
  //         school.appendChild(option);
  //       });
  //     }
  //   }
  // }
  // region.addEventListener("change", function () {
  //   const selectedRegion = this.value;
  //   if (selectedRegion !== "") {
  //     city.disabled = false;
  //     populateCities(selectedRegion);
  //     school.disabled = true;
  //     school.innerHTML = '<option value="">Выберите школу</option>';
  //   } else {
  //     city.disabled = true;
  //     city.innerHTML = '<option value="">Выберите город</option>';
  //     school.disabled = true;
  //     school.innerHTML = '<option value="">Выберите школу</option>';
  //   }
  // });

  // city.addEventListener("change", function () {
  //   const selectedCity = this.value;
  //   const selectedRegion = region.value;
  //   if (selectedCity !== "") {
  //     school.disabled = false;
  //     populateSchools(selectedRegion, selectedCity);
  //   } else {
  //     school.disabled = true;
  //     school.innerHTML = '<option value="">Выберите школу</option>';
  //   }
  // });
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

  citySelect.disabled = true;
  schoolSelect.disabled = true;

  function populateRegions() {
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.region.name;
      option.textContent = item.region.name;
      regionSelect.appendChild(option);
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
        citySelect.appendChild(option);
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
          schoolSelect.appendChild(option);
        });
      }
    }
  }

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
});
