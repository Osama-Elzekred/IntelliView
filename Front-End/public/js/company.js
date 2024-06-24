// import { DOMAIN_NAME } from "../../config";
const DOMAIN_NAME = "localhost:7049";

let companyName = document.getElementById("company-name");
let companyType = document.getElementById("type_");
let phoneNumber = document.getElementById("phone_");
let companyFounded = document.getElementById("companyFounded");
let companySize = document.getElementById("size_");
let companyWebsite = document.getElementById("website_");
let companyOverview = document.getElementById("overview_");
let companyForm = document.getElementById("company");
let saveChanges = document.getElementById("saveChanges");
let companyImage = document.getElementById("companyImage");
let message = document.getElementById("message");
message.style.cssText = `
  color :green;
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
var authToken = getCookie("authToken");
let userID = getCookie("user_id");

saveChanges.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    oldPassword.value != "" &&
    newPassword.value != "" &&
    newPasswordConfirm != ""
  ) {
    //console.log(oldPassword.value);
    //console.log(newPassword.value);
    //console.log(newPasswordConfirm.value);
    if (newPassword.value === newPasswordConfirm.value) {
      fetch(`https://${DOMAIN_NAME}/api/Password/change-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          userID: userID,
          oldPassword: oldPassword.value,
          newPassword: newPassword.value,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.message) {
            oldPassword.value = "";
            newPassword.value = "";
            newPasswordConfirm.value = "";
            message.textContent = `${data.message}`;
            message.style.display = "block";
            setTimeout(() => {
              message.style.display = "none";
            }, 4000);
          }
        });
    } else {
      message.textContent = `${data.message}`;
      message.style.display = "block";
      setTimeout(() => {
        message.style.display = "none";
      }, 4000);
    }
  } else {
    let companyData = new FormData(companyForm);
    let companyName = companyData.get("companyName");
    let companyType = companyData.get("companyType");
    let phoneNumber = companyData.get("phone");
    let companyFounded = companyData.get("companyFounded");
    let companySize = companyData.get("companySize");
    let companyWebsite = companyData.get("companyWebsite");
    let companyOverview = companyData.get("companyOverview");

    fetch(`https://${DOMAIN_NAME}/api/Profile`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        companyName: companyName,
        companyWebsite: companyWebsite,
        phoneNumber: phoneNumber,
        companyOverview: companyOverview,
        companySize: companySize,
        companyType: companyType,
        companyFounded: companyFounded,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }
});

let inputFile = document.getElementById("inputFile");

inputFile.addEventListener("change", function (e) {
  let imageFile = inputFile.files[0];
  let formData = new FormData();
  formData.append("file", imageFile);
  fetch(`https://${DOMAIN_NAME}/api/Profile/updatePicture`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      //console.log(error);
    });
});

//get company data  from server .
document.addEventListener("DOMContentLoaded", function (e) {
  // Make the Fetch API GET request
  fetch(`https://${DOMAIN_NAME}/api/Profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((response) => {
      // Check if the response status is OK (200)
      if (response.ok) {
        // Parse the JSON response
        return response.json();
      } else {
        // If the response status is not OK, throw an error
        throw new Error("Failed to fetch profile data");
      }
    })
    .then((data) => {
      // Handle the profile data received from the server
      companyName.value = data.companyName;
      companyType.value = data.companyType;
      companyWebsite.value = data.companyWebsite;
      phoneNumber.value = data.phoneNumber;
      companyFounded.value = data.companyFounded;
      companySize.value = data.companySize;
      companyOverview.value = data.companyOverview;
      companyImage.src = ` ${data.imageURl}`;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch operation
      console.error("Error fetching profile data:", error);
    });
});
