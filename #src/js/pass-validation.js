document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("register-password");
  const validationMessage = document.querySelector(".password-info-message");

  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      const password = passwordInput.value;
      const isValid = validatePassword(password);

      if (isValid) {
        passwordInput.classList.add("valid");
        passwordInput.classList.remove("invalid");
        validationMessage.innerText = "Пароль соответствует требованиям";
      } else {
        passwordInput.classList.add("invalid");
        passwordInput.classList.remove("valid");
        validationMessage.innerText =
          "Пароль должен быть не менее 8 символов длиной, содержать латинские символы верхнего регистра (A-Z), содержать латинские символы нижнего регистра (a-z), содержать цифры (0-9).";
      }
    });

    function validatePassword(password) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const isValidLength = password.length >= 8;

      return hasUpperCase && hasLowerCase && hasNumber && isValidLength;
    }
  }
});
