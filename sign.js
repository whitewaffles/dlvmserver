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


function login() {
    const userid = document.getElementById('inputField').value;
    const password = document.getElementById('passwordField').value;

    // AJAX를 이용해 서버로 POST 요청 보내기
    fetch('https://carnelian-abalone-periwinkle.glitch.me/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid: userid, password: password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.loggedIn) {
                alert('로그인이 되었습니다.');
                window.location.href = "https://dlvm.netlify.app";
                return;
            } else {
                // 인증 실패
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
