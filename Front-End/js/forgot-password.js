

let emailForm = document.getElementById('forgotPasswordForm'); 
let messageError = document.getElementById("error");
messageError.style.cssText = `
    display : none ; 
`
emailForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    let emailFormData = new FormData(emailForm); 
    let email = emailFormData.get("email"); 
    fetch("https://localhost:7049/api/Password/forget-password" , {
        method : "POST", 
        headers : {
            "Content-type": "application/json; charset=UTF-8",
    },
    body : JSON.stringify({
        "email" :email , 
    })
    }).then((response) => {
        if (!response.ok){
            messageError.textContent = "invalid email "; 
            messageError.style.display = "block"; 
        }
        else {
            document.querySelector(".container2").style.display = "block"; 
            document.querySelector(".container").style.display = "none"; 
            document.querySelector("#verfiy").append(message); 
            message.textContent = "check your email inbox"; 
            message.style.display = "block"; 
            setTimeout(() => {
                message.style.display = "none"; 
            }, 5000);
        }
    })
});

