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

// проверка на заполненость полей
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".cabinet__form");
  const button = document.querySelector(".step-next-button");
  const requiredInputs = form.querySelectorAll("input[required], select[required]");

  function checkFormCompletion() {
    let allFilled = true;
    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
      }
    });

    if (allFilled) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
  }

  requiredInputs.forEach((input) => {
    input.addEventListener("input", checkFormCompletion);
  });

  checkFormCompletion();
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

// document.addEventListener("DOMContentLoaded", function () {
//   const steps = document.querySelectorAll(".cabinet__form-step");
//   let currentStep = 0;
//   const nextButtons = document.querySelectorAll(".step-next-button");
//   const prevButtons = document.querySelectorAll(".step-prev-button");

//   function showStep(index) {
//     steps.forEach((step, idx) => {
//       step.style.display = idx === index ? "flex" : "none";
//     });
//     currentStep = index;
//   }

//   function validateStep(stepIndex) {
//     const inputs = steps[stepIndex].querySelectorAll("input[required], select[required]");

//     let allValid = true;

//     inputs.forEach((input) => {
//       if (!input.checkValidity()) {
//         allValid = false;
//       }
//     });

//     return allValid;
//   }

//   function toggleNextButton(stepIndex) {
//     const nextButton = steps[stepIndex].querySelector(".step-next-button");
//     nextButton.disabled = !validateStep(stepIndex);
//   }

//   function addValidationListeners(stepIndex) {
//     const inputs = steps[stepIndex].querySelectorAll("input[required], select[required]");
//     inputs.forEach((input) => {
//       input.addEventListener("input", () => toggleNextButton(stepIndex));
//     });
//   }

//   showStep(currentStep);
//   steps.forEach((_, index) => addValidationListeners(index));

//   nextButtons.forEach((button, index) => {
//     button.addEventListener("click", function () {
//       if (validateStep(index)) {
//         showStep(index + 1);
//       }
//     });
//   });

//   prevButtons.forEach((button, index) => {
//     button.addEventListener("click", function () {
//       showStep(index);
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".cabinet__form-step");
  let currentStep = 0;
  const nextButtons = document.querySelectorAll(".step-next-button");
  const prevButtons = document.querySelectorAll(".step-prev-button");

  // Кнопка "Подать заявку" на последнем шаге
  const submitButton = document.querySelector(".step-submit-button"); // Добавьте нужный селектор для кнопки на последнем шаге

  function showStep(index) {
    steps.forEach((step, idx) => {
      step.style.display = idx === index ? "flex" : "none";
    });
    currentStep = index;
  }

  // Валидация шагов
  function validateStep(stepIndex) {
    const inputs = steps[stepIndex].querySelectorAll("input[required], select[required]");

    let allValid = true;

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        allValid = false;
      }
    });

    return allValid;
  }

  // Включение/отключение кнопки "Далее"
  function toggleNextButton(stepIndex) {
    const nextButton = steps[stepIndex].querySelector(".step-next-button");
    nextButton.disabled = !validateStep(stepIndex);
  }

  // Включение/отключение кнопки "Подать заявку"
  function toggleSubmitButton() {
    const lastStepIndex = steps.length - 1; // Последний шаг
    submitButton.disabled = !validateStep(lastStepIndex);
  }

  // Добавление слушателей для инпутов на шаге
  function addValidationListeners(stepIndex) {
    const inputs = steps[stepIndex].querySelectorAll("input[required], select[required]");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (stepIndex === steps.length - 1) {
          toggleSubmitButton(); // Для последнего шага проверяем кнопку "Подать заявку"
        } else {
          toggleNextButton(stepIndex); // Для всех остальных шагов проверяем кнопку "Далее"
        }
      });
    });
  }

  // Показываем первый шаг при загрузке
  showStep(currentStep);

  // Добавляем слушатели для всех шагов
  steps.forEach((_, index) => addValidationListeners(index));

  // Обрабатываем нажатие на кнопки "Далее"
  nextButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      if (validateStep(index)) {
        showStep(index + 1);
      }
    });
  });

  // Обрабатываем нажатие на кнопки "Назад"
  prevButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      showStep(index);
    });
  });

  // Инициализируем проверку для кнопки "Подать заявку" при загрузке
  toggleSubmitButton();
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cabinet__form");
  console.log(form);

  const modal = document.getElementById("modal-window");

  const closeButton = document.getElementById("modal-close-btn");
  const body = document.body;

  if (modal) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      modal.classList.add("open");
    });

    closeButton.addEventListener("click", function () {
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
