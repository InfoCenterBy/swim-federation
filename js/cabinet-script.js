const asideButton = document.querySelector(".cabinet__aside-button");
const asideMenu = document.querySelector(".cabinet__aside");
const cabinetContent = document.querySelector(".cabinet__content");
const cabinetFooter = document.querySelector(".cabinet__footer");

function toggleMenu() {
  asideMenu.classList.toggle("compact");
  asideButton.classList.toggle("compact");
  cabinetContent.classList.toggle("full");
  cabinetFooter.classList.toggle("full");

  const isMenuButtomCompact = asideButton.classList.contains("compact");
  const isCompact = asideMenu.classList.contains("compact");
  const isContentFull = cabinetContent.classList.contains("full");
  const isFooterFull = cabinetFooter.classList.contains("full");

  localStorage.setItem("contentFull", isContentFull);
  localStorage.setItem("footerFull", isFooterFull);
  localStorage.setItem("menuCompact", isCompact);
  localStorage.setItem("menuButtonCompact", isMenuButtomCompact);
}

document.addEventListener("DOMContentLoaded", function () {
  asideMenu.classList.add("ready");
  cabinetContent.classList.add("ready");
  cabinetFooter.classList.add("ready");
  asideButton.classList.add("ready");

  const isCompact = localStorage.getItem("menuCompact") === "true";
  const isContentFull = localStorage.getItem("contentFull") === "true";
  const isFooterFull = localStorage.getItem("footerFull") === "true";
  const isMenuButtonCompact = localStorage.getItem("menuButtonCompact") === "true";

  if (isCompact) {
    asideMenu.classList.add("compact");
  }

  if (isContentFull) {
    cabinetContent.classList.add("full");
  }

  if (isFooterFull) {
    cabinetFooter.classList.add("full");
  }

  if (isMenuButtonCompact) {
    asideButton.classList.add("compact");
  }
});

asideButton.addEventListener("click", toggleMenu);

document.addEventListener("DOMContentLoaded", function () {
  const yearSelect = document.querySelectorAll("#year-select");
  const startYear = 1940;
  const currentYear = new Date().getFullYear();

  yearSelect.forEach((select) => {
    for (let year = currentYear; year >= startYear; year--) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select.appendChild(option);
    }
  });

  const daySelect = document.querySelectorAll("#day-select");

  daySelect.forEach((select) => {
    for (let day = 1; day <= 31; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day;
      select.appendChild(option);
    }
  });

  // проверка селектов для 4 пункта
  const region = document.getElementById("region");
  const city = document.getElementById("city");
  const school = document.getElementById("school");

  region.addEventListener("change", function () {
    if (region.value !== "") {
      city.disabled = false;
    }
  });

  city.addEventListener("change", function () {
    if (city.value !== "") {
      school.disabled = false;
    }
  });
});

const phoneInput = document.getElementById("phone");
const additionalPhoneInput = document.getElementById("additional-phone");

if (phoneInput) {
  IMask(phoneInput, {
    mask: "+{375}(00)000-00-00",
    lazy: false,
  });
}

if (additionalPhoneInput) {
  IMask(additionalPhoneInput, {
    mask: "+{375}(00)000-00-00",
    lazy: false,
  });
}

const benefitCheckbox = document.getElementById("benefit-checkbox");
const fileUploadSection = document.querySelector(".file-upload-section");
const fileUploadBody = document.querySelector(".file-upload-body");
const customFileInputButton = document.querySelector(".custom-file-button");
const fileInput = document.querySelector(".file-input");
const filePreview = document.querySelector(".file-preview");
const fileName = document.querySelector(".file-name");
const fileThumbnail = document.querySelector(".file-thumbnail");
const cancelButton = document.querySelector(".cancel-button");

