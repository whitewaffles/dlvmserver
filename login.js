const CLIENT_ID = '1270146158022361092';
const REDIRECT_URI = 'https://dlvm.netlify.app/discord/profile';
const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20email`;

function handleLogin() {
    window.location.href = DISCORD_ENDPOINT;
}