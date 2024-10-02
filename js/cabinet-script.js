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
      const inputs = steps[stepIndex].querySelectorAll("input[required]:not(.hidden), select[required]:not(.hidden)");
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

            const personalFieldsInputs = personalFields.querySelectorAll("input[required], select[required]");
            personalFieldsInputs.forEach((input) => {
              input.classList.add("hidden");
            });

            const representativeFieldsInputs = representativeFields.querySelectorAll(
              "input[required], select[required]"
            );
            representativeFieldsInputs.forEach((input) => {
              input.classList.remove("hidden");
            });
          }
        } else {
          if (representativeFields) {
            personalFields.classList.remove("hidden");
            representativeFields.classList.add("hidden");

            const personalFieldsInputs = personalFields.querySelectorAll("input[required], select[required]");
            personalFieldsInputs.forEach((input) => {
              input.classList.remove("hidden");
            });

            const representativeFieldsInputs = representativeFields.querySelectorAll(
              "input[required], select[required]"
            );
            representativeFieldsInputs.forEach((input) => {
              input.classList.add("hidden");
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

  customFileButton.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        profileImg.src = e.target.result;

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
  });
});

