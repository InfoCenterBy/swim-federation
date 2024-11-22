const gridOptions = {
  localeText: AG_GRID_LOCALE_RU,
  rowHeight: 50,
  rowData: [
    {
      id: 1,
      region: "Брестская область",
      city: "Брест",
      createdAt: "21.11.2019",
    },
    {
      id: 2,
      region: "Брестская область",
      city: "Брест",
      createdAt: "14.11.2019",
    },
    {
      id: 3,
      region: "Гомельская область",
      city: "Гомель",
      createdAt: "25.11.2019",
    },
    {
      id: 4,
      region: "Брестская область",
      city: "Брест",
      createdAt: "05.11.2019",
    },
    {
      id: 5,
      region: "Гомельская область",
      city: "Гомель",
      createdAt: "02.11.2019",
    },
  ],

  columnDefs: [
    { field: "id", headerName: "№" },
    { field: "region", headerName: "Область" },
    { field: "city", headerName: "Регион" },
    { field: "createdAt", headerName: "Дата создания" },
    {
      field: "edit",
      headerName: "",
      cellRenderer: (params) => {
        return `<a href="cabinet-bfp-employee-edit-region.html"><i class="color-dark-gray hover-main fs-18 bi bi-pencil-square"></i></a>`;
      },
    },
    {
      field: "delete",
      headerName: "",
      cellRenderer: (params) => {
        return `<button class="bg-transparent" data-bs-target="#deleteRegion" data-bs-toggle="modal"><i class="color-dark-gray hover-main fs-18 bi bi-trash3"></i></button>`;
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    wrapText: true,
    autoHeight: true,
  },
  autoSizeStrategy: {
    type: "fitGridWidth",
    defaultMinWidth: 100,
  },

  pagination: true,

  paginationPageSize: 10,

  paginationPageSizeSelector: [10, 20, 50, 100],

  onColumnMoved: onColumnMoved,
  onColumnResized: onColumnResized,
  onSortChanged: onSortChanged,
  onGridReady: onGridReady,
  isExternalFilterPresent: () => {
    return document.getElementById("region").value !== "all" || document.getElementById("city").value !== "all";
  },
  doesExternalFilterPass: (node) => {
    const regionFilterValue = document.getElementById("region").value;
    const cityFilterValue = document.getElementById("city").value;

    const regionMatch = regionFilterValue === "all" || node.data.region === regionFilterValue;
    const cityMatch = cityFilterValue === "all" || node.data.city === cityFilterValue;

    return regionMatch && cityMatch;
  },
};

let gridApi;
function customAvatarComponent(params) {
  const avatar = `<img class="ag-avatar" src="./img/${params.value}" alt="Avatar">`;
  return avatar;
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

const ediv = document.querySelector("#regions-table");
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
