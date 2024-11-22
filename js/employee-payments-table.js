const gridOptions = {
  localeText: AG_GRID_LOCALE_RU,
  rowHeight: 50,
  rowData: [
    {
      id: 1,
      photo: "member-avatar.png",
      membershipNumber: "123123123",
      fio: "Кабан Евгений Иванович",
      email: "kaban@mail.ru",
      issueDate: "15.03.2023 14:45",
      contributionType: "Вступительный взнос",
      paymentType: "erip",
      erip: true,
      cashless: true,
      paymentStatus: "Оплачен",
      sum: "40 BYN",
      paymentDate: "12.01.2023 12:45",
      phone: "+375(17)222-26-71",
    },
    {
      id: 2,
      photo: "member-avatar.png",
      membershipNumber: "676767676",
      fio: "Котик Евгений Иванович",
      email: "kotik@mail.ru",
      issueDate: "15.03.2023 14:45",
      contributionType: "Вступительный взнос",
      paymentType: "erip",
      erip: true,
      cashless: true,
      paymentStatus: "Оплачен",
      sum: "40 BYN",
      paymentDate: "12.01.2023 12:45",
      phone: "+375(17)211-26-71",
    },
    {
      id: 3,
      photo: "member-avatar.png",
      membershipNumber: "4445",
      fio: "Жабов Евгений Иванович",
      email: "aroitq@mail.ru",
      issueDate: "15.03.2023 14:45",
      contributionType: "Членский взнос",

      paymentType: "erip",
      erip: false,
      cashless: false,
      paymentStatus: "Оплачен",
      sum: "40 BYN",
      paymentDate: "12.01.2023 12:45",
      phone: "+375(17)243-26-71",
    },
    {
      id: 4,
      photo: "member-avatar.png",
      membershipNumber: "123123123",
      fio: "Альхимович Евгений Иванович",
      email: "aroitq@mail.ru",
      issueDate: "15.03.2023 14:45",
      contributionType: "Вступительный взнос",
      paymentType: "erip",
      erip: true,
      cashless: false,
      paymentStatus: "Не оплачен",
      sum: "40 BYN",
      paymentDate: "12.01.2023 12:45",
      phone: "+375(17)243-26-71",
    },
    {
      id: 5,
      photo: "member-avatar.png",
      membershipNumber: "3333",
      fio: "Альхимович Евгений Иванович",
      email: "aroitq@mail.ru",
      issueDate: "15.03.2023 14:45",
      contributionType: "Вступительный взнос",
      paymentType: "erip",
      erip: false,
      cashless: true,
      paymentStatus: "Оплачен",
      sum: "40 BYN",
      paymentDate: "12.01.2023 12:45",
      phone: "+375(17)243-24-71",
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
    { field: "membershipNumber", headerName: "Номер билета" },
    {
      field: "fio",
      headerName: "ФИО",
    },
    { field: "email", headerName: "Email" },
    {
      field: "paymentStatus",
      headerName: "Статус",
      cellClassRules: {
        "ag-badge green": (params) => params.value === "Оплачен",
        "ag-badge red": (params) => params.value === "Не оплачен",
      },
    },
    { field: "phone", headerName: "Телефон" },
    {
      field: "erip",
      headerName: "ЕРИП",
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
      field: "cashless",
      headerName: "Безналичная оплата",
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
      field: "contributionType",
      headerName: "Тип взноса",
      cellClassRules: {
        "ag-badge blue": (params) => params.value === "Членский взнос",
        "ag-badge red": (params) => params.value === "Вступительный взнос",
      },
    },
    { field: "sum", headerName: "Сумма" },
    { field: "issueDate", headerName: "Дата выставления" },
    { field: "paymentDate", headerName: "Дата оплаты" },
  ],
  defaultColDef: {
    // flex: 1,
    wrapText: true,
    autoHeight: true,
  },
  autoSizeStrategy: {
    type: "fitCellContents",
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
      document.getElementById("membershipNumberFilter").value !== "" ||
      document.getElementById("fioFilter").value !== "" ||
      document.getElementById("emailFilter").value !== "" ||
      document.getElementById("paymentStatusFilter").value !== "all" ||
      document.getElementById("contributionTypeFilter").value !== "all" ||
      document.getElementById("paymentTypeFilter").value !== "all"
    );
  },
  doesExternalFilterPass: (node) => {
    const membershipNumberFilterValue = document.getElementById("membershipNumberFilter").value;
    const fioFilterValue = document.getElementById("fioFilter").value.toLowerCase();
    const emailFilterValue = document.getElementById("emailFilter").value.toLowerCase();

    const paymentStatusFilterValue = document.getElementById("paymentStatusFilter").value;

    const contributionTypeFilterValue = document.getElementById("contributionTypeFilter").value;
    const paymentTypeFilterValue = document.getElementById("paymentTypeFilter").value;

    const membershipNumberMatch =
      !membershipNumberFilterValue ||
      node.data.membershipNumber.toString().includes(membershipNumberFilterValue);

    const fioMatch = !fioFilterValue || node.data.fio.toLowerCase().includes(fioFilterValue);

    const emailMatch =
      !emailFilterValue || node.data.email.toLowerCase().includes(emailFilterValue);

    const paymentStatusMatch =
      paymentStatusFilterValue === "all" ||
      String(node.data.paymentStatus) === paymentStatusFilterValue;

    const contributionTypeMatch =
      contributionTypeFilterValue === "all" ||
      String(node.data.contributionType) === contributionTypeFilterValue;

    let paymentTypeMatch = false;
    if (paymentTypeFilterValue === "all") {
      paymentTypeMatch = true;
    } else if (paymentTypeFilterValue === "erip") {
      paymentTypeMatch = node.data.erip === true && node.data.cashless === false;
    } else if (paymentTypeFilterValue === "cashless") {
      paymentTypeMatch = node.data.erip === false && node.data.cashless === true;
    }

    return (
      membershipNumberMatch &&
      fioMatch &&
      emailMatch &&
      paymentStatusMatch &&
      contributionTypeMatch &&
      paymentTypeMatch
    );
  },
};

