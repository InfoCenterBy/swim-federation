const clearIcon = document.querySelector("#clear-icon");
const searchInput = document.querySelector("#search-input");

if (clearIcon && searchInput) {
  clearIcon.addEventListener("click", () => {
    searchInput.value = "";
    clearIcon.classList.add("hidden");
  });

  searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
      clearIcon.classList.remove("hidden");
    } else {
      clearIcon.classList.add("hidden");
    }
  });
}
