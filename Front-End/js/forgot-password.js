

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
    body : email ,
    }).then((response)=> {
        return response.json(); 
    }).then((data) => {
        if (data){
            messageError.textContent = "invalid email "; 
            messageError.style.display = "block"; 
        }
        else {
        // Hide the form
        document.getElementById('forgotPasswordForm').style.display = 'none';
        // Display the message
        document.getElementById('message').style.display = 'block';
        }
    })
});