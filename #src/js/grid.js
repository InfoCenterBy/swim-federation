// Grid API: Access to Grid API methods

// Grid Options: Contains all of the grid configurations
const gridOptions = {
  // Data to be displayed
  rowData: [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ],
  // Columns to be displayed (Should match rowData properties)
  columnDefs: [{ field: "make" }, { field: "model" }, { field: "price" }, { field: "electric" }],
  defaultColDef: {
    flex: 1,
  },
  // onColumnMoved: () => saveColumnState,
  onColumnMoved: () => console.log("123"),
  onColumnResized: () => saveColumnState,
  onSortChanged: () => saveColumnState,
  onGridReady: () => loadColumnState,
};

console.log(gridOptions);

function saveColumnState() {
  const columnState = gridOptions.columnApi.getColumnState();
  localStorage.setItem("columnState", JSON.stringify(columnState));
}

function loadColumnState() {
  const savedState = localStorage.getItem("columnState");
  if (savedState) {
    gridOptions.columnApi.applyColumnState({
      state: JSON.parse(savedState),
      applyOrder: true,
    });
  }
}

// Загружаем состояние при первой инициализации
loadColumnState();

function clearColumnState() {
  localStorage.removeItem("columnState");
  gridOptions.columnApi.resetColumnState();
}

const ediv = document.querySelector("#myGrid");
// Create Grid: Create new grid within the #myGrid div, using the Grid Options object
const gridApi = agGrid.createGrid(ediv, gridOptions);
