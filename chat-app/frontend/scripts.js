document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const form = document.getElementById('chat-form');
    const input = document.getElementById('message-input');
    const messages = document.getElementById('messages');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
        }
    });

    socket.on('chat message', function(msg) {
        const item = document.createElement('div');
        item.textContent = msg;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    });
});