if (benefitCheckbox) {
  benefitCheckbox.addEventListener("change", function () {
    if (this.checked) {
      fileUploadSection.classList.remove("hidden");
    } else {
      fileUploadSection.classList.add("hidden");
      resetFileInput();
    }
  });

  customFileInputButton.addEventListener("click", function () {
    fileInput.click();
  });

  // Отображение выбранного файла и предпросмотра
  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      fileName.textContent = file.name;
      filePreview.classList.remove("hidden");
      cancelButton.classList.remove("hidden");
      fileUploadBody.classList.add("hidden");

      // Если это изображение, показываем превью
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          fileThumbnail.src = e.target.result;
          fileThumbnail.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
      } else {
        fileThumbnail.classList.add("hidden");
        fileThumbnail.src = "";
        fileThumbnail.alt = "";
      }
    }
  });

  cancelButton.addEventListener("click", function () {
    resetFileInput();
  });

  function resetFileInput() {
    fileInput.value = "";
    fileName.textContent = "";
    fileThumbnail.src = "";
    fileThumbnail.classList.add("hidden");
    filePreview.classList.add("hidden");
    cancelButton.classList.add("hidden");
    fileUploadBody.classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cabinet__form");
  const modal = document.getElementById("modal-window");
  const closeButton = document.querySelectorAll(".modal-close-btn");
  const body = document.body;

  if (modal && form && closeButton) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      modal.classList.add("open");
      body.classList.add("no-scroll");
    });

    closeButton.forEach((btn) => {
      btn.addEventListener("click", function () {
        modal.classList.remove("open");
        body.classList.remove("no-scroll");
      });
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("open");
        body.classList.remove("no-scroll");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let steps = document.querySelectorAll(".cabinet__form-step");
  if (steps) {
    let currentStep = 0;
    const nextButtons = document.querySelectorAll(".step-next-button");
    const prevButtons = document.querySelectorAll(".step-prev-button");

    const submitButton = document.querySelector(".step-submit-button");
    const stepperItems = document.querySelectorAll(".stepper .step");

    const benefitCheckbox = document.getElementById("benefit-checkbox");
    const fileInput = document.querySelector(".file-input");

    const phoneInput = document.getElementById("phone");
    const nextButtonStep3 = document.querySelector(".step-next-button-3");

    function showStep(index) {
      steps.forEach((step, idx) => {
        step.style.display = idx === index ? "flex" : "none";
      });
      updateStepper(index);
      currentStep = index;

      if (index < steps.length - 1) {
        toggleNextButton(index);
      }
    }

    function validatePhone() {
      const phoneDigits = phoneInput.value.replace(/\D/g, "");
      let phoneValid = true;

      if (phoneDigits.length === 12) {
        nextButtonStep3.disabled = false;
        phoneValid = true;
      } else {
        nextButtonStep3.disabled = true;
        phoneValid = false;
      }

      return phoneValid;
    }

    phoneInput.addEventListener("input", validatePhone);

    function updateStepper(index) {
      stepperItems.forEach((step, idx) => {
        if (idx <= index) {
          step.classList.add("active");
        } else {
          step.classList.remove("active");
        }
      });
    }

    function validateStep(stepIndex) {
      const inputs = steps[stepIndex].querySelectorAll(
        "input[required]:not(.hidden), select[required]:not(.hidden)"
      );
      let allValid = true;

      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          allValid = false;
        }
      });

      if (stepIndex == 2) {
        const isValid = validatePhone();
        return isValid;
      }
      return allValid;
    }

    function toggleNextButton(stepIndex) {
      const nextButton = steps[stepIndex].querySelector(".step-next-button");

      nextButton.disabled = !validateStep(stepIndex);
    }

    function toggleSubmitButton() {
      const lastStepIndex = steps.length - 1;
      const isFileSelected = fileInput.files.length > 0;
      const isCheckboxChecked = benefitCheckbox.checked;
      const allFieldsValid = validateStep(lastStepIndex);

      if (isCheckboxChecked) {
        submitButton.disabled = !(isFileSelected && allFieldsValid);
      } else {
        submitButton.disabled = !allFieldsValid;
      }
    }

    function addValidationListeners(stepIndex) {
      const inputs = steps[stepIndex].querySelectorAll("input[required], select[required]");
      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          if (stepIndex === steps.length - 1) {
            toggleSubmitButton();
          } else {
            toggleNextButton(stepIndex);
          }
        });
      });
    }

    const nextStepAgeCheck = document.getElementById("next-step-age-check");

    if (nextStepAgeCheck) {
      nextStepAgeCheck.addEventListener("click", function () {
        const birthDay = document.querySelector(".birth-day-select").value;
        const birthMonth = document.getElementById("month-select").value;
        const birthYear = document.querySelector(".birth-year-select").value;
        const personalFields = document.getElementById("personal-fields");
        const representativeFields = document.getElementById("representative-fields");

        const birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`);
        const today = new Date();

        const ageDiff = today - birthDate;
        const ageInYears = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365));

        if (ageInYears < 16) {
          if (personalFields) {
            personalFields.classList.add("hidden");
            representativeFields.classList.remove("hidden");

            const personalFieldsInputs = personalFields.querySelectorAll("input, select");
            personalFieldsInputs.forEach((input) => {
              input.classList.add("hidden");
              input.removeAttribute("required");
            });

            const representativeFieldsInputs =
              representativeFields.querySelectorAll("input, select");
            representativeFieldsInputs.forEach((input) => {
              input.classList.remove("hidden");
              input.setAttribute("required", "true");
            });
          }
        } else {
          if (representativeFields) {
            personalFields.classList.remove("hidden");
            representativeFields.classList.add("hidden");

            const personalFieldsInputs = personalFields.querySelectorAll("input, select");
            personalFieldsInputs.forEach((input) => {
              input.classList.remove("hidden");
              input.setAttribute("required", "true");
            });

            const representativeFieldsInputs =
              representativeFields.querySelectorAll("input, select");
            representativeFieldsInputs.forEach((input) => {
              input.classList.add("hidden");
              input.removeAttribute("required");
            });
          }
        }

        showStep(currentStep);
      });
    }

    nextButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        if (validateStep(index)) {
          if (currentStep < steps.length - 1) {
            showStep(currentStep + 1);
          }
        }
      });
    });

    prevButtons.forEach((button) => {
      button.addEventListener("click", function () {
        if (currentStep > 0) {
          showStep(currentStep - 1);
        }
      });
    });

    benefitCheckbox.addEventListener("change", toggleSubmitButton);
    fileInput.addEventListener("change", toggleSubmitButton);

    showStep(currentStep);
    steps.forEach((_, index) => addValidationListeners(index));
    toggleSubmitButton();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const passwordInputs = document.querySelectorAll(".password-input");
  const submitChangePass = document.querySelector(".change-password-submit");
  const validationMessage = document.querySelector(".password-info-message");

  passwordInputs.forEach((passwordInput) => {
    const errorMessage = passwordInput.nextElementSibling.nextElementSibling;

    if (passwordInput.id === "old-pass") {
      return;
    }

    passwordInput.addEventListener("input", function () {
      const password = passwordInput.value;
      const isValid = validatePassword(password);

      if (isValid) {
        passwordInput.classList.add("valid");
        passwordInput.classList.remove("invalid");
        errorMessage.classList.remove("active");
        submitChangePass.disabled = false;

        if (validationMessage) {
          validationMessage.innerText = "Пароль соответствует требованиям";
        }
      } else {
        errorMessage.classList.add("active");
        passwordInput.classList.add("invalid");
        passwordInput.classList.remove("valid");
        submitChangePass.disabled = true;

        if (validationMessage) {
          validationMessage.innerText =
            "Пароль должен быть не менее 8 символов длиной, содержать латинские символы верхнего регистра (A-Z), содержать латинские символы нижнего регистра (a-z), содержать цифры (0-9).";
        }
      }
    });
  });

  function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isValidLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && isValidLength;
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const passwordInputs = document.querySelectorAll('.password-input');
  const togglePasswordIcons = document.querySelectorAll('.password-icon');

  togglePasswordIcons.forEach((icon, index) => {
    icon.addEventListener('click', function () {
      const passwordInput = passwordInputs[index];
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
    
      if (type === 'password') {
        this.classList.remove('bi-eye');
        this.classList.add('bi-eye-slash');
      } else {
        this.classList.remove('bi-eye-slash');
        this.classList.add('bi-eye');
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const cabinetMobileMenu = document.querySelector(".cabinet__mobile-menu");
  const cabinetMobileProfile = document.querySelector(".cabinet__mobile-profile");
  const profileButton = document.querySelector(".cabinet__profile-btn");
  const body = document.body;

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("open");
      cabinetMobileMenu.classList.toggle("open");

      if (cabinetMobileProfile.classList.contains("open")) {
        cabinetMobileProfile.classList.remove("open");
      }

      if (cabinetMobileMenu.classList.contains("open")) {
        body.classList.add("no-scroll");
      } else {
        body.classList.remove("no-scroll");
      }
    });
  }

  if (cabinetMobileProfile) {
    profileButton.addEventListener("click", function () {
      cabinetMobileProfile.classList.toggle("open");

      if (cabinetMobileMenu.classList.contains("open")) {
        cabinetMobileMenu.classList.remove("open");
        menuToggle.classList.remove("open");
      }

      if (cabinetMobileProfile.classList.contains("open")) {
        body.classList.add("no-scroll");
      } else {
        body.classList.remove("no-scroll");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-window-exit");
  const closeButton = document.getElementById("modal-close-btn");
  const cancelButton = document.querySelector(".cancel-btn");
  const exitBtns = document.querySelectorAll(".exit-btn");
  const body = document.body;

  if (modal) {
    exitBtns.forEach((btn) =>
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.add("open");
      })
    );

    closeButton.addEventListener("click", function () {
      modal.classList.remove("open");
    });

    cancelButton.addEventListener("click", function () {
      modal.classList.remove("open");
    });

    if (modal.classList.contains("open")) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("open");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.querySelector(".cabinet__profile-img-input");
  const profileImg = document.querySelector(".cabinet__profile-img img");
  const profileImgContainer = document.querySelector(".cabinet__profile-img");
  const customFileButton = document.getElementById("custom-upload-button");
  const deleteButton = document.getElementById("custom-delete-button");
  const memberCardImg = document.querySelector(".member-card__avatar");

  customFileButton.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        profileImg.src = e.target.result;
        memberCardImg.src = e.target.result;
        memberCardImg.classList.remove("hidden");

        profileImgContainer.classList.remove("icon");
        profileImgContainer.classList.add("image");
        deleteButton.classList.remove("hidden");
      };

      reader.readAsDataURL(file);
    }
  });

  deleteButton.addEventListener("click", function () {
    profileImg.src = "./img/icons/profile-icon.svg";
    profileImgContainer.classList.add("icon");
    profileImgContainer.classList.remove("image");
    deleteButton.classList.add("hidden");
    memberCardImg.classList.add("hidden");
  });
});

const AG_GRID_LOCALE_RU = {
  // Set Filter
  selectAll: "(Select All)",
  selectAllSearchResults: "(Select All Search Results)",
  addCurrentSelectionToFilter: "Add current selection to filter",
  searchOoo: "Search...",
  blanks: "(Blanks)",
  noMatches: "No matches",

  // Number Filter & Text Filter
  filterOoo: "Filter...",
  equals: "Equals",
  notEqual: "Does not equal",
  blank: "Blank",
  notBlank: "Not blank",
  empty: "Choose one",

  // Number Filter
  lessThan: "Less than",
  greaterThan: "Greater than",
  lessThanOrEqual: "Less than or equal to",
  greaterThanOrEqual: "Greater than or equal to",
  inRange: "Between",
  inRangeStart: "From",
  inRangeEnd: "To",

  // Text Filter
  contains: "Contains",
  notContains: "Does not contain",
  startsWith: "Begins with",
  endsWith: "Ends with",

  // Date Filter
  dateFormatOoo: "yyyy-mm-dd",
  before: "Before",
  after: "After",

  // Filter Conditions
  andCondition: "AND",
  orCondition: "OR",

  // Filter Buttons
  applyFilter: "Apply",
  resetFilter: "Reset",
  clearFilter: "Clear",
  cancelFilter: "Cancel",

  // Filter Titles
  textFilter: "Text Filter",
  numberFilter: "Number Filter",
  dateFilter: "Date Filter",
  setFilter: "Set Filter",

  // Group Column Filter
  groupFilterSelect: "Select field:",

  // Advanced Filter
  advancedFilterContains: "contains",
  advancedFilterNotContains: "does not contain",
  advancedFilterTextEquals: "equals",
  advancedFilterTextNotEqual: "does not equal",
  advancedFilterStartsWith: "begins with",
  advancedFilterEndsWith: "ends with",
  advancedFilterBlank: "is blank",
  advancedFilterNotBlank: "is not blank",
  advancedFilterEquals: "=",
  advancedFilterNotEqual: "!=",
  advancedFilterGreaterThan: ">",
  advancedFilterGreaterThanOrEqual: ">=",
  advancedFilterLessThan: "<",
  advancedFilterLessThanOrEqual: "<=",
  advancedFilterTrue: "is true",
  advancedFilterFalse: "is false",
  advancedFilterAnd: "AND",
  advancedFilterOr: "OR",
  advancedFilterApply: "Apply",
  advancedFilterBuilder: "Builder",
  advancedFilterValidationMissingColumn: "Column is missing",
  advancedFilterValidationMissingOption: "Option is missing",
  advancedFilterValidationMissingValue: "Value is missing",
  advancedFilterValidationInvalidColumn: "Column not found",
  advancedFilterValidationInvalidOption: "Option not found",
  advancedFilterValidationMissingQuote: "Value is missing an end quote",
  advancedFilterValidationNotANumber: "Value is not a number",
  advancedFilterValidationInvalidDate: "Value is not a valid date",
  advancedFilterValidationMissingCondition: "Condition is missing",
  advancedFilterValidationJoinOperatorMismatch:
    "Join operators within a condition must be the same",
  advancedFilterValidationInvalidJoinOperator: "Join operator not found",
  advancedFilterValidationMissingEndBracket: "Missing end bracket",
  advancedFilterValidationExtraEndBracket: "Too many end brackets",
  advancedFilterValidationMessage: "Expression has an error. ${variable} - ${variable}.",
  advancedFilterValidationMessageAtEnd:
    "Expression has an error. ${variable} at end of expression.",
  advancedFilterBuilderTitle: "Advanced Filter",
  advancedFilterBuilderApply: "Apply",
  advancedFilterBuilderCancel: "Cancel",
  advancedFilterBuilderAddButtonTooltip: "Add Filter or Group",
  advancedFilterBuilderRemoveButtonTooltip: "Remove",
  advancedFilterBuilderMoveUpButtonTooltip: "Move Up",
  advancedFilterBuilderMoveDownButtonTooltip: "Move Down",
  advancedFilterBuilderAddJoin: "Add Group",
  advancedFilterBuilderAddCondition: "Add Filter",
  advancedFilterBuilderSelectColumn: "Select a column",
  advancedFilterBuilderSelectOption: "Select an option",
  advancedFilterBuilderEnterValue: "Enter a value...",
  advancedFilterBuilderValidationAlreadyApplied: "Current filter already applied.",
  advancedFilterBuilderValidationIncomplete: "Not all conditions are complete.",
  advancedFilterBuilderValidationSelectColumn: "Must select a column.",
  advancedFilterBuilderValidationSelectOption: "Must select an option.",
  advancedFilterBuilderValidationEnterValue: "Must enter a value.",

  // Side Bar
  columns: "Columns",
  filters: "Filters",

  // columns tool panel
  pivotMode: "Pivot Mode",
  groups: "Row Groups",
  rowGroupColumnsEmptyMessage: "Drag here to set row groups",
  values: "Values",
  valueColumnsEmptyMessage: "Drag here to aggregate",
  pivots: "Column Labels",
  pivotColumnsEmptyMessage: "Drag here to set column labels",

  // Header of the Default Group Column
  group: "Group",

  // Row Drag
  rowDragRow: "row",
  rowDragRows: "rows",

  // Other
  loadingOoo: "Loading...",
  loadingError: "ERR",
  noRowsToShow: "No Rows To Show",
  enabled: "Enabled",

  // Menu
  pinColumn: "Pin Column",
  pinLeft: "Pin Left",
  pinRight: "Pin Right",
  noPin: "No Pin",
  valueAggregation: "Value Aggregation",
  noAggregation: "None",
  autosizeThisColumn: "Autosize This Column",
  autosizeAllColumns: "Autosize All Columns",
  groupBy: "Group by",
  ungroupBy: "Un-Group by",
  ungroupAll: "Un-Group All",
  addToValues: "Add ${variable} to values",
  removeFromValues: "Remove ${variable} from values",
  addToLabels: "Add ${variable} to labels",
  removeFromLabels: "Remove ${variable} from labels",
  resetColumns: "Reset Columns",
  expandAll: "Expand All Row Groups",
  collapseAll: "Close All Row Groups",
  copy: "Copy",
  ctrlC: "Ctrl+C",
  ctrlX: "Ctrl+X",
  copyWithHeaders: "Copy With Headers",
  copyWithGroupHeaders: "Copy with Group Headers",
  cut: "Cut",
  paste: "Paste",
  ctrlV: "Ctrl+V",
  export: "Export",
  csvExport: "CSV Export",
  excelExport: "Excel Export",
  columnFilter: "Column Filter",
  columnChooser: "Choose Columns",
  chooseColumns: "Choose Columns",
  sortAscending: "Sort Ascending",
  sortDescending: "Sort Descending",
  sortUnSort: "Clear Sort",

  // Enterprise Menu Aggregation and Status Bar
  sum: "Sum",
  first: "First",
  last: "Last",
  min: "Min",
  max: "Max",
  none: "None",
  count: "Count",
  avg: "Average",
  filteredRows: "Filtered",
  selectedRows: "Selected",
  totalRows: "Total Rows",
  totalAndFilteredRows: "Rows",
  more: "More",
  to: "to",
  of: "of",
  page: "Страница",
  pageLastRowUnknown: "?",
  nextPage: "Next Page",
  lastPage: "Last Page",
  firstPage: "First Page",
  previousPage: "Previous Page",
  pageSizeSelectorLabel: "Page Size:",
  footerTotal: "Total",

  // Pivoting
  pivotColumnGroupTotals: "Total",

  // Enterprise Menu (Charts)
  pivotChartAndPivotMode: "Pivot Chart & Pivot Mode",
  pivotChart: "Pivot Chart",
  chartRange: "Chart Range",

  columnChart: "Column",
  groupedColumn: "Grouped",
  stackedColumn: "Stacked",
  normalizedColumn: "100% Stacked",

  barChart: "Bar",
  groupedBar: "Grouped",
  stackedBar: "Stacked",
  normalizedBar: "100% Stacked",

  pieChart: "Pie",
  pie: "Pie",
  donut: "Donut",

  lineChart: "Line",
  stackedLine: "Stacked",
  normalizedLine: "100% Stacked",

  xyChart: "X Y (Scatter)",
  scatter: "Scatter",
  bubble: "Bubble",

  areaChart: "Area",
  area: "Area",
  stackedArea: "Stacked",
  normalizedArea: "100% Stacked",

  histogramChart: "Histogram",

  polarChart: "Polar",
  radarLine: "Radar Line",
  radarArea: "Radar Area",
  nightingale: "Nightingale",
  radialColumn: "Radial Column",
  radialBar: "Radial Bar",

  statisticalChart: "Statistical",
  boxPlot: "Box Plot",
  rangeBar: "Range Bar",
  rangeArea: "Range Area",

  hierarchicalChart: "Hierarchical",
  treemap: "Treemap",
  sunburst: "Sunburst",

  specializedChart: "Specialized",
  waterfall: "Waterfall",
  heatmap: "Heatmap",

  combinationChart: "Combination",
  columnLineCombo: "Column & Line",
  AreaColumnCombo: "Area & Column",

  // Charts
  pivotChartTitle: "Pivot Chart",
  rangeChartTitle: "Range Chart",
  settings: "Chart",
  data: "Set Up",
  format: "Customize",
  categories: "Categories",
  defaultCategory: "(None)",
  series: "Series",
  switchCategorySeries: "Switch Category / Series",
  categoryValues: "Category Values",
  seriesLabels: "Series Labels",
  aggregate: "Aggregate",
  xyValues: "X Y Values",
  paired: "Paired Mode",
  axis: "Axis",
  xAxis: "Horizontal Axis",
  yAxis: "Vertical Axis",
  polarAxis: "Polar Axis",
  radiusAxis: "Radius Axis",
  navigator: "Navigator",
  zoom: "Zoom",
  animation: "Animation",
  crosshair: "Crosshair",
  color: "Color",
  thickness: "Thickness",
  preferredLength: "Preferred Length",
  xType: "X Type",
  axisType: "Axis Type",
  automatic: "Automatic",
  category: "Category",
  number: "Number",
  time: "Time",
  timeFormat: "Time Format",
  autoRotate: "Auto Rotate",
  labelRotation: "Rotation",
  circle: "Circle",
  polygon: "Polygon",
  square: "Square",
  cross: "Cross",
  diamond: "Diamond",
  plus: "Plus",
  triangle: "Triangle",
  heart: "Heart",
  orientation: "Orientation",
  fixed: "Fixed",
  parallel: "Parallel",
  perpendicular: "Perpendicular",
  radiusAxisPosition: "Position",
  ticks: "Ticks",
  gridLines: "Grid Lines",
  width: "Width",
  height: "Height",
  length: "Length",
  padding: "Padding",
  spacing: "Spacing",
  chartStyle: "Chart Style",
  title: "Title",
  chartTitles: "Titles",
  chartTitle: "Chart Title",
  chartSubtitle: "Subtitle",
  horizontalAxisTitle: "Horizontal Axis Title",
  verticalAxisTitle: "Vertical Axis Title",
  polarAxisTitle: "Polar Axis Title",
  titlePlaceholder: "Chart Title",
  background: "Background",
  font: "Font",
  weight: "Weight",
  top: "Top",
  right: "Right",
  bottom: "Bottom",
  left: "Left",
  labels: "Labels",
  calloutLabels: "Callout Labels",
  sectorLabels: "Sector Labels",
  positionRatio: "Position Ratio",
  size: "Size",
  shape: "Shape",
  minSize: "Minimum Size",
  maxSize: "Maximum Size",
  legend: "Legend",
  position: "Position",
  markerSize: "Marker Size",
  markerStroke: "Marker Stroke",
  markerPadding: "Marker Padding",
  itemSpacing: "Item Spacing",
  itemPaddingX: "Item Padding X",
  itemPaddingY: "Item Padding Y",
  layoutHorizontalSpacing: "Horizontal Spacing",
  layoutVerticalSpacing: "Vertical Spacing",
  strokeWidth: "Stroke Width",
  offset: "Offset",
  offsets: "Offsets",
  tooltips: "Tooltips",
  callout: "Callout",
  markers: "Markers",
  shadow: "Shadow",
  blur: "Blur",
  xOffset: "X Offset",
  yOffset: "Y Offset",
  lineWidth: "Line Width",
  lineDash: "Line Dash",
  lineDashOffset: "Dash Offset",
  scrollingZoom: "Scrolling",
  scrollingStep: "Scrolling Step",
  selectingZoom: "Selecting",
  durationMillis: "Duration (ms)",
  crosshairLabel: "Label",
  crosshairSnap: "Snap to Node",
  normal: "Normal",
  bold: "Bold",
  italic: "Italic",
  boldItalic: "Bold Italic",
  predefined: "Predefined",
  fillOpacity: "Fill Opacity",
  strokeColor: "Line Color",
  strokeOpacity: "Line Opacity",
  miniChart: "Mini-Chart",
  histogramBinCount: "Bin count",
  connectorLine: "Connector Line",
  seriesItems: "Series Items",
  seriesItemType: "Item Type",
  seriesItemPositive: "Positive",
  seriesItemNegative: "Negative",
  seriesItemLabels: "Item Labels",
  columnGroup: "Column",
  barGroup: "Bar",
  pieGroup: "Pie",
  lineGroup: "Line",
  scatterGroup: "X Y (Scatter)",
  areaGroup: "Area",
  polarGroup: "Polar",
  statisticalGroup: "Statistical",
  hierarchicalGroup: "Hierarchical",
  specializedGroup: "Specialized",
  combinationGroup: "Combination",
  groupedColumnTooltip: "Grouped",
  stackedColumnTooltip: "Stacked",
  normalizedColumnTooltip: "100% Stacked",
  groupedBarTooltip: "Grouped",
  stackedBarTooltip: "Stacked",
  normalizedBarTooltip: "100% Stacked",
  pieTooltip: "Pie",
  donutTooltip: "Donut",
  lineTooltip: "Line",
  stackedLineTooltip: "Stacked",
  normalizedLineTooltip: "100% Stacked",
  groupedAreaTooltip: "Area",
  stackedAreaTooltip: "Stacked",
  normalizedAreaTooltip: "100% Stacked",
  scatterTooltip: "Scatter",
  bubbleTooltip: "Bubble",
  histogramTooltip: "Histogram",
  radialColumnTooltip: "Radial Column",
  radialBarTooltip: "Radial Bar",
  radarLineTooltip: "Radar Line",
  radarAreaTooltip: "Radar Area",
  nightingaleTooltip: "Nightingale",
  rangeBarTooltip: "Range Bar",
  rangeAreaTooltip: "Range Area",
  boxPlotTooltip: "Box Plot",
  treemapTooltip: "Treemap",
  sunburstTooltip: "Sunburst",
  waterfallTooltip: "Waterfall",
  heatmapTooltip: "Heatmap",
  columnLineComboTooltip: "Column & Line",
  areaColumnComboTooltip: "Area & Column",
  customComboTooltip: "Custom Combination",
  innerRadius: "Inner Radius",
  startAngle: "Start Angle",
  endAngle: "End Angle",
  reverseDirection: "Reverse Direction",
  groupPadding: "Group Padding",
  seriesPadding: "Series Padding",
  tile: "Tile",
  whisker: "Whisker",
  cap: "Cap",
  capLengthRatio: "Length Ratio",
  labelPlacement: "Placement",
  inside: "Inside",
  outside: "Outside",
  noDataToChart: "No data available to be charted.",
  pivotChartRequiresPivotMode: "Pivot Chart requires Pivot Mode enabled.",
  chartSettingsToolbarTooltip: "Menu",
  chartLinkToolbarTooltip: "Linked to Grid",
  chartUnlinkToolbarTooltip: "Unlinked from Grid",
  chartDownloadToolbarTooltip: "Download Chart",
  chartMenuToolbarTooltip: "Menu",
  chartEdit: "Edit Chart",
  chartAdvancedSettings: "Advanced Settings",
  chartLink: "Link to Grid",
  chartUnlink: "Unlink from Grid",
  chartDownload: "Download Chart",
  histogramFrequency: "Frequency",
  seriesChartType: "Series Chart Type",
  seriesType: "Series Type",
  secondaryAxis: "Secondary Axis",
  seriesAdd: "Add a series",
  categoryAdd: "Add a category",
  bar: "Bar",
  column: "Column",
  histogram: "Histogram",
  advancedSettings: "Advanced Settings",
  direction: "Direction",
  horizontal: "Horizontal",
  vertical: "Vertical",
  seriesGroupType: "Group Type",
  groupedSeriesGroupType: "Grouped",
  stackedSeriesGroupType: "Stacked",
  normalizedSeriesGroupType: "100% Stacked",
  legendEnabled: "Enabled",
  invalidColor: "Color value is invalid",
  groupedColumnFull: "Grouped Column",
  stackedColumnFull: "Stacked Column",
  normalizedColumnFull: "100% Stacked Column",
  groupedBarFull: "Grouped Bar",
  stackedBarFull: "Stacked Bar",
  normalizedBarFull: "100% Stacked Bar",
  stackedAreaFull: "Stacked Area",
  normalizedAreaFull: "100% Stacked Area",
  customCombo: "Custom Combination",

  // ARIA
  ariaAdvancedFilterBuilderItem: "${variable}. Level ${variable}. Press ENTER to edit",
  ariaAdvancedFilterBuilderItemValidation:
    "${variable}. Level ${variable}. ${variable} Press ENTER to edit",
  ariaAdvancedFilterBuilderList: "Advanced Filter Builder List",
  ariaAdvancedFilterBuilderFilterItem: "Filter Condition",
  ariaAdvancedFilterBuilderGroupItem: "Filter Group",
  ariaAdvancedFilterBuilderColumn: "Column",
  ariaAdvancedFilterBuilderOption: "Option",
  ariaAdvancedFilterBuilderValueP: "Value",
  ariaAdvancedFilterBuilderJoinOperator: "Join Operator",
  ariaAdvancedFilterInput: "Advanced Filter Input",
  ariaChecked: "checked",
  ariaColumn: "Column",
  ariaColumnGroup: "Column Group",
  ariaColumnFiltered: "Column Filtered",
  ariaColumnSelectAll: "Toggle All Columns Visibility",
  ariaDateFilterInput: "Date Filter Input",
  ariaDefaultListName: "List",
  ariaFilterColumnsInput: "Filter Columns Input",
  ariaFilterFromValue: "Filter from value",
  ariaFilterInput: "Filter Input",
  ariaFilterList: "Filter List",
  ariaFilterToValue: "Filter to value",
  ariaFilterValue: "Filter Value",
  ariaFilterMenuOpen: "Open Filter Menu",
  ariaFilteringOperator: "Filtering Operator",
  ariaHidden: "hidden",
  ariaIndeterminate: "indeterminate",
  ariaInputEditor: "Input Editor",
  ariaMenuColumn: "Press ALT DOWN to open column menu",
  ariaFilterColumn: "Press CTRL ENTER to open filter",
  ariaRowDeselect: "Press SPACE to deselect this row",
  ariaHeaderSelection: "Column with Header Selection",
  ariaRowSelectAll: "Press Space to toggle all rows selection",
  ariaRowToggleSelection: "Press Space to toggle row selection",
  ariaRowSelect: "Press SPACE to select this row",
  ariaRowSelectionDisabled: "Row Selection is disabled for this row",
  ariaSearch: "Search",
  ariaSortableColumn: "Press ENTER to sort",
  ariaToggleVisibility: "Press SPACE to toggle visibility",
  ariaToggleCellValue: "Press SPACE to toggle cell value",
  ariaUnchecked: "unchecked",
  ariaVisible: "visible",
  ariaSearchFilterValues: "Search filter values",
  ariaPageSizeSelectorLabel: "Page Size",
  ariaChartMenuClose: "Close Chart Edit Menu",
  ariaChartSelected: "Selected",
  ariaSkeletonCellLoadingFailed: "Row failed to load",
  ariaSkeletonCellLoading: "Row data is loading",

  // ARIA Labels for Drop Zones
  ariaRowGroupDropZonePanelLabel: "Row Groups",
  ariaValuesDropZonePanelLabel: "Values",
  ariaPivotDropZonePanelLabel: "Column Labels",
  ariaDropZoneColumnComponentDescription: "Press DELETE to remove",
  ariaDropZoneColumnValueItemDescription: "Press ENTER to change the aggregation type",
  ariaDropZoneColumnGroupItemDescription: "Press ENTER to sort",
  // used for aggregate drop zone, format: {aggregation}{ariaDropZoneColumnComponentAggFuncSeparator}{column name}
  ariaDropZoneColumnComponentAggFuncSeparator: " of ",
  ariaDropZoneColumnComponentSortAscending: "ascending",
  ariaDropZoneColumnComponentSortDescending: "descending",

  ariaLabelDialog: "Dialog",

  ariaLabelColumnMenu: "Column Menu",
  ariaLabelColumnFilter: "Column Filter",

  ariaLabelCellEditor: "Cell Editor",
  ariaLabelSelectField: "Select Field",

  // aria labels for rich select
  ariaLabelRichSelectField: "Rich Select Field",
  ariaLabelRichSelectToggleSelection: "Press SPACE to toggle selection",
  ariaLabelRichSelectDeselectAllItems: "Press DELETE to deselect all items",
  ariaLabelRichSelectDeleteSelection: "Press DELETE to deselect item",

  ariaLabelTooltip: "Tooltip",
  ariaLabelContextMenu: "Context Menu",
  ariaLabelSubMenu: "SubMenu",
  ariaLabelAggregationFunction: "Aggregation Function",
  ariaLabelAdvancedFilterAutocomplete: "Advanced Filter Autocomplete",
  ariaLabelAdvancedFilterBuilderAddField: "Advanced Filter Builder Add Field",
  ariaLabelAdvancedFilterBuilderColumnSelectField: "Advanced Filter Builder Column Select Field",
  ariaLabelAdvancedFilterBuilderOptionSelectField: "Advanced Filter Builder Option Select Field",
  ariaLabelAdvancedFilterBuilderJoinSelectField:
    "Advanced Filter Builder Join Operator Select Field",

  // ARIA Labels for the Side Bar
  ariaColumnPanelList: "Column List",
  ariaFilterPanelList: "Filter List",

  // Number Format (Status Bar, Pagination Panel)
  thousandSeparator: ",",
  decimalSeparator: ".",

  // Data types
  true: "True",
  false: "False",
  invalidDate: "Invalid Date",
  invalidNumber: "Invalid Number",
  january: "January",
  february: "February",
  march: "March",
  april: "April",
  may: "May",
  june: "June",
  july: "July",
  august: "August",
  september: "September",
  october: "October",
  november: "November",
  december: "December",

  // Time formats
  timeFormatSlashesDDMMYYYY: "DD/MM/YYYY",
  timeFormatSlashesMMDDYYYY: "MM/DD/YYYY",
  timeFormatSlashesDDMMYY: "DD/MM/YY",
  timeFormatSlashesMMDDYY: "MM/DD/YY",
  timeFormatDotsDDMYY: "DD.M.YY",
  timeFormatDotsMDDYY: "M.DD.YY",
  timeFormatDashesYYYYMMDD: "YYYY-MM-DD",
  timeFormatSpacesDDMMMMYYYY: "DD MMMM YYYY",
  timeFormatHHMMSS: "HH:MM:SS",
  timeFormatHHMMSSAmPm: "HH:MM:SS AM/PM",
};

const gridOptions = {
  localeText: AG_GRID_LOCALE_RU,
  rowHeight: 50,
  rowData: [
    {
      requestNumber: 44,
      fio: "Альхимович Евгений Иванович",
      email: "aroitq@mail.ru",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "15.03.2023 14:45",
      status: "Новая",
      approve: "approve",
      reject: "reject",
    },
    {
      requestNumber: 1,
      fio: "Кононович Евгений Иванович",
      email: "laaqper@gmail.com",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "15.03.2023 14:45",
      status: "Новая",
    },
    {
      requestNumber: 77,
      fio: "Кабан Евгений Иванович",
      email: "kononov@mail.ru",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "Не 15.03.2023 14:45",
      status: "Новая",
    },
    {
      requestNumber: 123,
      fio: "Альхимович Евгений Иванович",
      email: "popoatt@mail.su",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "Не 15.03.2023 14:45",
      status: "Одобрена",
    },
    {
      requestNumber: 98,
      fio: "Кононович Евгений Иванович",
      email: "popa@mail.ru",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "15.03.2023 14:45",
      status: "Одобрена",
    },
    {
      requestNumber: 222,
      fio: "Кононович Евгений Иванович",
      email: "kaban@mail.ru",
      requestType: "Заявка на вступление в члены ОО «БФП»",
      submissionDate: "15.03.2023 14:45",
      status: "Отклонена",
    },
  ],

  columnDefs: [
    { field: "requestNumber", headerName: "№" },
    { field: "fio", headerName: "ФИО" },
    { field: "email", headerName: "Email" },
    {
      field: "requestType",
      headerName: "Тип заявки",
    },
    { field: "submissionDate", headerName: "Дата подачи" },
    {
      field: "status",
      headerName: "Статус",
      cellRenderer: (params) => {
        return params.value;
      },
      cellClassRules: {
        "ag-badge blue": (params) => params.value === "Новая",
        "ag-badge green": (params) => params.value === "Одобрена",
        "ag-badge red": (params) => params.value === "Отклонена",
      },
    },
    {
      field: "approve",
      headerName: "",
      resizable: false,
      cellRenderer: (params) => {
        if (params.data.status === "Новая") {
          const acceptButton = document.createElement("button");
          acceptButton.innerText = "Принять";
          acceptButton.classList.add("button--small");
          acceptButton.addEventListener("click", () => showPopup("Принять", params));

          const declineButton = document.createElement("button");
          declineButton.innerText = "Отклонить";
          declineButton.classList.add("button-small--secondary");
          declineButton.addEventListener("click", () => showPopup("Отклонить", params));

          const container = document.createElement("div");
          container.appendChild(acceptButton);
          container.appendChild(declineButton);

          return container;
        } else {
          return "";
        }
      },
    },
    {
      field: "reject",
      headerName: "",
      resizable: false,
    },
    {
      field: "view",
      headerName: "",
      resizable: false,
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
      document.getElementById("fioFilterInput").value !== "" ||
      document.getElementById("requestNumberFilterInput").value !== "" ||
      document.getElementById("emailFilterInput").value !== "" ||
      document.getElementById("statusFilterSelect").value !== ""
    );
  },
  doesExternalFilterPass: (node) => {
    const fioFilterValue = document.getElementById("fioFilterInput").value.toLowerCase();
    const requestNumberFilterValue = document.getElementById("requestNumberFilterInput").value;

    const emailFilterValue = document.getElementById("emailFilterInput").value.toLowerCase();
    const statusFilterValue = document.getElementById("statusFilterSelect").value;

    const fioMatch = !fioFilterValue || node.data.fio.toLowerCase().includes(fioFilterValue);

    const requestNumberMatch = !requestNumberFilterValue || node.data.requestNumber.includes(requestNumberFilterValue);

    const emailMatch = !emailFilterValue || node.data.email.toLowerCase().includes(emailFilterValue);

    const statusMatch = statusFilterValue === "Все" || node.data.status === statusFilterValue;

    return fioMatch && requestNumberMatch && emailMatch && statusMatch;
  },
};

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
  const columnState = JSON.parse(localStorage.getItem("agColumnState"));

  if (columnState) {
    params.api.applyColumnState({ state: columnState, applyOrder: true });
  }

  const applyFilter = () => params.api.onFilterChanged();

  document.getElementById("fioFilterInput").addEventListener("input", applyFilter);
  document.getElementById("requestNumberFilterInput").addEventListener("input", applyFilter);
  document.getElementById("emailFilterInput").addEventListener("input", applyFilter);
  document.getElementById("statusFilterSelect").addEventListener("change", applyFilter);
}

const ediv = document.querySelector("#applications-table");

if (agGrid) {
  const gridApi = agGrid.createGrid(ediv, gridOptions);
}

