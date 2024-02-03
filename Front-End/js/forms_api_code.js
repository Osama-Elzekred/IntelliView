function flipped_face() {
  var face_ = document.getElementById("face");
  face_.classList.toggle("flipped");
}

function checkInput(input) {
  const icon = input.parentElement.querySelector(".icon");

  if (input.value.trim() === "") {
    // Show the icon if the input is empty
    icon.style.opacity = 0.5;
  } else {
    // Hide the icon if the input has content
    icon.style.opacity = 0;
  }
}

function togglePassword_() {
  var passwordField = document.getElementById("passwordField");

  var eyeIcon = document.querySelector(".eye-slash");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    // Switch to the eye-fill icon when password is visible
    eyeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
        </svg>
      `;
  } else {
    passwordField.type = "password";
    // Switch back to the eye-slash-fill icon when password is hidden
    eyeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
        </svg>
      `;
  }
}
function togglePassword() {
  var passwordField_ = document.getElementById("password-");

  var eyeIcon = document.querySelector(".eye-fill-");

  if (passwordField_.type === "password") {
    passwordField_.type = "text";
    // Switch to the eye-fill icon when password is visible
    eyeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
        </svg>
      `;
  } else {
    passwordField_.type = "password";
    // Switch back to the eye-slash-fill icon when password is hidden
    eyeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
        </svg>
      `;
  }
}

function toggleButton(buttonType) {
  // Remove 'active' class from all buttons
  const buttons = document.querySelectorAll(".c-p input");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  // Add 'active' class to the clicked button
  const clickedButton = document.querySelector(`.c-p input.${buttonType}`);
  clickedButton.classList.add("active");
}

let signupForm = document.getElementById("signup");
let loginForm = document.getElementById("login");
let signupbtn = document.getElementById("signupbtn");
let signinbtn = document.getElementById("signinbtn");

// code of login 
let message = document.getElementById("messageOfEmpty");
let textOfEmpty = document.createTextNode("please enter username and password");
message.appendChild(textOfEmpty);
message.style.cssText = `
        font-style: italic;
        color: red;
        text-align : center ;
        font-size : 24 ; 
        font-weight : bold ;
        `;
message.style.display = "none";

let messageOfWrong = document.getElementById("messageOfWrong");
let textOfWrong = document.createTextNode("Wrong Password or Username");
messageOfWrong.appendChild(textOfWrong);
messageOfWrong.style.cssText = `
        font-style: italic;
        color: blue;
        font-size : 24; 
        text-align : center ;
        font-weight : bold ;  
        `;
messageOfWrong.style.display = "none";

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  messageOfWrong.style.display = "none";

  let loginData = new FormData(loginForm);
  let username = loginData.get("username");
  let password = loginData.get("password");
  if (typeof username !== "string" || typeof password !== "string") {
    console.error("Username and password must be strings.");
    return;
  }
  if (username === "" || password === "") {
    console.log("message");
    message.style.display = "block";
  } else {
    message.style.display = "none";
    fetch("https://localhost:7049/api/Auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      // mode: 'no-cors', // Comment out or remove this line
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 200) {
          document.cookie = `authToken = ${data.token} expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/`;
          // window.location.href = `profile.html?username=${username}`;
          console.log(data);
        } else {
          console.log(data.errors.Email[0]);
          messageOfWrong.style.display = "block";
        }
        console.log(data.token);
      })
      .catch((error) => {
        console.log("Error:", error);
        if (error.response) {
          console.log("Response details:", error.response);
        }
      });
  }
});

//sign-up code 
let messageOfEmptyFields = document.getElementById("messageOfEmptyUp");
let messageOfNotMatchPass = document.getElementById("messageOfEmptyUp");
let textOfEmptyFields = document.createTextNode("Please Fill all fields "); 
let textOfNotMatch = document.createTextNode("Password does not match  "); 

messageOfEmptyFields.appendChild(textOfEmptyFields); 
messageOfNotMatchPass.appendChild(textOfNotMatch); 

messageOfEmptyFields.style.cssText = `
        font-style: italic;
        color: red;
        text-align : center ;
        font-size : 24 ; 
        font-weight : bold ;
      
        `;
messageOfEmptyFields.style.display = "none";


messageOfNotMatchPass.style.cssText = `
        font-style: italic;
        color: red;
        text-align : center ;
        font-size : 24 ; 
        font-weight : bold ;
        `;
messageOfNotMatchPass.style.display = "none";
//get role value
let roleForm = document.getElementById("role");
let personBtn = document.getElementById("person");
let companyBtn = document.getElementById("company");
var role = "Personal";
localStorage.setItem("role", role);
roleForm.addEventListener("click", function (e) {
  var clickedBtn = e.target;

  if (clickedBtn === personBtn) {
    role = personBtn.value;
  } else {
    role = companyBtn.value;
  }
  localStorage.setItem("role", role);
});

//get the data and post it to the server
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  messageOfNotMatchPass.style.display = "none";
  messageOfEmptyFields.style.display = "none";
  
  let signupData = new FormData(signupForm);
  let username = signupData.get("username");
  let email = signupData.get("email");
  let password = signupData.get("password");
  let password_confirm = signupData.get("password-confirm");
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof password_confirm !== "string"
  ) {
    console.error("Username and password must be strings.");
    console.log(typeof username);
    console.log(typeof password);
    console.log(typeof password_confirm);

    return;
  }

  // message of empty field
  if (
    username === "" ||
    password === "" ||
    password_confirm === "" ||
    email === ""
  ) {
    messageOfEmptyFields.style.display = "block";
  } else if (password != password_confirm) {
    console.log("Password dose not match ");
    messageOfNotMatchPass.style.display = "block";
  } else {
    messageOfEmptyFields.style.display = "none";
    messageOfNotMatchPass.style.display = "none";
    fetch("https://localhost:7049/api/Auth/register", {
      method: "POST",
      // body: signupData ,
      body: JSON.stringify({
        email: email,
        username: username,
        password,
        role: localStorage.getItem("role"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      // mode: 'no-cors', // Comment out or remove this line
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.ok) {
          messageOfWrong.style.display = "block";
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          window.location.href = `profile.html?username=${username}`;
          console.log(data);
        }
        console.log(data.username);
      })
      .catch((error) => {
        console.log("Error:", error);
        if (error.response) {
          console.log("Response details:", error.response);
        }
      });
  }
});
