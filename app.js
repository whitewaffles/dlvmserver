const CLIENT_ID = '1270146158022361092'; // 디스코드 클라이언트 ID로 교체하세요
const REDIRECT_URI = 'https://dlvm.netlify.app/auth/callback'; // 실제 리다이렉트 URI로 교체하세요
const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20email`;
const SERVER_URL = 'https://fluoridated-nettle-bayberry.glitch.me'; // Glitch 서버 URL로 교체하세요

let user = null;

function handleLogin() {
    window.location.href = DISCORD_ENDPOINT;
}

async function handleCallback(code) {
    try {
        const response = await axios.post(`${SERVER_URL}/auth/discord`, { code });
        user = response.data;
        renderApp();
    } catch (error) {
        console.error('Login failed:', error);
    }
}

function renderApp() {
    const container = document.getElementById('login-container');
    if (user) {
        container.innerHTML = `
            <h2>Welcome, ${user.username}!</h2>
            <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="Avatar" width="100">
        `;
    } else {
        container.innerHTML = '<button onclick="handleLogin()">Login with Discord</button>';
    }
}

// 페이지 로드 시 실행
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        handleCallback(code);
    } else {
        renderApp();
    }
};
