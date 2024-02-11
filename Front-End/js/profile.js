$(document).ready(function () {
    $('#phone,#phone_').intlTelInput({
      autoPlaceholder: "polite",
      separateDialCode: true,
      nationalMode: false,
      initialCountry: "EG",
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js"
    });
  });
 