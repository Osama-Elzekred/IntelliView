document.addEventListener("DOMContentLoaded", function() {
    fetch("header.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("header-content").innerHTML = html;
        })
        .catch(error => console.error("Error fetching footer:", error));
});
