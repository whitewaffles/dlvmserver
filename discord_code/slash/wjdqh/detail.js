document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

function fetchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); // URL에서 'id' 쿼리 매개변수 가져오기

    if (!id) {
        console.error('No id parameter found in the URL');
        document.getElementById('content').textContent = 'ID 파라미터가 URL에 없습니다.';
        return;
    }



    fetch('/discord_code/slash/wjdqh/content.json') // 절대 경로 사용
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            if (data[id]) {

                document.getElementById('title').textContent = data[id].title;
                document.getElementById('content').textContent = data[id].content;
            } else {
                throw new Error('Data with id ' + id + ' not found');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('content').textContent = '데이터를 불러오는 중 오류가 발생했습니다.';
        });
}
