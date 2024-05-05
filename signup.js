

document.getElementById("authButton").addEventListener("click", function() {
    var authButton = this.value;
    var authInput = document.getElementById("authInput");
    var authInputt = document.getElementById("authInputbutton");
    

    showInput(); // 인증코드 입력 필드 표시

    // 버튼 비활성화
    authButton.disabled = true;
    authButton.style.pointerEvents = "none";
    authButton.style.opacity = "0.5";
})

function showInput() {
    var authButton = document.getElementById("authButton");
    var authInput = document.getElementById("authInput");
    var authInputt = document.getElementById("authInputbutton");

    authButton.style.display = "none";
    authInput.style.display = "block";
    authInputt.style.display = "block";
}




document.getElementById("emailInput").addEventListener("input", function() {

    var emailInput = this.value;
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


})


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








document.getElementById("passwordd").addEventListener("input", function() {
    var passwordValue = this.value;
    var passwordOriginal = document.getElementById("passwordField").value;
    var messageElement = document.getElementById("passworderror");

    if (passwordValue !== passwordOriginal) {
        messageElement.textContent = "비밀번호와 일치하지 않습니다.";
        messageElement.className = "passworderroo";
    } else {
        messageElement.textContent = "비밀번호와 일치합니다.";
        messageElement.className = "passworderro";
    }
});









// db


function sendData() {
    console.log('sendData function called'); // 함수가 호출될 때 콘솔에 메시지 출력

    const nickname = document.getElementById('inputField').value;
    const password = document.getElementById('passwordField').value;
    const email = document.getElementById('emailInput').value;


    // 데이터를 객체로 만들어 JSON 형식으로 변환
    const data = {
        nickname: nickname,
        password: password,
        email: email
    };




    var namee = document.getElementById("inputField").value; // 이름
    var passwordd = document.getElementById("passwordField").value; // 비번
    var passworddd = document.getElementById("passwordd").value; // 비번확인
    var emaill = document.getElementById("emailInput").value;  // 이메일


    var namelist = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ-_.]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .
    var namelist2 = /^[a-zA-Z0-9가-힣!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .
    var namelist3 = /^[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .


    var passwordlist = /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/; // 허용되는 패턴: 영문자, 숫자, 특수문자
    var passwordlist2 = /^[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .
    var passwordlist3 = /^[a-zA-Z]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .
    var passwordlist4 = /^[0-9]*$/; // 허용되는 패턴: 영문자, 숫자, -, _, .








    if (namee === '') {
        alert('닉네임을 적어주세요.');
        return;
    }else if (namelist3.test(namee) && namee !== '') {
        alert('닉네임을 다시 확인해주세요.');
        return;
    }else if (!namelist2.test(namee)) {
        alert('닉네임을 다시 확인해주세요.');
        return;
    }else if (!namelist.test(namee)) {
        alert('닉네임을 다시 확인해주세요.');
        return;
    } else if (namee.length > 8) {
        alert('닉네임을 다시 확인해주세요.');
        return;




    } else if (passwordd === '') {
        alert('비밀번호를 다시 확인해주세요.');
        return;
    }else if (passwordlist3.test(passwordd) && passwordd !== '') {
        alert('비밀번호를 다시 확인해주세요.');
        return;
    }else if (passwordlist4.test(passwordd) && passwordd !== '') {
        alert('비밀번호를 다시 확인해주세요.');
        return;
    }else if (passwordlist2.test(passwordd) && passwordd !== '') {
        alert('비밀번호를 다시 확인해주세요.');
        return;
    } else if (!passwordlist.test(passwordd)) {
        alert('비밀번호를 다시 확인해주세요.');
        return;
    } else if (passwordd.length < 8 || passwordd.length > 20) {
        alert('비밀번호를 다시 확인해주세요.');
        return;




    } else if (passwordd !== passworddd) {
        alert('비밀번호 확인란을 다시 확인해주세요.');
        return;
        


    }else if (emaill === '') {
        alert('이메일을 작성해주세요.');
        return;
    }else {
        // 모든 조건을 통과했을 때 실행되는 코드
        fetch('https://carnelian-abalone-periwinkle.glitch.me/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            
        })
        
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            // 여기서 필요한 추가 작업을 수행할 수 있습니다.
        })
        .catch(error => {
            console.error('Error sending data to server:', error);
        });
        alert('회원가입이 완료되었습니다.');
        window.location.href = "https://dlvm.netlify.app";
        return;
    }
}
