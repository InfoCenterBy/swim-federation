const phoneInput = document.getElementById("phone");

if (phoneInput) {
  IMask(phoneInput, {
    mask: "+{375}(00)000-00-00",
    lazy: false,
  });
}
