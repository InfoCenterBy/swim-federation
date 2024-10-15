const selects = document.querySelectorAll(".form-select");

if (selects) {
  selects.forEach((select) => {
    select.addEventListener("change", function () {
      if (select.value === "") {
        select.style.color = "#797979";
      } else {
        select.style.color = "#1d1d1d";
      }
    });
  });
}
