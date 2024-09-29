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

    // Обработчик для проверки возраста и удаления шагов
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
        const ageInYears = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));

        if (ageInYears < 16) {
          if (personalFields) {
            personalFields.remove();
          }
        } else {
          if (representativeFields) {
            representativeFields.remove();
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

    // Начальная инициализация
    showStep(currentStep);
    steps.forEach((_, index) => addValidationListeners(index));
    toggleSubmitButton();
  }
});
