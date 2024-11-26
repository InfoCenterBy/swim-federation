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
