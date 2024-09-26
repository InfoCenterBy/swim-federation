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
