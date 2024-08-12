const SERVER_URL = 'https://fluoridated-nettle-bayberry.glitch.me'; // Glitch 서버 URL을 확인하세요

let user = null;

async function handleCallback(code) {
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
        }
        if (error.response && error.response.status === 429) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            alert(`Too many requests. Please try again in ${retryAfter} seconds.`);
            setTimeout(() => handleCallback(code), retryAfter * 1000);
        } else {
            alert('An error occurred. Please try again later.');
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