let gridApi;
function customAvatarComponent(params) {
  const avatar = `<img class="ag-avatar" src="./img/${params.value}" alt="Avatar">`;
  return avatar;
}

function createColumnSelection() {
  const columnDefs = gridOptions.columnDefs;

  const columnSelector = document.getElementById("columnSelector");

  columnDefs.forEach((colDef) => {
    const checkboxDiv = document.createElement("div");
    checkboxDiv.className = "form__checkbox mb-0";

    const label = document.createElement("label");
    label.className = "form__checkbox-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = colDef.field;

    const column = gridApi.getColumn(colDef.field);
    if (column) {
      checkbox.checked = column.isVisible();
    } else {
      checkbox.checked = true;
    }

    const textSpan = document.createElement("span");
    textSpan.className = "form__checkbox-text";
    textSpan.textContent = colDef.headerName;

    const checkmarkSpan = document.createElement("span");
    checkmarkSpan.className = "form__checkbox-checkmark--dark";

    label.appendChild(checkbox);
    label.appendChild(textSpan);
    label.appendChild(checkmarkSpan);

    checkboxDiv.appendChild(label);
    columnSelector.appendChild(checkboxDiv);

    checkbox.addEventListener("change", () => {
      gridApi.setColumnsVisible([colDef.field], checkbox.checked);

      const columnState = gridApi.getColumnState();
      localStorage.setItem("agColumnState", JSON.stringify(columnState));
    });
  });
}

const toggleCheckboxesBtn = document.querySelector(".columns-select__toggle-button");
const checkboxesBody = document.querySelector(".columns-select__body");

if (toggleCheckboxesBtn && checkboxesBody) {
  toggleCheckboxesBtn.addEventListener("click", (event) => {
    checkboxesBody.classList.toggle("hidden");
  });

  document.addEventListener("click", (event) => {
    const isClickInside =
      checkboxesBody.contains(event.target) || toggleCheckboxesBtn.contains(event.target);
    if (!isClickInside) {
      checkboxesBody.classList.add("hidden");
    }
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

  createColumnSelection();
  const filterInputs = [
    "membershipNumberFilter",
    "fioFilter",
    "emailFilter",
    "paymentStatusFilter",
    "contributionTypeFilter",
    "paymentTypeFilter",
  ];

  filterInputs.forEach((id) => {
    const element = document.getElementById(id);

    if (element) {
      element.addEventListener("input", onFilterChanged);
      element.addEventListener("change", onFilterChanged);
    }
  });

  function onFilterChanged() {
    params.api.onFilterChanged();
  }
}

const ediv = document.querySelector("#payments-table");

if (agGrid) {
  agGrid.createGrid(ediv, gridOptions);
}
