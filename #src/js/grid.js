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

  onColumnMoved: (params) => saveColumnState(params),
  onColumnResized: () => console.log("456"),
  onSortChanged: () => console.log("789"),
  onGridReady: (params) => {
    const columnApi = params.api;

    const columnState = columnApi.getColumnState();

    console.log("Текущее состояние колонок:", columnState);

    localStorage.setItem("columnState", JSON.stringify(columnState));
  },
};

function saveColumnState(params) {
  console.log("123");

  const columnState = params.api.getColumnState();
  localStorage.setItem("agColumnState", JSON.stringify(columnState));
}

const ediv = document.querySelector("#myGrid");

const gridApi = agGrid.createGrid(ediv, gridOptions);
