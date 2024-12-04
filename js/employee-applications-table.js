const gridOptions = {
  localeText: AG_GRID_LOCALE_RU,
  rowHeight: 50,
  rowData: [
    {
      requestNumber: 44,
      fio: "Альхимович Евгений Иванович",
      email: "aroitq@mail.ru",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "15.03.2023 14:45",
      status: "Новая",
      approve: "approve",
      reject: "reject",
    },
    {
      requestNumber: 1,
      fio: "Кононович Евгений Иванович",
      email: "laaqper@gmail.com",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "15.03.2023 14:45",
      status: "Новая",
    },
    {
      requestNumber: 77,
      fio: "Кабан Евгений Иванович",
      email: "kononov@mail.ru",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "Не 15.03.2023 14:45",
      status: "Новая",
    },
    {
      requestNumber: 123,
      fio: "Альхимович Евгений Иванович",
      email: "popoatt@mail.su",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "Не 15.03.2023 14:45",
      status: "Одобрена",
    },
    {
      requestNumber: 98,
      fio: "Кононович Евгений Иванович",
      email: "popa@mail.ru",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "15.03.2023 14:45",
      status: "Одобрена",
    },
    {
      requestNumber: 222,
      fio: "Кононович Евгений Иванович",
      email: "kaban@mail.ru",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "15.03.2023 14:45",
      status: "Отклонена",
    },
  ],

  columnDefs: [
    { field: "requestNumber", headerName: "№", maxWidth: 80 },
    { field: "fio", headerName: "ФИО", unSortIcon: true },
    { field: "email", headerName: "Email", unSortIcon: true },
    {
      field: "requestType",
      headerName: "Тип заявки",
      unSortIcon: true,
    },
    { field: "submissionDate", headerName: "Дата подачи", unSortIcon: true },
    {
      field: "status",
      headerName: "Статус",
      unSortIcon: true,
      cellRenderer: (params) => {
        return params.value;
      },
      cellClassRules: {
        "ag-badge blue": (params) => params.value === "Новая",
        "ag-badge green": (params) => params.value === "Одобрена",
        "ag-badge red": (params) => params.value === "Отклонена",
      },
    },
    {
      field: "approve",
      headerName: "",
      width: 140,
      minWidth: 140,
      maxWidth: 140,
      cellRenderer: (params) => {
        if (params.data.status === "Новая") {
          let acceptButton = `<button class="button--small" data-bs-target="#approveApplication" data-bs-toggle="modal">Одобрить</button>`;

          return acceptButton;
        } else {
          return "";
        }
      },
    },
    {
      field: "reject",
      headerName: "",
      width: 150,
      minWidth: 150,
      maxWidth: 150,
      cellRenderer: (params) => {
        if (params.data.status === "Новая") {
          let rejectButton = `<button class="button--secondary-small" data-bs-target="#rejectApplication" data-bs-toggle="modal">Отклонить</button>`;

          return rejectButton;
        } else {
          return "";
        }
      },
    },
    {
      field: "view",
      headerName: "",
      maxWidth: 50,
      cellRenderer: (params) => {
        if (params.data.status === "Новая") {
          let link = `<a href="cabinet-bfp-employee-applications-detail.html"><i class="color-dark-gray hover-main fs-18 bi bi-eye"></i></a>`;

          return link;
        } else {
          return "";
        }
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    wrapText: true,
    autoHeight: true,
  },

  pagination: true,

  paginationPageSize: 10,

  paginationPageSizeSelector: [10, 20, 50, 100],

  onColumnMoved: onColumnMoved,
  onColumnResized: onColumnResized,
  onSortChanged: onSortChanged,
  onGridReady: onGridReady,
  isExternalFilterPresent: () => {
    return (
      document.getElementById("fioFilterInput").value !== "" ||
      document.getElementById("requestNumberFilterInput").value !== "" ||
      document.getElementById("emailFilterInput").value !== "" ||
      document.getElementById("statusFilterSelect").value !== ""
    );
  },
  doesExternalFilterPass: (node) => {
    const fioFilterValue = document.getElementById("fioFilterInput").value.toLowerCase();
    const requestNumberFilterValue = document.getElementById("requestNumberFilterInput").value;

    const emailFilterValue = document.getElementById("emailFilterInput").value.toLowerCase();
    const statusFilterValue = document.getElementById("statusFilterSelect").value;

    const fioMatch = !fioFilterValue || node.data.fio.toLowerCase().includes(fioFilterValue);

    const requestNumberMatch =
      !requestNumberFilterValue || node.data.requestNumber === parseInt(requestNumberFilterValue);

    const emailMatch =
      !emailFilterValue || node.data.email.toLowerCase().includes(emailFilterValue);

    const statusMatch = statusFilterValue === "Все" || node.data.status === statusFilterValue;

    return fioMatch && requestNumberMatch && emailMatch && statusMatch;
  },
};

function onColumnMoved(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("applicationsState", JSON.stringify(columnState));
}

function onColumnResized(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("applicationsState", JSON.stringify(columnState));
}

function onSortChanged(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("applicationsState", JSON.stringify(columnState));
}

function onGridReady(params) {
  const columnState = JSON.parse(localStorage.getItem("applicationsState"));

  if (columnState) {
    params.api.applyColumnState({ state: columnState, applyOrder: true });
  }

  const applyFilter = () => params.api.onFilterChanged();

  document.getElementById("fioFilterInput").addEventListener("input", applyFilter);
  document.getElementById("requestNumberFilterInput").addEventListener("input", applyFilter);
  document.getElementById("emailFilterInput").addEventListener("input", applyFilter);
  document.getElementById("statusFilterSelect").addEventListener("change", applyFilter);
}

const ediv = document.querySelector("#applications-table");

if (agGrid) {
  const gridApi = agGrid.createGrid(ediv, gridOptions);
}
