// import { DOMAIN_NAME } from "../../config";
const DOMAIN_NAME = 'localhost:7049';

let profileImage = document.getElementById('profileImage');

if (
  localStorage.getItem('roleFromServer') === 'user' ||
  localStorage.getItem('roleFromServer') === 'User'
) {
  let userForm = document.getElementById('userForm');
  // userForm.style.display ="block";
  // companyFrom.style.display = "none";
  let saveChanges = document.getElementById('saveChanges');
  let message = document.getElementById('message');
  message.style.cssText = `
  color: green;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  font-style: italic;
  display : none ; 
  `;
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie is the one we're looking for
      if (cookie.startsWith(name + '=')) {
        // If found, return the value of the cookie
        return cookie.substring(name.length + 1);
      }
    }
    // If not found, return null
    return null;
  }

  // Usage
  var authToken = getCookie('authToken');
  let userID = getCookie('user_id');
  let oldPassword = document.getElementById('oldPassword');
  let newPassword = document.getElementById('newPassword');
  let newPasswordConfirm = document.getElementById('newPasswordConfirm');
  if (saveChanges) {
    saveChanges.addEventListener('click', function (e) {
      e.preventDefault();
      message.style.display = 'none';
      if (
        oldPassword.value != '' &&
        newPassword.value != '' &&
        newPasswordConfirm != ''
      ) {
        //console.log(oldPassword.value);
        //console.log(newPassword.value);
        //console.log(newPasswordConfirm.value);
        if (newPassword.value === newPasswordConfirm.value) {
          fetch(`https://localhost:7049/api/Password/change-password`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
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
              if (data.ok) {
                message.textContent = 'password change successfully';
                message.style.display = 'block';
              }
            });
        } else {
          message.textContent = 'Password not Match ';
          message.style.display = 'block';
        }
      } else {
        let userFormData = new FormData(userForm);
        let firstName = userFormData.get('firstName');
        let lastName = userFormData.get('lastName');
        let title = userFormData.get('title');
        let phoneInputWrapper = document.getElementById('phoneInputWrapper');
        let phoneInput = phoneInputWrapper.querySelector('input');
        let phone = phoneInput.value;

        fetch(`https://localhost:7049/api/Profile`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            title: title,
            phoneNumber: phone,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data) {
              message.textContent = 'Data Changed';
              message.style.display = 'block';
            } else {
              message.textContent = 'Data Not Changed';
              message.style.color = 'red';
              message.style.display = 'block';
            }
          });
      }
    });
  }
} else {
  // let companyForm = document.getElementById("companyForm");
  // userForm.style.display ="block";
  // companyFrom.style.display = "none";
}

// profile photo api
let inputFile = document.getElementById('inputFile');
if (inputFile) {
  inputFile.addEventListener('change', function (e) {
    let imageFile = inputFile.files[0];
    let formData = new FormData();
    formData.append('file', imageFile);
    fetch(`https://${DOMAIN_NAME}/api/Profile/updatePicture`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    })
      .then((response) => {
        // Handle any errors that occurred during the fetch operation
        // profileImage.src = `../../../Back-End/IntelliView/IntelliView.API/${data.imageURl}`;
        return response.json();
      })
      .then((data) => {
        profileImage.src = `${data.imageURl}`;
      })
      .catch((error) => {
        //console.log(error);
      });
  });
}

let CVFile = document.getElementById('CVfile');
if (CVFile) {
  CVFile.addEventListener('change', function (e) {
    let CV = CVFile.files[0];
    let formData = new FormData();
    formData.append('file', CV);
    fetch(`https://${DOMAIN_NAME}/api/Profile/updateCV`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    })
      .then((response) => {
        // Handle any errors that occurred during the fetch operation
        // profileImage.src = `../../../Back-End/IntelliView/IntelliView.API/${data.imageURl}`;
        return response.json();
      })
      .then((data) => {
        // profileImage.src = `../../../Back-End/IntelliView/IntelliView.API/${data.imageURl}`;
      })
      .catch((error) => {
        //console.log(error);
      });
  });
}

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let title = document.getElementById('title');
let phoneInputWrapper = document.getElementById('phoneInputWrapper');
let phoneInput = phoneInputWrapper.querySelector('input');
// let phone = phoneInput.value;
if (document.readyState === 'loading') {
  // Loading hasn't finished yet
} else {
  // `DOMContentLoaded` has already fired
  // Your code here
  // document.addEventListener('DOMContentLoaded', function (e) {
  // Make the Fetch API GET request
  fetch(`https://${DOMAIN_NAME}/api/Profile`, {
    method: 'GET',
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
        throw new Error('Failed to fetch profile data');
      }
    })
    .then((data) => {
      // Handle the profile data received from the server
      firstName.value = data.firstName;
      lastName.value = data.lastName;
      title.value = data.title;
      phoneInput.value = data.phoneNumber;
      profileImage.src = `${data.imageURl}`;
      //console.log('Profile data:', data.firstName);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch operation
      console.error('Error fetching profile data:', error);
    });
}
