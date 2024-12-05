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
    { field: "id", headerName: "№", width: 80, minWidth: 80, maxWidth: 80 },
    { field: "region", headerName: "Регион", flex: 1, unSortIcon: true, minWidth: 180 },
    { field: "city", headerName: "Город", flex: 1, unSortIcon: true, minWidth: 180 },
    { field: "createdAt", headerName: "Дата создания", flex: 1, unSortIcon: true, minWidth: 180 },
    {
      field: "edit",
      headerName: "",
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellRenderer: (params) => {
        return `<a href="cabinet-bfp-employee-edit-region.html"><i class="color-dark-gray hover-main fs-18 bi bi-pencil-square"></i></a>`;
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellRenderer: (params) => {
        return `<button class="bg-transparent" data-bs-target="#deleteRegion" data-bs-toggle="modal" data-id=${params.data.id}><i class="color-dark-gray hover-main fs-18 bi bi-trash3"></i></button>`;
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
      document.getElementById("city").value !== "all"
    );
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

  localStorage.setItem("regionsState", JSON.stringify(columnState));
}

function onColumnResized(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("regionsState", JSON.stringify(columnState));
}

function onSortChanged(params) {
  const columnState = params.api.getColumnState();

  localStorage.setItem("regionsState", JSON.stringify(columnState));
}

function onGridReady(params) {
  gridApi = params.api;

  const columnState = JSON.parse(localStorage.getItem("regionsState"));

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

const deleteModal = document.getElementById("deleteRegion");

deleteModal.addEventListener("show.bs.modal", function (event) {
  const button = event.relatedTarget;
  const id = button.getAttribute("data-id");
  deleteModal.setAttribute("data-id", id);

  const modalBodyText = deleteModal.querySelector(".modal-body p");
  modalBodyText.textContent = `Вы действительно хотите удалить регион с ID ${id}?`;
});

const confirmDeleteButton = deleteModal.querySelector(".modal-body .button.px-4");
confirmDeleteButton.addEventListener("click", function () {
  const idToDelete = deleteModal.getAttribute("data-id");
  deleteItem(idToDelete);
});

function deleteItem(id) {
  fetch(`/delete-region/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        gridOptions.api.applyTransaction({ remove: [{ id: parseInt(id) }] });
      } else {
        alert("Ошибка при удалении региона.");
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      alert("Ошибка при удалении региона.");
    });
}
