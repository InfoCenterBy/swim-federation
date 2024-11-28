const gridOptions = {
  localeText: AG_GRID_LOCALE_RU,
  rowHeight: 50,
  rowData: [
    {
      id: 1,
      photo: "member-avatar.png",
      membershipNumber: "123123123",
      fio: "Альхимович Евгений Иванович",
      email: "aroitq@mail.ru",
      group: "Заместитель директора",
      phone: "+375(17)243-26-71",
      benefit: false,
      entranceFeePayment: true,
      memberFeePayment: false,
      sportsDegree: "МСМК",
      gender: "М",
      birthdayDate: "29.05.1989",
      region: "Брестская область",
      city: "Брест",
      school: "Школа5",
      createdAt: "25.04.2007",
      active: false,
      age: 18,
      edit: "",
      delete: "",
    },
    {
      id: 5,
      photo: "member-avatar.png",
      membershipNumber: "123123123",
      fio: "Альхимович Евгений Иванович",
      email: "aroitq@mail.ru",
      group: "Судья",
      phone: "+375(17)243-26-71",
      benefit: false,
      entranceFeePayment: true,
      memberFeePayment: false,
      sportsDegree: "МСМК",
      gender: "М",
      birthdayDate: "29.05.1989",
      region: "Брестская область",
      city: "Брест2",
      school: "ГСУСУ «Брестский областной ЦОР по водным видам спорта»",
      createdAt: "25.04.2007",
      active: false,
      age: 18,
      edit: "",
      delete: "",
    },
    {
      id: 2,
      photo: "member-avatar.png",
      membershipNumber: "555",
      fio: "Кабанчик Валерий Евгенич",
      email: "aroitq@mail.ru",
      group: "Без группы",
      phone: "+375(17)243-26-71",
      benefit: true,
      entranceFeePayment: true,
      memberFeePayment: true,
      sportsDegree: "МС",
      gender: "Ж",
      birthdayDate: "29.05.1989",
      region: "Гомельская область",
      city: "Гомель",
      school: "Школа 3",
      createdAt: "25.04.2007",
      active: true,
      age: 25,
      edit: "",
      delete: "",
    },
    {
      id: 3,
      photo: "member-avatar.png",
      membershipNumber: "9999991",
      fio: "Попик Валентина Альбертовна",
      email: "aroitq@mail.ru",
      group: "Председатель",
      phone: "+375(17)243-26-71",
      benefit: false,
      entranceFeePayment: false,
      memberFeePayment: true,
      sportsDegree: "КМС",
      gender: "М",
      birthdayDate: "29.05.1989",
      region: "Витебская область",
      city: "Витебск",
      school: "Школа",
      createdAt: "25.04.2007",
      active: true,
      age: 33,
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
    { field: "membershipNumber", headerName: "Номер билета" },
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
          params.value === "Генеральный секретарь" ||
          params.value === "Судья" ||
          params.value === "Пресс-секретарь",
        "ag-badge green": (params) =>
          params.value === "Председатель" ||
          params.value === "Методист" ||
          params.value === "Заместитель председателя" ||
          params.value === "Бухгалтер",
        "ag-badge red": (params) =>
          params.value === "Спортсмен" ||
          params.value === "Администратор" ||
          params.value === "Директор" ||
          params.value === "Заместитель директора",
        "ag-badge yellow": (params) =>
          params.value === "Тренер" || params.value === "Старший тренер",
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
      field: "sportsDegree",
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
    return (
      document.getElementById("membershipNumberFilter").value !== "" ||
      document.getElementById("fioFilter").value !== "" ||
      document.getElementById("ageFromFilter").value !== "" ||
      document.getElementById("ageToFilter").value !== "" ||
      document.getElementById("genderFilter").value !== "all" ||
      document.getElementById("sportsDegreeFilter").value !== "all" ||
      document.getElementById("region").value !== "all" ||
      document.getElementById("city").value !== "all" ||
      document.getElementById("school").value !== "all" ||
      document.getElementById("groupFilter").value !== "all" ||
      document.getElementById("privilegeFilter").value !== "all" ||
      document.getElementById("activeMemberFilter").value !== "all" ||
      document.getElementById("paymentFilter").value !== "all"
    );
  },
  doesExternalFilterPass: (node) => {
    const membershipNumberFilterValue = document.getElementById("membershipNumberFilter").value;
    const fioFilterValue = document.getElementById("fioFilter").value.toLowerCase();

    const ageFromFilterValue = parseInt(document.getElementById("ageFromFilter").value, 10);
    const ageToFilterValue = parseInt(document.getElementById("ageToFilter").value, 10);

    const genderFilterValue = document.getElementById("genderFilter").value;
    const sportsDegreeFilterValue = document.getElementById("sportsDegreeFilter").value;
    const regionFilterValue = document.getElementById("region").value;
    const cityFilterValue = document.getElementById("city").value;
    const schoolFilterValue = document.getElementById("school").value;
    const groupFilterValue = document.getElementById("groupFilter").value;
    const privilegeFilterValue = document.getElementById("privilegeFilter").value;
    const activeMemberFilterValue = document.getElementById("activeMemberFilter").value;
    const paymentFilterValue = document.getElementById("paymentFilter").value;

    const membershipNumberMatch =
      !membershipNumberFilterValue ||
      node.data.membershipNumber.toString().includes(membershipNumberFilterValue);

    const fioMatch = !fioFilterValue || node.data.fio.toLowerCase().includes(fioFilterValue);

    const ageMatch =
      (isNaN(ageFromFilterValue) || node.data.age >= ageFromFilterValue) &&
      (isNaN(ageToFilterValue) || node.data.age <= ageToFilterValue);

    const genderMatch = genderFilterValue === "all" || node.data.gender === genderFilterValue;

    const sportsDegreeMatch =
      sportsDegreeFilterValue === "all" || node.data.sportsDegree === sportsDegreeFilterValue;

    const regionMatch = regionFilterValue === "all" || node.data.region === regionFilterValue;

    const cityMatch = cityFilterValue === "all" || node.data.city === cityFilterValue;

    const schoolMatch = schoolFilterValue === "all" || node.data.school === schoolFilterValue;

    const groupMatch = groupFilterValue === "all" || node.data.group === groupFilterValue;

    const privilegeMatch =
      privilegeFilterValue === "all" || String(node.data.benefit) === privilegeFilterValue;

    const activeMemberMatch =
      activeMemberFilterValue === "all" || String(node.data.active) === activeMemberFilterValue;

    let paymentMatch = false;
    if (paymentFilterValue === "all") {
      paymentMatch = true;
    } else if (paymentFilterValue === "onlyMember") {
      paymentMatch = node.data.memberFeePayment === true && node.data.entranceFeePayment === false;
    } else if (paymentFilterValue === "onlyEntrance") {
      paymentMatch = node.data.memberFeePayment === false && node.data.entranceFeePayment === true;
    } else if (paymentFilterValue === "notPaid") {
      paymentMatch = node.data.memberFeePayment === false && node.data.entranceFeePayment === false;
    }

    return (
      membershipNumberMatch &&
      fioMatch &&
      ageMatch &&
      genderMatch &&
      sportsDegreeMatch &&
      regionMatch &&
      cityMatch &&
      schoolMatch &&
      groupMatch &&
      privilegeMatch &&
      activeMemberMatch &&
      paymentMatch
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
  columnDefs.pop();
  columnDefs.pop();
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
      localStorage.setItem("reportsState", JSON.stringify(columnState));
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

  localStorage.setItem("reportsState", JSON.stringify(columnState));
}

function onColumnResized(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("reportsState", JSON.stringify(columnState));
}

function onSortChanged(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("reportsState", JSON.stringify(columnState));
}

function onGridReady(params) {
  gridApi = params.api;

  const columnState = JSON.parse(localStorage.getItem("reportsState"));

  if (columnState) {
    params.api.applyColumnState({ state: columnState, applyOrder: true });
  }

  createColumnSelection();
  const filterInputs = [
    "membershipNumberFilter",
    "fioFilter",
    "ageFromFilter",
    "ageToFilter",
    "genderFilter",
    "sportsDegreeFilter",
    "region",
    "city",
    "school",
    "groupFilter",
    "privilegeFilter",
    "activeMemberFilter",
    "paymentFilter",
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

const ediv = document.querySelector("#members-table");

const globalSearchInput = document.getElementById("globalSearch");

function onFilterTextBoxChanged() {
  gridApi.setGridOption("quickFilterText", document.getElementById("globalSearch").value);
}

if (globalSearchInput) {
  globalSearchInput.addEventListener("input", () => onFilterTextBoxChanged());
}

if (agGrid) {
  agGrid.createGrid(ediv, gridOptions);
}
