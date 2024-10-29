const gridOptions = {
  rowData: [
    {
      "№": "1",
      "Дата выставления": "15.03.2023 14:45",
      "Тип взноса": "Членский взнос",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
    {
      "№": "2",
      "Дата выставления": "15.03.2023 14:45",
      "Тип взноса": "Членский взнос",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
    {
      "№": "3",
      "Дата выставления": "01.03.2023 14:45",
      "Тип взноса": "Членский взнос",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Не оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
    {
      "№": "4",
      "Дата выставления": "11.03.2023 14:11",
      "Тип взноса": "Членский взнос",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Не оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
    {
      "№": "5",
      "Дата выставления": "15.03.2023 14:45",
      "Тип взноса": "Вступительный взнос ",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
    {
      "№": "6",
      "Дата выставления": "15.03.2023 14:45",
      "Тип взноса": "Вступительный взнос ",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
  ],

  columnDefs: [
    { field: "№" },
    { field: "Дата выставления" },
    { field: "Тип взноса" },
    { field: "Номер в ЕРИП" },
    { field: "Статус оплаты" },
    { field: "Дата оплаты" },
    { field: "Сумма" },
    { field: "Оплатить" },
  ],
  defaultColDef: {
    flex: 1,
  },

  onColumnMoved: onColumnMoved,
  onColumnResized: onColumnResized,
  onSortChanged: onSortChanged,
  onGridReady: onGridReady,
};

function onColumnMoved(params) {
  const columnState = params.api.getColumnState();
  console.log("moved");

  localStorage.setItem("agColumnState", JSON.stringify(columnState));
}

function onColumnResized(params) {
  const columnState = params.api.getColumnState();
  console.log("resize");

  localStorage.setItem("agColumnState", JSON.stringify(columnState));
}

function onSortChanged(params) {
  const columnState = params.api.getColumnState();
  console.log("sort");

  localStorage.setItem("agColumnState", JSON.stringify(columnState));
}

function onGridReady(params) {
  const columnState = JSON.parse(localStorage.getItem("agColumnState"));

  if (columnState) {
    console.log("ready");

    params.api.applyColumnState({ state: columnState, applyOrder: true });
  }
}

const ediv = document.querySelector("#contributions-table");

const gridApi = agGrid.createGrid(ediv, gridOptions);
