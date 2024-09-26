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
