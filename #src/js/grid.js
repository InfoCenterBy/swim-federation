const gridOptions = {
  rowData: [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ],

  columnDefs: [{ field: "make" }, { field: "model" }, { field: "price" }, { field: "electric" }],
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

  if (columnState) {
    console.log("ready");

    params.api.applyColumnState({ state: columnState, applyOrder: true });
  }
}

const ediv = document.querySelector("#myGrid");

const gridApi = agGrid.createGrid(ediv, gridOptions);
