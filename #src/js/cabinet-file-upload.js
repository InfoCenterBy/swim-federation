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
