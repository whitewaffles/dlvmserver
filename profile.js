async function handleCallback(code) {
    try {
        console.log('Exchanging code for token...');
        const response = await axios.post(`${SERVER_URL}/auth/discord`, { code });
        console.log('Server response:', response.data);
        user = response.data.user;
        localStorage.setItem('discordUser', JSON.stringify(user));
        localStorage.setItem('discordToken', response.data.token); // 토큰 저장
        renderProfile();
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again later.');
        window.location.href = '/login';
    }
}

// 프로필 렌더링 전에 토큰 확인
function renderProfile() {
    const container = document.getElementById('user-info');
    const token = localStorage.getItem('discordToken');
    if (user && token) {
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
