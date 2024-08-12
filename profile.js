const SERVER_URL = 'https://fluoridated-nettle-bayberry.glitch.me'; // Glitch 서버 URL을 확인하세요

let user = null;
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // 5초

async function handleCallback(code) {
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
        console.log('Too many requests. Please wait before trying again.');
        alert('Please wait a moment before trying to log in again.');
        return;
    }
    lastRequestTime = now;

    try {
        console.log('Exchanging code for token...');
        const response = await axios.post(`${SERVER_URL}/auth/discord`, { code });
        console.log('Server response:', response.data);
        user = response.data.user;
        localStorage.setItem('discordUser', JSON.stringify(user));
        renderProfile();
    } catch (error) {
        console.error('Login failed:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            if (error.response.status === 429) {
                alert('Too many login attempts. Please try again later.');
            } else {
                alert('An error occurred during login. Please try again later.');
            }
        } else {
            alert('Network error. Please check your internet connection and try again.');
        }
    }
}

function handleLogout() {
    console.log('Logging out...');
    localStorage.removeItem('discordUser');
    window.location.href = '/login';
}

function renderProfile() {
    const container = document.getElementById('user-info');
    console.log('Rendering profile. User:', user);
    if (user) {
        container.innerHTML = `
            <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="Avatar" width="100">
            <h2>${user.username}</h2>
            <p>Email: ${user.email}</p>
            <p>ID: ${user.id}</p>
            <button onclick="handleLogout()">Logout</button>
        `;
    } else {
        console.log('No user data found. Redirecting to login...');
        window.location.href = '/login';
    }
}

window.onload = () => {
    console.log('Window loaded. Checking for code or stored user...');
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        console.log('Code found in URL. Handling callback...');
        handleCallback(code);
    } else {
        const storedUser = localStorage.getItem('discordUser');
        console.log('Stored user:', storedUser);
        if (storedUser) {
            user = JSON.parse(storedUser);
            renderProfile();
        } else {
            console.log('No stored user found. Redirecting to login...');
            window.location.href = '/login';
        }
    }
};
