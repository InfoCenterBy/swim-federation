const gridOptions = {
  localeText: AG_GRID_LOCALE_RU,
  rowHeight: 50,
  rowData: [
    {
      id: 1,
      school: "ООО «Клуб плавания «Аквастарс»",
      region: "Брестская область",
      city: "Брест",
      email: "aqua.brest@gmail.com",
      address: "Брест, ул. Московская, 348/3",
      zipCode: "224007",
      createdAt: "21.11.2019",
    },
    {
      id: 2,
      school: "ООО «Клуб плавания «Аквастарс»",
      region: "Брестская область",
      city: "Брест",
      email: "aqua.brest@gmail.com",
      address: "Брест, ул. Московская, 348/3",
      zipCode: "224007",
      createdAt: "14.11.2019",
    },
    {
      id: 3,
      region: "Гомельская область",
      city: "Гомель",
      school: "ООО «Клуб плавания «Аквастарс»",
      address: "Брест, ул. Московская, 348/3",
      email: "aqua.brest@gmail.com",
      zipCode: "224007",
      createdAt: "25.11.2019",
    },
    {
      id: 4,
      region: "Брестская область",
      city: "Брест",
      school: "ООО «Клуб плавания «Аквастарс»",
      address: "Брест, ул. Московская, 348/3",
      email: "aqua.brest@gmail.com",
      zipCode: "224007",
      createdAt: "05.11.2019",
    },
    {
      id: 5,
      region: "Гомельская область",
      city: "Гомель",
      school: "ООО «Клуб плавания «Аквастарс»",
      address: "Брест, ул. Московская, 348/3",
      email: "aqua.brest@gmail.com",
      zipCode: "224007",
      createdAt: "02.11.2019",
    },
  ],

  columnDefs: [
    { field: "id", headerName: "№", width: 80, minWidth: 80, maxWidth: 80 },
    { field: "school", headerName: "Название", unSortIcon: true, flex: 1, minWidth: 200 },
    { field: "email", headerName: "email", unSortIcon: true, flex: 1, minWidth: 200 },
    { field: "address", headerName: "Адрес", unSortIcon: true, flex: 1, minWidth: 200 },
    { field: "zipCode", headerName: "Индекс", unSortIcon: true, flex: 1, minWidth: 200 },
    { field: "region", headerName: "Регион", unSortIcon: true, flex: 1, minWidth: 200 },
    { field: "city", headerName: "Город", unSortIcon: true, flex: 1, minWidth: 200 },
    { field: "createdAt", headerName: "Дата создания", unSortIcon: true, minWidth: 200 },
    {
      field: "edit",
      headerName: "",
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellRenderer: (params) => {
        return `<a href="cabinet-bfp-employee-edit-school.html"><i class="color-dark-gray hover-main fs-18 bi bi-pencil-square"></i></a>`;
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellRenderer: (params) => {
        return `<button class="bg-transparent" data-bs-target="#deleteSchool" data-bs-toggle="modal"><i class="color-dark-gray hover-main fs-18 bi bi-trash3"></i></button>`;
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
      document.getElementById("region").value !== "all" ||
      document.getElementById("city").value !== "all" ||
      document.getElementById("school").value !== "all"
    );
  },
  doesExternalFilterPass: (node) => {
    const regionFilterValue = document.getElementById("region").value;
    const cityFilterValue = document.getElementById("city").value;
    const schoolFilterValue = document.getElementById("school").value;

    const regionMatch = regionFilterValue === "all" || node.data.region === regionFilterValue;
    const cityMatch = cityFilterValue === "all" || node.data.city === cityFilterValue;
    const schoolMatch = schoolFilterValue === "all" || node.data.city === schoolFilterValue;

    return regionMatch && cityMatch && schoolMatch;
  },
};

let gridApi;
function customAvatarComponent(params) {
  const avatar = `<img class="ag-avatar" src="./img/${params.value}" alt="Avatar">`;
  return avatar;
}

function onColumnMoved(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("schoolsState", JSON.stringify(columnState));
}

function onColumnResized(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("schoolsState", JSON.stringify(columnState));
}

function onSortChanged(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("schoolsState", JSON.stringify(columnState));
}

function onGridReady(params) {
  gridApi = params.api;

  const columnState = JSON.parse(localStorage.getItem("schoolsState"));

  if (columnState) {
    params.api.applyColumnState({ state: columnState, applyOrder: true });
  }

  const filterInputs = ["region", "city"];

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

const ediv = document.querySelector("#schools-table");
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
