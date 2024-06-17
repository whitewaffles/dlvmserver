var container = document.querySelector('.container');
var overlay = document.querySelector('.overlay');
var maxRotateY = 20; // 오른쪽 끝에 대한 각도
var minRotateY = -20; // 왼쪽 끝에 대한 각도
var maxRotateX = 20; // 위쪽 끝에 대한 각도
var minRotateX = -20; // 아래쪽 끝에 대한 각도

container.addEventListener('mousemove', function(e){
    var rect = container.getBoundingClientRect();
    var x = e.clientX - rect.left; // 마우스의 X 위치
    var y = e.clientY - rect.top; // 마우스의 Y 위치

    var rotateY = (x / container.offsetWidth) * (maxRotateY - minRotateY) + minRotateY;
    var rotateX = (y / container.offsetHeight) * (maxRotateX - minRotateX) + minRotateX;

    container.style = `transform : perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // 마우스 위치에 따라 overlay의 불투명도를 변경하여 밝은 효과 생성
    overlay.style.opacity = Math.min((Math.abs(rotateX) + Math.abs(rotateY)) / 40, 1);
    
    // 마우스 위치에 따라 radial-gradient의 위치를 조정
    overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 40%)`;
});

container.addEventListener('mouseleave', function() {
    container.style.transform = `rotateX(0deg) rotateY(0deg)`; // 초기값으로 되돌림
    overlay.style.opacity = 0; // 마우스가 벗어났을 때 overlay 숨기기
});
