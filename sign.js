document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("passwordField");
    const toggleIcon = this.querySelector('i');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-solid", "fa-eye-slash");
        toggleIcon.classList.add("fa-solid", "fa-eye");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-solid", "fa-eye");
        toggleIcon.classList.add("fa-solid", "fa-eye-slash");
    }
});