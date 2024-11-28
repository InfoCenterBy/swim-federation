const statsData = {
  yesterday: { registered: 900, paidFull: 300, paidPartial: 200, unpaid: 400 },
  today: { registered: 1808, paidFull: 488, paidPartial: 379, unpaid: 941 },
  week: { registered: 5000, paidFull: 1500, paidPartial: 1000, unpaid: 2500 },
  month: { registered: 20000, paidFull: 8000, paidPartial: 5000, unpaid: 7000 },
  year: { registered: 240000, paidFull: 100000, paidPartial: 70000, unpaid: 70000 },
  custom: { registered: 0, paidFull: 0, paidPartial: 0, unpaid: 0 },
};

const datepicker = flatpickr("#custom-period", {
  mode: "range",
  dateFormat: "d.m.Y",
  locale: "ru",
  onClose: (selectedDates) => {
    if (selectedDates.length === 2) {
      console.log(`Выбран период: с ${selectedDates[0]} по ${selectedDates[1]}`);
      updateStats("custom");
    }
  },
});

function updateStats(period) {
  const { registered, paidFull, paidPartial, unpaid } = statsData[period];

  document.getElementById("registered").textContent = registered;
  document.getElementById("paid-full").textContent = paidFull;
  document.getElementById("paid-partial").textContent = paidPartial;
  document.getElementById("unpaid").textContent = unpaid;
}

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
