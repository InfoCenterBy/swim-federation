document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.querySelector(".cabinet__profile-img-input");
  const profileImg = document.querySelector(".cabinet__profile-img img");
  const profileImgContainer = document.querySelector(".cabinet__profile-img");
  const customFileButton = document.getElementById("custom-upload-button");
  const deleteButton = document.getElementById("custom-delete-button");
  const memberCardImg = document.querySelector(".member-card__avatar");

  if (customFileButton) {
    customFileButton.addEventListener("click", () => {
      fileInput.click();
    });
  }

  if (fileInput) {
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
  }

  if (deleteButton) {
    deleteButton.addEventListener("click", function () {
      profileImg.src = "./img/icons/profile-icon.svg";
      profileImgContainer.classList.add("icon");
      profileImgContainer.classList.remove("image");
      deleteButton.classList.add("hidden");
      memberCardImg.classList.add("hidden");
    });
  }
});
