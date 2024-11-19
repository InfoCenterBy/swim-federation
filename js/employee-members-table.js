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
      group: "Заместитель директора",
      phone: "+375(17)243-26-71",
      benefit: false,
      entranceFeePayment: true,
      memberFeePayment: false,
      sportDegree: "МСМК",
      gender: "ж",
      birthdayDate: "29.05.1989",
      region: "Брестская область",
      city: "Брест",
      school: "ГСУСУ «Брестский областной ЦОР по водным видам спорта»",
      createdAt: "25.04.2007",
      active: false,
      edit: "",
      delete: "",
    },
    {
      id: 1,
      photo: "member-avatar.png",
      memberNumber: 123123123,
      fio: "Альхимович Евгений Иванович",
      email: "aroitq@mail.ru",
      group: "Заместитель директора",
      phone: "+375(17)243-26-71",
      benefit: false,
      entranceFeePayment: true,
      memberFeePayment: false,
      sportDegree: "МСМК",
      gender: "ж",
      birthdayDate: "29.05.1989",
      region: "Брестская область",
      city: "Брест",
      school: "ГСУСУ «Брестский областной ЦОР по водным видам спорта»",
      createdAt: "25.04.2007",
      active: true,
      edit: "",
      delete: "",
    },
  ],
  getRowStyle: (params) => {
    if (params.data.active === false) {
      return { background: "#EAEAEA", color: "#797979" };
    }
  },

  columnDefs: [
    { field: "id", headerName: "№" },
    {
      field: "photo",
      headerName: "Фото",
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
    {
      field: "group",
      headerName: "Группа",
      cellClassRules: {
        "ag-badge blue": (params) =>
          params.value === "Исполнительный директор" ||
          "Генеральный секретарь" ||
          "Судья" ||
          "Пресс-секретарь",
        "ag-badge green": (params) =>
          params.value === "Председатель" ||
          "Методист" ||
          "Заместитель председателя" ||
          "Бухгалтер",
        "ag-badge red": (params) =>
          params.value === "Спортсмен" || "Администратор" || "Директор" || "Заместитель директора",
        "ag-badge yellow": (params) => params.value === "Тренер" || "Старший тренер",
        "ag-badge gray": (params) => params.value === "Без группы",
      },
    },
    { field: "phone", headerName: "Телефон" },
    {
      field: "benefit",
      headerName: "Льгота",
      cellRenderer: (params) => {
        if (params.value === true) {
          let greenCheckbox = `<img src="./img/icons/checkbox-green.png" />`;

          return greenCheckbox;
        } else {
          let redCheckbox = `<img src="./img/icons/checkbox-red.png" />`;
          return redCheckbox;
        }
      },
    },
    {
      field: "entranceFeePayment",
      headerName: "Оплата ВВ*",
      cellRenderer: (params) => {
        if (params.value === true) {
          let greenCheckbox = `<img src="./img/icons/checkbox-green.png" />`;

          return greenCheckbox;
        } else {
          let redCheckbox = `<img src="./img/icons/checkbox-red.png" />`;
          return redCheckbox;
        }
      },
    },
    {
      field: "memberFeePayment",
      headerName: "Оплата ЧВ*",
      cellRenderer: (params) => {
        if (params.value === true) {
          let greenCheckbox = `<img src="./img/icons/checkbox-green.png" />`;

          return greenCheckbox;
        } else {
          let redCheckbox = `<img src="./img/icons/checkbox-red.png" />`;
          return redCheckbox;
        }
      },
    },
    {
      field: "sportDegree",
      headerName: "Разряд",
      cellRenderer: (params) => {
        return params.value.toUpperCase();
      },
    },
    {
      field: "gender",
      headerName: "Пол",
      cellRenderer: (params) => {
        return params.value.toUpperCase();
      },
      cellClassRules: {
        "ag-badge blue": (params) => params.value.toLowerCase() === "м",
        "ag-badge red": (params) => params.value.toLowerCase() === "ж",
      },
    },
    { field: "birthdayDate", headerName: "Дата рождения" },
    { field: "region", headerName: "Регион" },
    { field: "city", headerName: "Город" },
    { field: "school", headerName: "Школа" },
    { field: "createdAt", headerName: "Дата создания" },
    {
      field: "edit",
      headerName: "",
      cellRenderer: (params) => {
        return `<a href="cabinet-bfp-employee-edit-member.html"><i class="color-dark-gray hover-main fs-18 bi bi-pencil-square"></i></a>`;
      },
    },
    {
      field: "delete",
      headerName: "",
      cellRenderer: (params) => {
        return `<button class="bg-transparent" data-bs-target="#deleteMember" data-bs-toggle="modal"><i class="color-dark-gray hover-main fs-18 bi bi-trash3"></i></button>`;
      },
    },
  ],
  defaultColDef: {
    // flex: 1,
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
      checkbox.checked = true;
    }

    const span = document.createElement("span");
    span.textContent = colDef.headerName;

    label.appendChild(checkbox);
    label.appendChild(span);
    form.appendChild(label);

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
