document.addEventListener("DOMContentLoaded", function() {
    fetch("footer.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("footer-content").innerHTML = html;
        })
        .catch(error => console.error("Error fetching footer:", error));
});
