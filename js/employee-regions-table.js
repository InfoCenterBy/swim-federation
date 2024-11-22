const gridOptions = {
  localeText: AG_GRID_LOCALE_RU,
  rowHeight: 50,
  rowData: [
    {
      id: 5,
      region: "Брестская область",
      city: "Брест",
      createdAt: "24.11.2019",
    },
  ],
  getRowStyle: (params) => {
    if (params.data.active === false) {
      return { background: "#EAEAEA", color: "#797979" };
    }
  },

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
    // return (
    //   document.getElementById("membershipNumberFilter").value !== "" ||
    //   document.getElementById("fioFilter").value !== "" ||
    //   document.getElementById("emailFilter").value !== "" ||
    //   document.getElementById("paymentStatusFilter").value !== "all" ||
    //   document.getElementById("contributionTypeFilter").value !== "all" ||
    //   document.getElementById("paymentTypeFilter").value !== "all"
    // );
  },
  doesExternalFilterPass: (node) => {
    //   const membershipNumberFilterValue = document.getElementById("membershipNumberFilter").value;
    //   const fioFilterValue = document.getElementById("fioFilter").value.toLowerCase();
    //   const emailFilterValue = document.getElementById("emailFilter").value.toLowerCase();
    //   const paymentStatusFilterValue = document.getElementById("paymentStatusFilter").value;
    //   const contributionTypeFilterValue = document.getElementById("contributionTypeFilter").value;
    //   const paymentTypeFilterValue = document.getElementById("paymentTypeFilter").value;
    //   const membershipNumberMatch =
    //     !membershipNumberFilterValue ||
    //     node.data.membershipNumber.toString().includes(membershipNumberFilterValue);
    //   const fioMatch = !fioFilterValue || node.data.fio.toLowerCase().includes(fioFilterValue);
    //   const emailMatch =
    //     !emailFilterValue || node.data.email.toLowerCase().includes(emailFilterValue);
    //   const paymentStatusMatch =
    //     paymentStatusFilterValue === "all" ||
    //     String(node.data.paymentStatus) === paymentStatusFilterValue;
    //   const contributionTypeMatch =
    //     contributionTypeFilterValue === "all" ||
    //     String(node.data.contributionType) === contributionTypeFilterValue;
    //   let paymentTypeMatch = false;
    //   if (paymentTypeFilterValue === "all") {
    //     paymentTypeMatch = true;
    //   } else if (paymentTypeFilterValue === "erip") {
    //     paymentTypeMatch = node.data.erip === true && node.data.cashless === false;
    //   } else if (paymentTypeFilterValue === "cashless") {
    //     paymentTypeMatch = node.data.erip === false && node.data.cashless === true;
    //   }
    //   return (
    //     membershipNumberMatch &&
    //     fioMatch &&
    //     emailMatch &&
    //     paymentStatusMatch &&
    //     contributionTypeMatch &&
    //     paymentTypeMatch
    //   );
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
