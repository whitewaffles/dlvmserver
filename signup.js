function getEmail() {
    var authButton = document.getElementById("authButton");
    var authInput = document.getElementById("authInput");
    var authInputt = document.getElementById("authInputbutton");
    

    showInput(); // 인증코드 입력 필드 표시

    // 버튼 비활성화
    authButton.disabled = true;
    authButton.style.pointerEvents = "none";
    authButton.style.opacity = "0.5";
}

function showInput() {
    var authButton = document.getElementById("authButton");
    var authInput = document.getElementById("authInput");
    var authInputt = document.getElementById("authInputbutton");

    authButton.style.display = "none";
    authInput.style.display = "block";
    authInputt.style.display = "block";
}

function checkEmail() {
    var emailInput = document.getElementById("emailInput");
    var authButton = document.getElementById("authButton");
    var authInputt = document.getElementById("authInputbutton");

    if (emailInput.value === '') {
        authButton.disabled = true; // 버튼 비활성화
        authButton.style.pointerEvents = "none";
        authButton.style.opacity = "0.5";
    } else {
        authButton.disabled = false; // 버튼 활성화
        authButton.style.pointerEvents = "auto";
        authButton.style.opacity = "1";
    }
}


document.getElementById("inputField").addEventListener("input", function() {
    var inputValue = this.value;
    var errorName = document.getElementById("errorName");
    var regex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ-_.]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .
    var regexx = /^[a-zA-Z0-9가-힣!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .
    var regexxx = /^[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .

    if (inputValue === '') {
        errorName.textContent = "닉네임을 적어주세요!";
        errorName.className = "error-name-null";
    }else if (regexxx.test(inputValue) && inputValue !== '') {
        errorName.textContent = "특수문자로만은 사용이 불가능합니다!";
        errorName.className = "error-name";
    }else if (!regexx.test(inputValue)) {
        
        errorName.textContent = "모음과 자음만으론 사용이 불가합니다!";
        errorName.className = "error-name";
    }else if (!regex.test(inputValue)) {
        errorName.textContent = "특수문자는 -_.만 사용가능합니다!";
        errorName.className = "error-name";
    } else if (inputValue.length > 8) {
        this.value = inputValue.slice(0, 8); // 8글자까지만 유지
        errorName.textContent = "8글자를 초과하였습니다!";
        errorName.className = "error-name";
    } else {
        errorName.textContent = "올바른 닉네임입니다"; // 메시지 초기화
        errorName.className = "success-name";
    }
});
document.getElementById("passwordField").addEventListener("input", function() {
    var passwordValue = this.value;
    var messageElement = document.getElementById("message");
    var regex = /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/; // 허용되는 패턴: 영문자, 숫자, 특수문자
    var regexx = /^[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .
    var regexxx = /^[a-zA-Z]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .
    var regexxxx = /^[0-9]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .
    var regexxxxx = /^[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .

    if (passwordValue === '') {
        messageElement.textContent = "비밀번호를 적어주세요!";
        messageElement.className = "error-message-null";
    }else if (regexxx.test(passwordValue) && passwordValue !== '') {
        messageElement.textContent = "영어로만은 사용이 불가능합니다!";
        messageElement.className = "error-message";
    }else if (regexxxx.test(passwordValue) && passwordValue !== '') {
        messageElement.textContent = "숫자로만은 사용이 불가능합니다!";
        messageElement.className = "error-message";
    }else if (regexxxxx.test(passwordValue) && passwordValue !== '') {
        messageElement.textContent = "특수문자로만은 사용이 불가능합니다!";
        messageElement.className = "error-message";
    } else if (!regex.test(passwordValue)) {
        messageElement.textContent = "숫자, 영문자, 특수문자만 입력하세요!";
        messageElement.className = "error-message";
    } else if (passwordValue.length < 8 || passwordValue.length > 20) {
        messageElement.textContent = "8자에서 20자까지만 입력이 가능합니다!";
        messageElement.className = "error-message";
    } else {
        messageElement.textContent = "올바른 비밀번호입니다.";
        messageElement.className = "success-message";
    }

});


