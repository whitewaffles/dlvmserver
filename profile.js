const SERVER_URL = 'https://fluoridated-nettle-bayberry.glitch.me'; // Glitch 서버 URL로 교체하세요

let user = null;

async function handleCallback(code) {
    try {
        const response = await axios.post(`${SERVER_URL}/auth/discord`, { code });
        user = response.data;
        localStorage.setItem('discordUser', JSON.stringify(user));
        renderProfile();
    } catch (error) {
        console.error('Login failed:', error);
    }
}

function handleLogout() {
    localStorage.removeItem('discordUser');
    window.location.href = '/login.html'; // 로그인 페이지로 리다이렉트
}

function renderProfile() {
    const container = document.getElementById('user-info');
    if (user) {
        container.innerHTML = `
            <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="Avatar" width="100">
            <h2>${user.username}</h2>
            <p>Email: ${user.email}</p>
            <button onclick="handleLogout()">Logout</button>
        `;
    } else {
        window.location.href = '/login.html'; // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
    }
}

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        handleCallback(code);
    } else {
        const storedUser = localStorage.getItem('discordUser');
        if (storedUser) {
            user = JSON.parse(storedUser);
            renderProfile();
        } else {
            window.location.href = '/login.html'; // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
        }
    }
};