const gridOptions = {
  rowData: [
    {
      "№": 12579,
      ФИО: "Альхимович Евгений Иванович",
      Email: "kononov@mail.ru",
      "Тип заявки": "Заявка на вступление в члены ОО «БФП»",
      "Дата подачи": "15.03.2023 14:45",
      Статус: "Новая",
    },
    {
      "№": 12579,
      ФИО: "Кононович Евгений Иванович",
      Email: "kononov@mail.ru",
      "Тип заявки": "Заявка на вступление в члены ОО «БФП»",
      "Дата подачи": "15.03.2023 14:45",
      Статус: "Новая",
    },
    {
      "№": 12579,
      ФИО: "Кабан Евгений Иванович",
      Email: "kononov@mail.ru",
      "Тип заявки": "Заявка на вступление в члены ОО «БФП»",
      "Дата подачи": "Не 15.03.2023 14:45",
      Статус: "Новая",
    },
    {
      "№": 12579,
      ФИО: "Альхимович Евгений Иванович",
      Email: "kononov@mail.ru",
      "Тип заявки": "Заявка на вступление в члены ОО «БФП»",
      "Дата подачи": "Не 15.03.2023 14:45",
      Статус: "Одобрена",
    },
    {
      "№": 12579,
      ФИО: "Кононович Евгений Иванович",
      Email: "kononov@mail.ru",
      "Тип заявки": "Заявка на вступление в члены ОО «БФП»",
      "Дата подачи": "15.03.2023 14:45",
      Статус: "Одобрена",
    },
    {
      "№": 12579,
      ФИО: "Кононович Евгений Иванович",
      Email: "kononov@mail.ru",
      "Тип заявки": "Заявка на вступление в члены ОО «БФП»",
      "Дата подачи": "15.03.2023 14:45",
      Статус: "Отклонена",
    },
  ],

  columnDefs: [
    { field: "№" },
    { field: "ФИО", filter: "agTextColumnFilter" },
    { field: "Email" },
    { field: "Тип заявки" },
    { field: "Дата подачи" },
    { field: "Статус" },
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
  console.log(columnState);

  if (columnState) {
    console.log("ready");

    params.api.applyColumnState({ state: columnState, applyOrder: true });
  }

  const fioFilter = document.getElementById("fio-filter");

  fioFilter.addEventListener("input", function () {
    const filterText = this.value;
    console.log(filterText);

    params.api.setColumnFilterModel({
      colId: {
        type: "contains",
        filter: filterText,
      },
    });
  });
}

const ediv = document.querySelector("#applications-table");

const gridApi = agGrid.createGrid(ediv, gridOptions);
