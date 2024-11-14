const gridOptions = {
  localeText: AG_GRID_LOCALE_RU,
  rowHeight: 50,
  rowData: [
    {
      id: 1,
      photo: "member-avatar.png",
      memberNumber: 123123123,
      fio: "Альхимович Евгений Иванович",
      email: "aroitq@mail.ru",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "15.03.2023 14:45",
      status: "Новая",
      approve: "approve",
      reject: "reject",
    },
  ],

  columnDefs: [
    { field: "id", headerName: "№" },
    {
      field: "photo",
      headerName: "Фото",
      // cellRenderer: (params) => {
      //   return `<img class="ag-avatar" src="./img/male-no-avatar.png" alt="Avatar">`;
      // },
      cellRenderer: (params) => {
        return customAvatarComponent(params);
      },
    },
    { field: "memberNumber", headerName: "Номер билета" },
    {
      field: "fio",
      headerName: "ФИО",
    },
    { field: "email", headerName: "Email" },
    { field: "group", headerName: "Группа" },
    { field: "phone", headerName: "Телефон" },
    { field: "benefit", headerName: "Льгота" },
    { field: "entranceFeePayment", headerName: "Оплата ВВ*" },
    { field: "memberFeePayment", headerName: "Оплата ЧВ*" },
    { field: "sportDegree", headerName: "Разряд" },
    { field: "gender", headerName: "Пол" },
    { field: "birthdayDate", headerName: "Дата рождения" },
    { field: "region", headerName: "Регион" },
    { field: "city", headerName: "Город" },
    { field: "school", headerName: "Школа" },
    { field: "createdAt", headerName: "Дата создания" },
    { field: "edit", headerName: "" },
    { field: "delete", headerName: "" },
    // {
    //   field: "status",
    //   headerName: "Статус",
    //   cellRenderer: (params) => {
    //     return params.value;
    //   },
    //   cellClassRules: {
    //     "ag-badge blue": (params) => params.value === "Новая",
    //     "ag-badge green": (params) => params.value === "Одобрена",
    //     "ag-badge red": (params) => params.value === "Отклонена",
    //   },
    // },
    // {
    //   field: "approve",
    //   headerName: "",
    //   cellRenderer: (params) => {
    //     if (params.data.status === "Новая") {
    //       let acceptButton = `<button class="button--small" data-bs-target="#approveApplication" data-bs-toggle="modal">Принять</button>`;

    //       return acceptButton;
    //     } else {
    //       return "";
    //     }
    //   },
    // },
    // {
    //   field: "reject",
    //   headerName: "",
    //   cellRenderer: (params) => {
    //     if (params.data.status === "Новая") {
    //       let rejectButton = `<button class="button--secondary-small" data-bs-target="#rejectApplication" data-bs-toggle="modal">Отклонить</button>`;

    //       return rejectButton;
    //     } else {
    //       return "";
    //     }
    //   },
    // },
    // {
    //   field: "view",
    //   headerName: "",
    //   cellRenderer: (params) => {
    //     if (params.data.status === "Новая") {
    //       let link = `<a href="cabinet-bfp-employee-applications-detail.html"><i class="color-main hover-main-hover fs-18 bi bi-eye"></i></a>`;

    //       //viewButton.addEventListener("click", () => showPopup("Отклонить", params));

    //       return link;
    //     } else {
    //       return "";
    //     }
    //   },
    // },
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
    // return (
    //   // document.getElementById("fioFilterInput").value !== "" ||
    //   // document.getElementById("requestNumberFilterInput").value !== "" ||
    //   // document.getElementById("emailFilterInput").value !== "" ||
    //   // document.getElementById("statusFilterSelect").value !== ""
    // );
  },
  doesExternalFilterPass: (node) => {
    const fioFilterValue = document.getElementById("fioFilterInput").value.toLowerCase();
    const requestNumberFilterValue = document.getElementById("requestNumberFilterInput").value;

    const emailFilterValue = document.getElementById("emailFilterInput").value.toLowerCase();
    const statusFilterValue = document.getElementById("statusFilterSelect").value;

    const fioMatch = !fioFilterValue || node.data.fio.toLowerCase().includes(fioFilterValue);

    const requestNumberMatch =
      !requestNumberFilterValue || node.data.requestNumber.includes(requestNumberFilterValue);

    const emailMatch =
      !emailFilterValue || node.data.email.toLowerCase().includes(emailFilterValue);

    const statusMatch = statusFilterValue === "Все" || node.data.status === statusFilterValue;

    return fioMatch && requestNumberMatch && emailMatch && statusMatch;
  },
};

let gridApi;
function customAvatarComponent(params) {
  const avatar = `<img class="ag-avatar" src="./img/${params.value}" alt="Avatar">`;
  return avatar;
}
// function createColumnSelectionForm() {
//   const columnDefs = gridOptions.columnDefs;
//   const form = document.getElementById("columnForm");
//   form.innerHTML = ""; // Очищаем форму перед заполнением

//   columnDefs.forEach((colDef) => {
//     const label = document.createElement("label");
//     label.style.display = "block";

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.name = colDef.field;
//     checkbox.checked = !colDef.hide; // Если колонка не скрыта, чекбокс отмечен

//     const span = document.createElement("span");
//     span.textContent = colDef.headerName;

//     label.appendChild(checkbox);
//     label.appendChild(span);
//     form.appendChild(label);
//   });
// }
function createColumnSelectionForm() {
  const columnDefs = gridOptions.columnDefs;
  const form = document.getElementById("columnForm");
  form.innerHTML = "";

  columnDefs.forEach((colDef) => {
    const label = document.createElement("label");
    label.style.display = "block";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = colDef.field;
    const column = gridApi.getColumn(colDef.field);
    if (column) {
      checkbox.checked = column.isVisible();
    } else {
      checkbox.checked = true; // По умолчанию показываем колонку
    }

    const span = document.createElement("span");
    span.textContent = colDef.headerName;

    label.appendChild(checkbox);
    label.appendChild(span);
    form.appendChild(label);

    // Обработчик события на изменение чекбокса
    checkbox.addEventListener("change", () => {
      gridApi.setColumnsVisible([colDef.field], checkbox.checked);

      const columnState = gridApi.getColumnState();
      localStorage.setItem("agColumnState", JSON.stringify(columnState));
    });
  });
}

function onColumnMoved(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("agColumnState", JSON.stringify(columnState));
}

function onColumnResized(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("agColumnState", JSON.stringify(columnState));
}

function onSortChanged(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("agColumnState", JSON.stringify(columnState));
}

function onGridReady(params) {
  gridApi = params.api;

  const columnState = JSON.parse(localStorage.getItem("agColumnState"));

  if (columnState) {
    params.api.applyColumnState({ state: columnState, applyOrder: true });
  }

  const applyFilter = () => params.api.onFilterChanged();
  createColumnSelectionForm();

  // document.getElementById("fioFilterInput").addEventListener("input", applyFilter);
  // document.getElementById("requestNumberFilterInput").addEventListener("input", applyFilter);
  // document.getElementById("emailFilterInput").addEventListener("input", applyFilter);
  // document.getElementById("statusFilterSelect").addEventListener("change", applyFilter);
}

const ediv = document.querySelector("#members-table");

if (agGrid) {
  agGrid.createGrid(ediv, gridOptions);
}
