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

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".cabinet__form-step");
  let currentStep = 0;
  const nextButtons = document.querySelectorAll(".step-next-button");
  const prevButtons = document.querySelectorAll(".step-prev-button");
  const submitButton = document.querySelector(".step-submit-button");
  const stepperItems = document.querySelectorAll(".stepper .step");

  function showStep(index) {
    steps.forEach((step, idx) => {
      step.style.display = idx === index ? "flex" : "none";
    });
    updateStepper(index);
    currentStep = index;
  }

  function updateStepper(index) {
    stepperItems.forEach((step, idx) => {
      if (idx <= index) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  // Валидация полей на шаге
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

  benefitCheckbox.addEventListener("change", toggleSubmitButton);

  fileInput.addEventListener("change", toggleSubmitButton);

  showStep(currentStep);

  steps.forEach((_, index) => addValidationListeners(index));

  nextButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      if (validateStep(index)) {
        showStep(index + 1);
      }
    });
  });

  prevButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      showStep(index);
    });
  });

  toggleSubmitButton();
});
