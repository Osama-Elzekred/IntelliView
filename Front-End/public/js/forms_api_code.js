// import { DOMAIN_NAME } from "../../config";
const DOMAIN_NAME = "localhost:7049";

let signupForm = document.getElementById("signup");
let loginForm = document.getElementById("login");
let signupbtn = document.getElementById("signupbtn");
let signinbtn = document.getElementById("signinbtn");
function flipped_face() {
  signupForm.reset();
  loginForm.reset();
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

// code of login
let message = document.getElementById("messageOfEmpty");
let messageOfWrong = document.getElementById("messageOfWrong");
if (messageOfWrong) {
  messageOfWrong.style.cssText = `
        font-style: italic;
        color: blue;
        font-size : 24; 
        text-align : center ;
        font-weight : bold ;  
        `;
  messageOfWrong.style.display = "block";
}
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
    messageOfWrong.textContent = "Please Enter E-mail and Password";
    messageOfWrong.style.display = "block";
  } else {
    messageOfWrong.style.display = "none";
    fetch(`https://${DOMAIN_NAME}/api/Auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          document.cookie = `authToken=${data.token};path=/`;
          document.cookie = `user_id=${data.id};path=/`;
          localStorage.setItem("roleFromServer", data.roles);
          window.location.href = `profile.html?username=${username}`;
          console.log(data);
        } else if (data.message) {
          messageOfWrong.textContent = `${data.message}`;
          messageOfWrong.style.display = "block";
        }
      })
      .catch((error) => {
        if (error) {
          messageOfWrong.textContent =
            "Sorry ... The Server can not be reach now ... please try later ";
          messageOfWrong.style.display = "block";
          console.log("Response details:", error.response);
        }
      });
  }
});
//sign-up code
let messageFromServer = document.getElementById("messageFromServer");
if (messageFromServer) {
  messageFromServer.style.cssText = `
        font-style: italic;
        color: blue;
        text-align : center ;
        font-size : 24 ; 
        font-weight : bold ;
        position : relative ; 
        bottom : 30px ; 
        `;
  messageFromServer.style.display = "none";
}
//get role value
let roleForm = document.getElementById("role");
let personBtn = document.getElementById("person");
let companyBtn = document.getElementById("company");
var role = "User";
localStorage.setItem("role", role);
if (roleForm) {
  roleForm.addEventListener("click", function (e) {
    var clickedBtn = e.target;

    if (clickedBtn === personBtn) {
      role = personBtn.value;
    } else {
      role = companyBtn.value;
    }
    localStorage.setItem("roleToServer", role);
  });
}
//get the data and post it to the server
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  messageFromServer.style.display = "none";

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
    messageFromServer.textContent = "Please Fill All Fields";
    messageFromServer.style.display = "block";
  } else if (password != password_confirm) {
    messageFromServer.textContent = "Password dosen't match ";
    messageFromServer.style.display = "block";
  } else {
    fetch(`https://${DOMAIN_NAME}/api/Auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        username: username,
        password,
        role: localStorage.getItem("role"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          document.cookie = `authToken=${data.token};path=/`;
          document.cookie = `user_id=${data.id};path=/`;
          localStorage.setItem("roleFromServer", data.roles);
          window.location.href = `profile.html?username=${username}`;
        } else if (data.message) {
          messageFromServer.textContent = `${data.message}`;
          messageFromServer.style.display = "block";
        } else {
          messageFromServer.textContent = "An error occurred";
          messageFromServer.style.display = "block";
        }
      })
      .catch((error) => {
        if (error) {
          messageFromServer.textContent =
            "Connection Error ... Please Try Later";
          messageFromServer.style.display = "block";
        }
      });
  }
});
