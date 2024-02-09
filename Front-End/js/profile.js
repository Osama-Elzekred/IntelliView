$(document).ready(function () {
  $("#phone").intlTelInput({
    autoPlaceholder: "polite",
    separateDialCode: true,
    nationalMode: false,
    initialCountry: "EG",
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js",
  });
});

if (
  localStorage.getItem("roleFromServer") === "user" ||
  localStorage.getItem("roleFromServer") === "User"
) {
  let userForm = document.getElementById("userForm");
  // userForm.style.display ="block"; 
  // companyFrom.style.display = "none"; 
  let saveChanges = document.getElementById("saveChanges");
  let message = document.getElementById("message");
  message.style.cssText = `
color: green;
font-size: 18px;
font-weight: bold;
text-align: center;
font-style: italic;
display : none ; 
`;
  function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie is the one we're looking for
      if (cookie.startsWith(name + "=")) {
        // If found, return the value of the cookie
        return cookie.substring(name.length + 1);
      }
    }
    // If not found, return null
    return null;
  }

  // Usage
  const authToken = getCookie("authToken");

  saveChanges.addEventListener("click", function (e) {
    e.preventDefault();
    message.style.display = "none";
    let userFormData = new FormData(userForm);
    let firstName = userFormData.get("firstName");
    let lastName = userFormData.get("lastName");
    let title = userFormData.get("title");
    let phone = userFormData.get("phone");

    fetch("https://localhost:7049/api/Profile", {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        title: title,
        phone: phone,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          message.textContent = "Data Changed";
          message.style.display = "block";
          
        }
        else{
          message.textContent = "Data Not Changed"; 
          message.style.color = "red"; 
          message.style.display = "block"; 
        }
      });
  });
}else{
  // let companyForm = document.getElementById("companyForm"); 
  // userForm.style.display ="block"; 
  // companyFrom.style.display = "none"; 
}
