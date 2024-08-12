const SERVER_URL = 'https://fluoridated-nettle-bayberry.glitch.me'; // Glitch 서버 URL로 교체하세요

let user = null;

// profile.js
async function handleCallback(code) {
    try {
        const response = await axios.post(`${SERVER_URL}/auth/discord`, { code });
        user = response.data;
        localStorage.setItem('discordUser', JSON.stringify(user));
        renderProfile();
    } catch (error) {
        console.error('Login failed:', error);
        if (error.response && error.response.status === 429) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            alert(`Too many requests. Please try again in ${retryAfter} seconds.`);
            setTimeout(() => handleCallback(code), retryAfter * 1000);
        } else {
            alert('An error occurred. Please try again later.');
            // 로그인 페이지로 리다이렉트하는 대신 현재 페이지에 남습니다.
        }
    }
}

function handleLogout() {
    localStorage.removeItem('discordUser');
    window.location.href = '/login';
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
        window.location.href = '/login';
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
            window.location.href = '/login';
        }
    }
};
